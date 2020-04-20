import React from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import ListaSuscripciones from '../../Registro/suscripciones';
import {Card} from 'primereact/card';
import { Formik } from 'formik';

function SuscripcionForm() {

    let history = useHistory();

    function dietasCheck() {
		 fetch('/usuario/dietasCheck' , {headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
				method:'GET'})
			      .then(res => res.json())
			      .then(dietasCheck2 => {
			    	  localStorage.setItem('dietasCheck', dietasCheck2);

			      });
	 }

    return (
        <div>
            <Header />
            <Navegacion />

			<div className="container">
			<p style={{ margin: 20 }}>Si cambias tu suscripción, podrás pagarla cuando acabe tu suscripción actual.</p>
			<Card title="Modificación de la suscripción" subTitle="Seleccione la suscripción a la que desea cambiar" style={{ margin: 20 }}>

				<Formik
							initialValues={{
								suscripcion: {
									id: 0,

								}
							}}
							onSubmit={(values, { setSubmitting }) => {
								values.suscripcion.id = document.getElementById('selectSuscripciones').value
								console.log(values.suscripcion.id)
								setTimeout(() => {
									fetch('usuario/updateSuscripcion', {
											headers: {
												'Content-Type' : 'application/json',
												'Accept' : 'application/json',
												'Authorization' : 'Bearer ' + localStorage.getItem('auth')
											},
											method:'POST',
											body:JSON.stringify(values.suscripcion.id, null, 1)
									}).then(response => response.json())
									  .then(data => {
										if (data.success) {
											history.push('/datos-perfil');
											if(data.message == '1'){
												localStorage.setItem('dietasCheck', 1);
											}else{
												localStorage.removeItem('dietasCheck');
											}
										  }
										else{
											this.state.errors = data.message
											}
									  });

								setSubmitting(false);
								}, 400);
							}}
							>
							{({
								handleSubmit,
								isSubmitting,
								/* and other goodies */
							}) => (
								<form onSubmit={handleSubmit}>
									<ListaSuscripciones>

									</ListaSuscripciones>


									<button type="submit" className="button-finish" disabled={isSubmitting}>
										Enviar
									</button>

								</form>
							)}
						</Formik>


				</Card>

			</div>

		</div>
    );
}
export default SuscripcionForm;

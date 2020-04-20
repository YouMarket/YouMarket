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
			<p style={{ margin: 20 }}>Si cambias tu suscripción, podrás realizar el pago el día 1 del próximo mes.</p>
			<p style={{ margin: 20 }}><b> ATENCIÓN: </b> una vez pagada la nueva suscripción, si aún tenías algún envío en la antigua, los perderás.</p>
			<Card title="Modificación de la suscripción" subTitle="Seleccione la suscripción a la que desea cambiar" style={{ margin: 20 }}>

				<Formik
							initialValues={{
								suscripcion: {
									id: 0,

								}
							}}
							onSubmit={(values, { setSubmitting }) => {
								values.suscripcion.id = document.getElementById('selectSuscripciones').value
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
											dietasCheck();
											history.push('/datos-perfil');
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

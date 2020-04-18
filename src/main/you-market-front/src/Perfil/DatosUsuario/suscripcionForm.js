import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import ListaSuscripciones from '../../Registro/suscripciones';
import {Card} from 'primereact/card';
import { Formik } from 'formik';

function SuscripcionForm() {

    const suscripcion ={
        id: Number,
        dietista: Boolean,
        envios: Number,
        nombre: String,
        precio: Number
    }
    let history = useHistory();


    return (
        <div>
            <Header />
            <Navegacion />

			<div className="container">
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
								values,
								errors,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								/* and other goodies */
							}) => (
								<form onSubmit={handleSubmit}>
									<ListaSuscripciones>
	
									</ListaSuscripciones>   
								
								
									<button type="submit" className="boton" disabled={isSubmitting}>
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
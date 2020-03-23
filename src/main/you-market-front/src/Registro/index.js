import React, { Component, useState } from 'react';
import './styles.css';
import Header from '../Header';
import Receta from '../Receta';
import {InputText} from 'primereact/inputtext';
import  {withFormik, Form, Field, ErrorMessage}  from 'formik';
import {Card} from 'primereact/card';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



function RegistroUsuario(props) {
	
	

	const {
		isSubmitting, 
		isValid,
	} = props;

	const [nombre, setNombre] = useState(0);


  	return(
	<div>	  
	  <Header/>
	  <div className="registro-container">
	  

			<Card title="Datos del usuario">
				<Form>
					<div className="row">
						Nombre: 
						<Field name="nombre" type="text" className="input" />
						<ErrorMessage name="nombre">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>
					<div className="row">
						Apellidos: 
						<Field name="apellidos" type="text" className="input" />
						<ErrorMessage name="apellidos">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>
					<div className="row">
						DNI: 
						<Field name="dni" type="text" className="input" />
						<ErrorMessage name="dni">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>
					<div className="row">
						Fecha de nacimiento: 
						<Field name="fechaNacimiento" type="text" className="input" />
						<ErrorMessage name="fechaNacimiento">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>
					<div className="row">
						Teléfono:
						<Field name="telefono" type="text" className="input" />
						<ErrorMessage name="telefono">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>


					<div className="row">
						Email:
						<Field name="email" type="email" className="input" />
						<ErrorMessage name="email">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>
					<div className="row">
						Password:
						<Field name="password" type="password" className="input" />
						<ErrorMessage name="password">
							{message => <div className="error">{message}</div>}
						</ErrorMessage>
					</div>

					<div className="row">
						<button
							type="submit"
							className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
							disabled={isSubmitting || !isValid} >
							Submit
						</button>
					</div>
				</Form>
			</Card>

			<Card title="Método de pago" className="tarjeta">


			</Card>
		  	
	  	</div>
	</div>
 );
}
export default withFormik({
	
	 validate(values) {
	        const errors = {};

	        if (!values.password) {
	            errors.password = 'Password is required';
	        } else if (values.password.length < 8) {
	            errors.password = 'Password must be at least 8 characters';
	        }

	        if (Object.keys(errors).length) {
	            throw errors;
	        }
	    },

	    handleSubmit(values, formikBag) {
	        formikBag.setSubmitting(false);
	        console.log(values);
	    },
	
})(RegistroUsuario);

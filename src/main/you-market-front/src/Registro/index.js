import React, { Component, useState } from 'react';
import './styles.css';
import Header from '../Header';
import Receta from '../Receta';
import {InputText} from 'primereact/inputtext';
import  {withFormik, Form, Field, ErrorMessage}  from 'formik';

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
	  	<div className="grid">
		  	<Form>
				<div className="row">
				
			

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
						disabled={isSubmitting || !isValid}
					>
						Submit
					</button>
				</div>
        	</Form>
	  	</div>
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

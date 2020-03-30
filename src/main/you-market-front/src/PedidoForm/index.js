import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { withRouter	} from 'react-router-dom';
import Header from '../Header';
import { PayPalButton } from "react-paypal-button-v2";

class PedidoForm extends React.Component{
		
	handleRedirect = () => {
		console.log(this.props.history);
		this.props.history.push('/pedido');
	}
	render(){
		return(
	<div>
		<Header/>
	<div>
  	
    <h1>Crear pedido</h1>
    <Formik
      initialValues={{   }}
      validate={values => {
        const errors = {};
        if (!values.direccion) {
        	errors.direccion = 'Campo obligatorio';
        } 
        if (!values.fechaEnvio) {
        	errors.fechaEnvio = 'Campo obligatorio';
        }
        if (values.horaEnvioFin < values.horaEnvioIni) {
        	errors.horaEnvioFin = 'La hora final no puede ser anterior a la inicial'
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch('', {
        			headers: {
        				"Content-Type": "application/json"
        			},
        			method:'POST',
        			body:JSON.stringify(values, null, 2)
        	}).then(function(response) {
        	    return console.log(response.json());
        	}).then(() => 
        	 {
        		 this.handleRedirect();
        	 })
          alert(JSON.stringify(values, null, 2));
          
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
        
        
        <label for="direccion">Dirección*: </label>
        <input
		id="direccion"
		type="text"
		name="direccion"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.direccion}
        placeholder="c/Cisnes, 60, Sevilla"
        pattern="c/([A-z\s]+), (\d+),\s([A-z\s]+)"
        title="Debe ser de la forma: c/Cisnes, 60, Sevilla"
		/>
		{errors.direccion}
		<br/><br/>
         

		
		<fieldset> 
		 	<legend>Envío** </legend>
		 	
			<label for="fechaEnvio">Fecha*: </label>
			<input
			id="fechaEnvio"
			type="text"
			name="fechaEnvio"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.fechaEnvio}
	        placeholder="2020-04-23"
	        pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
	        title="El formato debe ser aaaa-mm-dd (P. ej: 2020-04-23)"
			/>
			{errors.fechaEnvio}
			<br/><br/>
		 	
			<br/>
			<label for="horaEnvioIni">Hora inicial: </label>
			<input
			id="horaEnvioIni"
			type="number"
			name="horaEnvioIni"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioIni}
			min="9"
			max="21"
			/>
			{errors.horaEnvioIni}
			
			<label for="horaEnvioFin">   Hora final: </label>
			<input
			type="number"
			name="horaEnvioFin"
			id="horaEnvioFin"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioFin}
			min="9"
			max="21"
			oninput="check()"
			/>
			{errors.horaEnvioFin}
			<br/><br/>
			
			
		</fieldset>
		<br/>
		
		<div>
			* Campo obligatorio
		</div>
		<div>
			** La entrega se realizará en la horquilla de horas indicada
		</div>
	
		<br/><br/>
         <div className="grid">
         <PayPalButton
         amount={1}
         buyerCountry="ES"
         onSuccess={(values, { setSubmitting }) => {
             setTimeout(() => {
             	fetch('', {
             			headers: {
             				"Content-Type": "application/json"
             			},
             			method:'POST',
             			body:JSON.stringify(values, null, 2)
             	}).then(function(response) {
             	    return console.log(response.json());
             	}).then(() => 
             	 {
             		 this.handleRedirect();
             	 })
               alert(JSON.stringify(values, null, 2));
               
               setSubmitting(false);
             }, 400);
           }}
       />
          </div>
        </form>
      )}
    </Formik>
    	</div>
	</div>
);
}
}
export default withRouter(PedidoForm);
import React,  { useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import './styles.css'
import { withRouter	} from 'react-router-dom';
import Header from '../Header';
import { PayPalButton } from "react-paypal-button-v2";

class PedidoForm extends React.Component{
	
	precio(){
		const [total, setTotal] = useState(0.0);
		const fetchTotal = useCallback(() => {
		     return fetch('../precioTotalCarrito', {headers:{
		  'Content-Type' : 'application/json',
		  'Accept' : 'application/json',
		  'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		  method:'GET'})
		       .then(res => res.json())
		       .then(total => {
		         setTotal(total)

		       });
		   }, []);

		 useEffect(() => {
		  fetchTotal(total);
		   }, []);
		 console.log(total);
		 return total;
	}
	
	redirecc = () => {
		if(localStorage.getItem('auth')==null){
			this.props.history.push('/login');
		}
	}
	
	handleRedirect = () => {
		console.log(this.props.history);
		this.props.history.push('/pedidoexito');
	}
	render(){
		this.redirecc();
		return(
	<div>
		<Header/>
	<div>
  	
	  <div class="pedido-container container">
	  <h1>¡Ya queda menos para finalizar tu pedido! Por favor, rellena estos campos ðŸ™�</h1>
    <Formik validateOnChange={false} validateOnBlur={false}
    	className="formulario-pedido"
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
        				"Content-Type": "application/json",
        				'Accept' : 'application/json',
        				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
        			method:'POST',
        			body:JSON.stringify(values, null, 2)
        	}).then(function(response) {
        	    return console.log(response.json());
         	}).then(() =>{
				{handleSubmit}
        	}).then(() => 
        	 {
        		 this.handleRedirect();
        	 })
          
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
        
		<div className="pedido-form-envio-container">
		<fieldset> 
		 	<legend><h2>Pedido número []**</h2> </legend>
        
        <label htmlFor="poblacion">Población*: </label>
        <input
			id="poblacion"
			type="text"
			name="poblacion"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.poblacion}
	        placeholder="Los Palacios y Villafranca"
	        required
			/>
		{errors.poblacion}
		<br/><br/>
        
		<label htmlFor="cpostal">Código postal*: </label>
        <input
			id="cpostal"
			type="text"
			name="cpostal"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.cpostal}
	        placeholder="41720"
	        required
			/>
			{errors.cpostal}
			<br/><br/>
		
		<label htmlFor="provincia">Provincia*: </label>
        <input
			id="provincia"
			type="text"
			name="provincia"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.provincia}
	        placeholder="Sevilla"
	        required
			/>
			{errors.provincia}
			<br/><br/>
		
		
        <label htmlFor="direccion">Calle*: </label>
        <input
			id="direccion"
			type="text"
			name="direccion"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.direccion}
	        placeholder="c/Cisnes"
	        required
			/>
			{errors.direccion}
			<br/><br/>
		
		<label htmlFor="numero">Número*: </label>
        <input
			id="numero"
			type="number"
			name="numero"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.numero}
	        required
			/>
			{errors.numero}
			<br/><br/>
		
		 	
		<label htmlFor="fechaEnvio">Fecha*: </label>	
		<input
			id="fechaEnvio"
			type="date"
			name="fechaEnvio"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.fechaEnvio}
	        required
			/>
			{errors.fechaEnvio}
			<br/><br/>
		 	
			<br/>
		<label htmlFor="horaEnvioIni">Hora inicial: </label>
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
			
		<label htmlFor="horaEnvioFin">   Hora final: </label>
		<input
			type="number"
			name="horaEnvioFin"
			id="horaEnvioFin"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioFin}
			min="9"
			max="21"
			/>
			{errors.horaEnvioFin}
			<br/><br/>
			
		</fieldset>
		
		</div>
		<br/>
		
		<div>
			* Campo obligatorio
		</div>
		<div>
			** La entrega se realizará en la horquilla de horas indicada
		</div>
	
		<br/><br/>
		
		

		
		<h2>Elige tu método de pago 👇</h2>
         <div className="grid">
         <PayPalButton
			 amount={this.precio()}
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
             	}).then(() =>{
             		{handleSubmit}
             	})
             	
             	.then(() => 
             	 {
             		 this.handleRedirect();
             	 })
               alert(JSON.stringify(values, null, 2));
               
               setSubmitting(false);
             }, 400);
		   }}
		   
		   options={{
			clientId: "AQ1wSRRux5eVDHDZia2gH5NfFd_dO2-mooYqs-CdF3E53DIHclXqJlDI_2I2vtfIeQi5qVQTciRnOS9Y",
			currency: "EUR"
		  }}
       />
          </div>
        </form>
      )}
    </Formik>
    	
	  </div>
    </div>
	</div>
);
		
		
}
}
export default withRouter(PedidoForm);

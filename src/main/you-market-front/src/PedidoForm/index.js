import React,  { useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import './styles.css'
import { withRouter	} from 'react-router-dom';
import Header from '../Header';
import { PayPalButton } from "react-paypal-button-v2";

function mostrarPedido2() {
	  var x = document.getElementById("pedido2");
	  if (x.style.display === "flex") {
		    x.style.display = "none";
	  } else {
		    x.style.display = "flex";
	  }
	  return false;
};

function mostrarPedido3() {
	  var x = document.getElementById("pedido3");
	  if (x.style.display === "flex") {
		    x.style.display = "none";
	  } else {
		    x.style.display = "flex";
	  }
	  return false;
};

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
		       }).then(function(response) {
            	    return console.log(response.json());
            	
		       });
		   }, []);

		 useEffect(() => {
		  fetchTotal(total);
		   }, []);
		 console.log(total);
		 return total;
	}
	cestas(){
		const[cestas, setCestas] = useState([]);

	const fetchCestas = useCallback(() => {
	    return fetch('/cesta/user' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(cestas => {
	        setCestas(cestas)
	      });
	  }, []);


	useEffect(() => {
	    fetchCestas(cestas);
	  }, []);
	if(cestas==null){
		return [];
	}
	return cestas;
	
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
  	
	  <div className="pedido-container container">
	  <h1>¡Ya queda menos para finalizar tu pedido! Por favor, rellena estos campos ðŸ™�</h1>
    <Formik validateOnChange={false} validateOnBlur={false}
    	className="formulario-pedido"
    	initialValues={{   }}
     	validate={values => {
        const errors = {};
        if (!values.direccion1) {
        	errors.direccion = 'Campo obligatorio';
        } 
        if (!values.fechaEnvio1) {
        	errors.fechaEnvio = 'Campo obligatorio';
        }
        if (values.horaEnvioFin1 < values.horaEnvioIni1) {
        	errors.horaEnvioFin1 = 'La hora final no puede ser anterior a la inicial'
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
        
        <div id="pedido1">
			<div className="pedido-form-envio-container">
			<fieldset> 
			 	<legend><h2>Pedido número 1**</h2> </legend>
	        
	        <label htmlFor="poblacion1">Población*: </label>
	        <input
				id="poblacion1"
				type="text"
				name="poblacion1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.poblacion1}
		        placeholder="Los Palacios y Villafranca"
		        
				/>
			{errors.poblacion1}
			<br/><br/>
	        
			<label htmlFor="cpostal1">Código postal*: </label>
	        <input
				id="cpostal1"
				type="text"
				name="cpostal1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.cpostal1}
		        placeholder="41720"
		        
				/>
				{errors.cpostal1}
				<br/><br/>
			
			<label htmlFor="provincia1">Provincia*: </label>
	        <input
				id="provincia1"
				type="text"
				name="provincia1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.provincia1}
		        placeholder="Sevilla"
		        
				/>
				{errors.provincia1}
				<br/><br/>
			
			
	        <label htmlFor="direccion1">Calle*: </label>
	        <input
				id="direccion1"
				type="text"
				name="direccion1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.direccion1}
		        placeholder="c/Cisnes"
		        
				/>
				{errors.direccion1}
				<br/><br/>
			
			<label htmlFor="numero1">Número*: </label>
	        <input
				id="numero1"
				type="number"
				name="numero1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.numero1}
		        
				/>
				{errors.numero1}
				<br/><br/>
			
			 	
			<label htmlFor="fechaEnvio1">Fecha*: </label>	
			<input
				id="fechaEnvio1"
				type="date"
				name="fechaEnvio1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.fechaEnvio1}
		        
				/>
				{errors.fechaEnvio1}
				<br/><br/>
			 	
				<br/>
			<label htmlFor="horaEnvioIni1">Hora inicial: </label>
			<input
				id="horaEnvioIni1"
				type="number"
				name="horaEnvioIni1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioIni1}
				min="9"
				max="21"
				/>
				{errors.horaEnvioIni1}
				
			<label htmlFor="horaEnvioFin1">   Hora final: </label>
			<input
				type="number"
				name="horaEnvioFin1"
				id="horaEnvioFin1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioFin1}
				min="9"
				max="21"
				/>
				{errors.horaEnvioFin1}
				<br/><br/>
				<label htmlFor="id">   Elige tu cesta: </label>
			   <select name="id" id="id" onChange={handleChange}
			   onBlur={handleBlur} value={values.id}>
			   <option value=""></option>
			   { this.cestas().map((cesta) => (

								   <option value={cesta.id}>{cesta.nombre}</option>
								   ))}
			   <option value="0">Carrito</option>
			   </select>
			   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>
			   
				
			</fieldset>
			</div>
		</div>
		   
		<br/><br/>
		<a href="#"  onClick={mostrarPedido2}>
		+ Añadir pedido número 2
		</a>
		<br/><br/>
		
		
		<div id="pedido2">
				<div className="pedido-form-envio-container" >
			<fieldset> 
			 	<legend><h2>Pedido número 2**</h2> </legend>
			 	
			 <label htmlFor="poblacion2">Población*: </label>
			 <input
				id="poblacion2"
				type="text"
				name="poblacion2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.poblacion2}
		        placeholder="Los Palacios y Villafranca"
		        
				/>
			{errors.poblacion2}
			<br/><br/>
	        
			<label htmlFor="cpostal2">Código postal*: </label>
	        <input
				id="cpostal2"
				type="text"
				name="cpostal2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.cpostal2}
		        placeholder="41720"
		        
				/>
				{errors.cpostal2}
				<br/><br/>
			
			<label htmlFor="provincia2">Provincia*: </label>
	        <input
				id="provincia2"
				type="text"
				name="provincia2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.provincia2}
		        placeholder="Sevilla"
		        
				/>
				{errors.provincia2}
				<br/><br/>
			
			
	        <label htmlFor="direccion2">Calle*: </label>
	        <input
				id="direccio2n"
				type="text"
				name="direccion2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.direccion2}
		        placeholder="c/Cisnes"
		        
				/>
				{errors.direccion2}
				<br/><br/>
			
			<label htmlFor="numero2">Número*: </label>
	        <input
				id="numero2"
				type="number"
				name="numero2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.numero2}
		        
				/>
				{errors.numero2}
				<br/><br/>
			
			 	
			<label htmlFor="fechaEnvio2">Fecha*: </label>	
			<input
				id="fechaEnvio2"
				type="date"
				name="fechaEnvio2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.fechaEnvio2}
		        
				/>
				{errors.fechaEnvio2}
				<br/><br/>
			 	
				<br/>
			<label htmlFor="horaEnvioIni2">Hora inicial: </label>
			<input
				id="horaEnvioIni2"
				type="number"
				name="horaEnvioIni2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioIni2}
				min="9"
				max="21"
				/>
				{errors.horaEnvioIni2}
				
			<label htmlFor="horaEnvioFin2">   Hora final: </label>
			<input
				type="number"
				name="horaEnvioFin2"
				id="horaEnvioFin2"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioFin2}
				min="9"
				max="21"
				/>
				{errors.horaEnvioFin2}
				<br/><br/>
				
				<label htmlFor="id">   Elige tu cesta: </label>
				   <select name="id" id="id" onChange={handleChange}
				   onBlur={handleBlur} value={values.id}>
				   <option value=""></option>
				   { this.cestas().map((cesta) => (

									   <option value={cesta.id}>{cesta.nombre}</option>
									   ))}
				   <option value="0">Carrito</option>
				   </select>
				   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>
	

			</fieldset>
			</div>
			<br/>
			<a href="#"  onClick={mostrarPedido3}>
			+ Añadir pedido número 3
			</a>
			<br/><br/>
		</div>	
		<br/><br/>

		
		<div className="pedido-form-envio-container" id="pedido3">

		<br/><br/>
		<fieldset> 
		 	<legend><h2>Pedido número 3**</h2> </legend>
		 	
		 <label htmlFor="poblacion3">Población*: </label>
		 <input
			id="poblacion3"
			type="text"
			name="poblacion3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.poblacion3}
	        placeholder="Los Palacios y Villafranca"
	        
			/>
		{errors.poblacion3}
		<br/><br/>
        
		<label htmlFor="cpostal3">Código postal*: </label>
        <input
			id="cpostal3"
			type="text"
			name="cpostal3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.cpostal3}
	        placeholder="41720"
	        
			/>
			{errors.cpostal3}
			<br/><br/>
		
		<label htmlFor="provincia3">Provincia*: </label>
        <input
			id="provincia3"
			type="text"
			name="provincia3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.provincia3}
	        placeholder="Sevilla"
	        
			/>
			{errors.provincia3}
			<br/><br/>
		
		
        <label htmlFor="direccion3">Calle*: </label>
        <input
			id="direccio3n"
			type="text"
			name="direccion3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.direccion3}
	        placeholder="c/Cisnes"
	        
			/>
			{errors.direccion3}
			<br/><br/>
		
		<label htmlFor="numero3">Número*: </label>
        <input
			id="numero3"
			type="number"
			name="numero3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.numero3}
	        
			/>
			{errors.numero3}
			<br/><br/>
		
		 	
		<label htmlFor="fechaEnvio3">Fecha*: </label>	
		<input
			id="fechaEnvio3"
			type="date"
			name="fechaEnvio3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.fechaEnvio3}
	        
			/>
			{errors.fechaEnvio3}
			<br/><br/>
		 	
			<br/>
		<label htmlFor="horaEnvioIni3">Hora inicial: </label>
		<input
			id="horaEnvioIni3"
			type="number"
			name="horaEnvioIni3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioIni3}
			min="9"
			max="21"
			/>
			{errors.horaEnvioIni3}
			
		<label htmlFor="horaEnvioFin3">   Hora final: </label>
		<input
			type="number"
			name="horaEnvioFin3"
			id="horaEnvioFin3"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioFin3}
			min="9"
			max="21"
			/>
			{errors.horaEnvioFin3}
			<br/><br/>
			
			<label htmlFor="id">   Elige tu cesta: </label>
			   <select name="id" id="id" onChange={handleChange}
			   onBlur={handleBlur} value={values.id}>
			   <option value=""></option>
			   { this.cestas().map((cesta) => (

								   <option value={cesta.id}>{cesta.nombre}</option>
								   ))}
			   <option value="0">Carrito</option>
			   </select>
			   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>
			   
			
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
		
        <button type="submit" disabled={isSubmitting} onClick="mostrar()">
        	Enviar
        </button>

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
	             	}).then(() =>
	    				{handleSubmit}             	
	             	).then(() => 
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

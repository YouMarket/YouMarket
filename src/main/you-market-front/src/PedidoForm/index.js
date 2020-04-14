import React,  { useCallback, useState, useEffect} from 'react';
import { Formik, Field, Button, useFormikContext, setFieldValue} from 'formik';
import './styles.css'
import noPedido from "./no-del.png";
import { withRouter, useHistory } from 'react-router-dom';
import Header from '../Header';
import { PayPalButton } from "react-paypal-button-v2";

var today = new Date().toISOString().split('T')[0];

var pedido1mostrado;
var pedido2mostrado;
var pedido3mostrado;
var pedido4mostrado;

var pedido2copiado = false;
var pedido3copiado = false;
var pedido4copiado = false;


function copiarDir12() {
	  var direccion1 = document.getElementById("direccion1");
	  var poblacion1 = document.getElementById("poblacion1");
	  var cpostal1 = document.getElementById("cpostal1");
	  var numero1 = document.getElementById("numero1");
	  var provincia1 = document.getElementById("provincia1");

	  var direccion2 = document.getElementById("direccion2");
	  var poblacion2 = document.getElementById("poblacion2");
	  var cpostal2 = document.getElementById("cpostal2");
	  var numero2 = document.getElementById("numero2");
	  var provincia2 = document.getElementById("provincia2");


	  document.getElementById("poblacion2").value= poblacion1.value;
	  document.getElementById("cpostal2").value= cpostal1.value;
	  document.getElementById("numero2").value= numero1.value;
	  document.getElementById("provincia2").value = provincia1.value;
	  document.getElementById("direccion2").value = direccion1.value;


	  pedido2copiado = true;
	  return false;
};

function copiarDir13() {
	  var direccion1 = document.getElementById("direccion1");
	  var poblacion1 = document.getElementById("poblacion1");
	  var cpostal1 = document.getElementById("cpostal1");
	  var numero1 = document.getElementById("numero1");
	  var provincia1 = document.getElementById("provincia1");

	  var direccion3 = document.getElementById("direccion3");
	  var poblacion3 = document.getElementById("poblacion3");
	  var cpostal3 = document.getElementById("cpostal3");
	  var numero3 = document.getElementById("numero3");
	  var provincia3 = document.getElementById("provincia3");


	  document.getElementById("poblacion3").value= poblacion1.value;
	  document.getElementById("cpostal3").value= cpostal1.value;
	  document.getElementById("numero3").value= numero1.value;
	  document.getElementById("provincia3").value= provincia1.value;
	  document.getElementById("direccion3").value= direccion1.value;


	  pedido3copiado = true;

	  return false;
}; 

function copiarDir14() {
	  var direccion1 = document.getElementById("direccion1");
	  var poblacion1 = document.getElementById("poblacion1");
	  var cpostal1 = document.getElementById("cpostal1");
	  var numero1 = document.getElementById("numero1");
	  var provincia1 = document.getElementById("provincia1");

	  var direccion4 = document.getElementById("direccion4");
	  var poblacion4 = document.getElementById("poblacion4");
	  var cpostal4 = document.getElementById("cpostal4");
	  var numero4 = document.getElementById("numero4");
	  var provincia4 = document.getElementById("provincia4");

	  document.getElementById("poblacion4").value= poblacion1.value;
	  document.getElementById("cpostal4").value= cpostal1.value;
	  document.getElementById("numero4").value= numero1.value;
	  document.getElementById("provincia4").value= provincia1.value;
	  document.getElementById("direccion4").value= direccion1.value;

	  pedido4copiado = true;
	  
	  return false;
};

function validDate1(){
	var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("fechaEnvio1")[0].setAttribute('min', today);
}
function validDate2(){
	var today = new Date().toISOString().split('T')[0];
	document.getElementsByName("fechaEnvio2")[0].setAttribute('min', today);
    
}
function validDate3(){
	var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("fechaEnvio3")[0].setAttribute('min', today);
}
function validDate4(){
	var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("fechaEnvio4")[0].setAttribute('min', today);
}



export function PedidoForm() {

	let history = useHistory();

	const [envioTomas, setEnvioTomas] = useState(0);
	
	
	
	useEffect(() => {
		

		
		fetch('/usuario/envios', {
			headers:{
			  'Content-Type' : 'application/json',
			  'Accept' : 'application/json',
			  'Authorization' : 'Bearer ' + localStorage.getItem('auth')
			  		},
			  method:'GET'})
			       .then(res => res.json())
			       .then(envios1 => {
			    	   setEnvioTomas(envios1);
			       });
		
		  }, []);
	


	
	const precio = () => {
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
	
	const mostrarPedido1 = () => {
		
		var x = document.getElementById("pedido1");
		var y = document.getElementById("enlace1");
		
		
		if (x.style.display === "flex") {
			 pedido1mostrado = "no";
			 x.style.display = "none";
			 y.style.display = "none";
		} else {
			 pedido1mostrado = "si";
			 x.style.display = "flex";
			 //Si tiene más de 1, se muestra el enlace de mostrar tercer pedido
			 if(envioTomas > 2){
				 y.style.display = "flex";
			 }
		}

		return false;
	}
	
	
	
	const mostrarPedido2 = () => {
		
		var x = document.getElementById("pedido2");
		var y = document.getElementById("enlace2");
		
		
		if (x.style.display === "flex") {
			 pedido2mostrado = "no";
			 x.style.display = "none";
			 y.style.display = "none";
			 document.getElementById("poblacion2").enabled = "";
			 document.getElementById("cpostal2").value = "";
			 document.getElementById("numero2").value = "";
			 document.getElementById("provincia2").value = "";
			 document.getElementById("direccion2").value = "";
			 
			 
		} else {
			 document.getElementById("poblacion2").value = "";
			 document.getElementById("cpostal2").value = "";
			 document.getElementById("numero2").value = "";
			 document.getElementById("provincia2").value = "";
			 document.getElementById("direccion2").value = "";
			 pedido2mostrado = "si";
			 x.style.display = "flex";
			 //Si tiene más de 2, se muestra el enlace de mostrar tercer pedido
			 if(envioTomas > 2){
				 y.style.display = "flex";
			 }
		}

		return false;
	}
	
	const mostrarPedido3 = () => {
		  var x = document.getElementById("pedido3");
		  var y = document.getElementById("enlace3")
		  
		  if (x.style.display === "flex") {
			  	pedido3mostrado = "no";
			    x.style.display = "none";
			    y.style.display = "none";
		  } else {
			  	pedido3mostrado = "si";
			    x.style.display = "flex";
				//Si tiene más de 3, se muestra el enlace de mostrar cuarto pedido
				if(envioTomas > 3){
					y.style.display = "flex";
				}
		  }
		  return false;
	};
	
	const mostrarPedido4 = () => {
		  var x = document.getElementById("pedido4");
		  var y = document.getElementById("enlace4")
		  if (x.style.display === "flex") {
			  	pedido4mostrado = "no";
			    x.style.display = "none";
			    y.style.display = "none";
		  } else {
			  	pedido4mostrado = "si";
			    x.style.display = "flex";
			    y.style.display = "flex";
		  }
		  return false;
	};
	
	
	const cestas = () => {
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
	
	
	const handleRedirect = () => {
		history.push('/');
	}

		if(localStorage.getItem('auth')==null){
			this.props.history.push('/login');
		}
		
		return(
				
				
	<div>
		<Header/>
	<div>


	{envioTomas > 0 ? 
	  (<div className="pedido-container container">
	  <h1>¡Ya queda menos para finalizar tu pedido! Por favor, rellena estos campos ðŸ™�</h1>
	  <br/>
	  <h3> Te queda/n {envioTomas} envíos por realizar de tu suscripción. </h3>
	  <Formik validateOnChange={false} validateOnBlur={false} id="formikito"
    	className="formulario-pedido"
    	initialValues={{   }}
     	validate={values => {
        const errors = {};
        //Pedido 1
        if (!values.direccion1) {
        	errors.direccion1 = 'Campo obligatorio';
        }
        if (!values.poblacion1) {
        	errors.poblacion1 = 'Campo obligatorio';
        }
        if (!values.cpostal1) {
        	errors.cpostal1 = 'Campo obligatorio';
        }
        if (!values.provincia1) {
        	errors.provincia1 = 'Campo obligatorio';
        }
        if (!values.numero1) {
        	errors.numero1 = 'Campo obligatorio';
        }
        if (!values.fechaEnvio1) {
        	errors.fechaEnvio1 = 'Campo obligatorio';
        }
        
        if (values.horaEnvioFin1 < values.horaEnvioIni1) {
        	errors.horaEnvioFin1 = 'La hora final no puede ser anterior a la inicial'
        }
        

        if(pedido2copiado = true){
        	values.direccion2 = values.direccion1;
        	values.poblacion2 = values.poblacion1;
        	values.cpostal2 = 	values.cpostal1;
        	values.provincia2 = values.provincia1;
        	values.numero2	  = values.numero1;
        	
        	pedido2copiado = false;
        }

        if(pedido3copiado == true){
        	values.direccion3 = values.direccion1;
        	values.poblacion3 = values.poblacion1;
        	values.cpostal3 = 	values.cpostal1;
        	values.provincia3 = values.provincia1;
        	values.numero3	  = values.numero1;
        	
        	pedido3copiado = false;
        }
        
        if(pedido4copiado == true){
        	values.direccion4 = values.direccion1;
        	values.poblacion4 = values.poblacion1;
        	values.cpostal4 = 	values.cpostal1;
        	values.provincia4 = values.provincia1;
        	values.numero4	  = values.numero1;
        	
        	pedido4copiado = false;
        }
        
        
        
        //Pedido 2
        if (pedido2mostrado === "si"){
	        if (!values.direccion2) {
	        	errors.direccion2 = 'Campo obligatorio';
	        }
	        if (!values.poblacion2) {
	        	errors.poblacion2 = 'Campo obligatorio';
	        }
	        if (!values.cpostal2) {
	        	errors.cpostal2 = 'Campo obligatorio';
	        }
	        if (!values.provincia2) {
	        	errors.provincia2 = 'Campo obligatorio';
	        }
	        if (!values.numero2) {
	        	errors.numero2 = 'Campo obligatorio';
	        }
	        
	        if (!values.fechaEnvio2) {
	        	errors.fechaEnvio2 = 'Campo obligatorio';
	        }
	        if (values.horaEnvioFin2 < values.horaEnvioIni2) {
	        	errors.horaEnvioFin2 = 'La hora final no puede ser anterior a la inicial'
	        }
        } else {
        	values.direccion2 = null;
        	values.poblacion2 = null;
        	values.cpostal2 = null;
        	values.provincia2 = null;
        	values.numero2 = null;
        	values.fechaEnvio2 = null;
        	values.horaEnvioFin2 = null;
        	values.horaEnvioIni2 = null;
        }
        
               
        //Pedido 3
        if (pedido3mostrado === "si"){
	        if (!values.direccion3) {
	        	errors.direccion3 = 'Campo obligatorio';
	        }
	        if (!values.poblacion3) {
	        	errors.poblacion3 = 'Campo obligatorio';
	        }
	        if (!values.cpostal3) {
	        	errors.cpostal3 = 'Campo obligatorio';
	        }
	        if (!values.provincia3) {
	        	errors.provincia3 = 'Campo obligatorio';
	        }
	        if (!values.numero3) {
	        	errors.numero3 = 'Campo obligatorio';
	        }
	        if (!values.fechaEnvio3) {
	        	errors.fechaEnvio3 = 'Campo obligatorio';
	        }
	        if (values.horaEnvioFin3 < values.horaEnvioIni3) {
	        	errors.horaEnvioFin3 = 'La hora final no puede ser anterior a la inicial'
	        }
        } else {
        	values.direccion3 = null;
        	values.poblacion3 = null;
        	values.cpostal3 = null;
        	values.provincia3 = null;
        	values.numero3 = null;
        	values.fechaEnvio3 = null;
        	values.horaEnvioFin3 = null;
        	values.horaEnvioIni3 = null;
        }
        
        
        //Pedido 4
        if (pedido4mostrado === "si"){
	        if (!values.direccion4) {
	        	errors.direccion4 = 'Campo obligatorio';
	        }
	        if (!values.poblacion4) {
	        	errors.poblacion4 = 'Campo obligatorio';
	        }
	        if (!values.cpostal4) {
	        	errors.cpostal4 = 'Campo obligatorio';
	        }
	        if (!values.provincia4) {
	        	errors.provincia4 = 'Campo obligatorio';
	        }
	        if (!values.numero4) {
	        	errors.numero4 = 'Campo obligatorio';
	        }
	        if (!values.fechaEnvio4) {
	        	errors.fechaEnvio4 = 'Campo obligatorio';
	        }
	        if (values.horaEnvioFin4 < values.horaEnvioIni4) {
	        	errors.horaEnvioFin4 = 'La hora final no puede ser anterior a la inicial'
	        }
        } else {
        	values.direccion4 = null;
        	values.poblacion4 = null;
        	values.cpostal4 = null;
        	values.provincia4 = null;
        	values.numero4 = null;
        	values.fechaEnvio4 = null;
        	values.horaEnvioFin4 = null;
        	values.horaEnvioIni4 = null;
        }
        
        
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch('/pedido/create', {
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
        		 handleRedirect();
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
	     	        
	        
	        
	        <Field
				id="poblacion1"
				type="text"
				name="poblacion1"
				value={values.poblacion1}
		        placeholder="Los Palacios y Villafranca"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
		        <div className="errores">
		        	{errors.poblacion1}
		        </div>
			<br/><br/>

			<label htmlFor="cpostal1">Código postal*: </label>
	        <Field
				id="cpostal1"
				type="text"
				name="cpostal1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.cpostal1}
		        placeholder="41720"
		        pattern="^\d{5}$"
				/>
		        <div className="errores">
		        	{errors.cpostal1}
		        </div>
				<br/><br/>

			<label htmlFor="provincia1">Provincia*: </label>
	        <Field
				id="provincia1"
				type="text"
				name="provincia1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.provincia1}
		        placeholder="Sevilla"
				/>
		        <div className="errores">
		        	{errors.provincia1}
		        </div>
				<br/><br/>

			
	        <label htmlFor="direccion1">Calle*: </label>
	        <Field
				id="direccion1"
				type="text"
				name="direccion1"			
				value={values.direccion1}
		        placeholder="c/Cisnes"
				onChange={handleChange}
				onBlur={handleBlur}
		      	/>

		        	
		        <div className="errores">
		        	{errors.direccion1}
		        </div>
				<br/><br/>

			<label htmlFor="numero1">Número*: </label>
	        <Field
				id="numero1"
				type="number"
				name="numero1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.numero1}
	        	min="0"
				/>
	        	<div className="errores">
	        	{errors.numero1}
	        	</div>
				<br/><br/>


			<label htmlFor="fechaEnvio1">Fecha*: </label>
			<Field
				id="fechaEnvio1"
				type="date"
				name="fechaEnvio1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.fechaEnvio1}
				min={today}
				/>
				<div className="errores">
				{errors.fechaEnvio1}
				</div>
				<br/><br/>

				<br/>
			<label htmlFor="horaEnvioIni1">Hora inicial: </label>
			<Field
				id="horaEnvioIni1"
				type="number"
				name="horaEnvioIni1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioIni1}
				min="9"
				max="21"
				/>
				<div className="errores">
					{errors.horaEnvioIni1}
				</div>

			<label htmlFor="horaEnvioFin1">   Hora final: </label>
			<Field
				type="number"
				name="horaEnvioFin1"
				id="horaEnvioFin1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioFin1}
				min="9"
				max="21"
				/>
				<div className="errores">
					{errors.horaEnvioFin1}
				</div>
				<br/><br/>
				<label htmlFor="cestaId1" className="s">   Elige tu cesta: </label>
			   <select name="cestaId1" id="cestaId1" 
			    value={values.id} onChange={handleChange}
				onBlur={handleBlur}>

			   { cestas().map((cesta) => (

								   <option value={cesta.id}>{cesta.nombre}</option>
								   ))}
			   <option value="0">Carrito</option>
			   </select>
			   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>


			</fieldset>
			</div>
		</div>
		
		{envioTomas > 1 ? 
	        <div id="enlace1">
	        		<div>
					<br/><br/>
						<a href="#enlaceMostrarPedido2"  onClick={mostrarPedido2} id="enlaceMostrarPedido2">
						+ Añadir/eliminar pedido número 2
						</a>
					<br/><br/>
	        		</div>
	        </div>
		:
			<div>
	        
	        </div>
	    }
		<div id="pedido2">
			<div className="pedido-form-envio-container" >
			<fieldset>
				<div className="mismaLinea">
				 	<h2 className="tituloPedido">Pedido número 2**</h2>

				 	<a className="botonCopiar" href="#pedido2" onClick={copiarDir12}>  Copiar dirección </a>
			 	</div>
			 <label htmlFor="poblacion2">Población*: </label>

			 <input
				id="poblacion2"
				type="text"
				name="poblacion2"
				onChange={handleChange}
				onBlur={handleBlur}
		        placeholder="Los Palacios y Villafranca"
				/>
		    
		       	<div className="errores">
		        {errors.poblacion2}
		    </div>
			<br/><br/>

			<label htmlFor="cpostal2">Código postal*: </label>
	        <input
				id="cpostal2"
				type="text"
				name="cpostal2"
				onChange={handleChange}
				onBlur={handleBlur}
		        placeholder="41720"
		        pattern="^\d{5}$"
				/>
		     
		        	
		     <div className="errores">
		     	{errors.cpostal2}
		     </div>
				<br/><br/>

			<label htmlFor="provincia2">Provincia*: </label>
	        <input
				id="provincia2"
				type="text"
				name="provincia2"
				value={values.provincia2}
		        placeholder="Sevilla"
		    	onChange={handleChange}
				onBlur={handleBlur}
		        				/>
		        <div className="errores">
		        {errors.provincia2}
		        </div>
				<br/><br/>


	        <label htmlFor="direccion2">Calle*: </label>
	        <input
				id="direccion2"
				type="text"
				name="direccion2"
				value={values.direccion2}
		        placeholder="c/Cisnes"
		    	onChange={handleChange}
				onBlur={handleBlur}
				/>
		        <div className="errores">
		        {errors.direccion2}
		        </div>
				<br/><br/>

			<label htmlFor="numero2">Número*: </label>
	        <input
				id="numero2"
				type="number"
				name="numero2"
				value={values.numero2}
	        	min="0"
	        	onChange={handleChange}
	    		onBlur={handleBlur}
				/>
	        	<div className="errores">
	        		{errors.numero2}
	        	</div>
				<br/><br/>


			<label htmlFor="fechaEnvio2">Fecha*: </label>
			<input
				id="fechaEnvio2"
				type="date"
				name="fechaEnvio2"
				value={values.fechaEnvio2}
				onChange={handleChange}
				onBlur={handleBlur}
				min={today}
				/>
				<div className="errores">
				{errors.fechaEnvio2}
				</div>
				<br/><br/>

				<br/>
			<label htmlFor="horaEnvioIni2">Hora inicial: </label>
			<input
				id="horaEnvioIni2"
				type="number"
				name="horaEnvioIni2"
				value={values.horaEnvioIni2}
				min="9"
				max="21"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
				<div className="errores">
					{errors.horaEnvioIni2}
				</div>

			<label htmlFor="horaEnvioFin2">Hora final: </label>
			<input
				type="number"
				name="horaEnvioFin2"
				id="horaEnvioFin2"
				value={values.horaEnvioFin2}
				min="9"
				max="21"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
				<div className="errores">
				{errors.horaEnvioFin2}
				<br/><br/>
				</div>
				<label htmlFor="cestaId2">   Elige tu cesta: </label>
				   <select name="cestaId2" id="cestaId2" value={values.id} 	onChange={handleChange}
					onBlur={handleBlur}>
				   { cestas().map((cesta) => (

									   <option value={cesta.id}>{cesta.nombre}</option>
									   ))}
				   <option value="0">Carrito</option>
				   </select>
				   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>

			</fieldset>
			</div>
			<br/><br/>
		</div>
		<br/><br/>
		
		
		
		<div id="enlace2">
			<br/><br/>
			<a href="#enlaceMostrarPedido3"  onClick={mostrarPedido3} id = "enlaceMostrarPedido3">
				+ Añadir/Eliminar pedido número 3
			</a>
			<br/><br/>
		</div>
		<br/><br/>
		<div id="pedido3">
			<div className="pedido-form-envio-container" >
			<fieldset>
			<div className="mismaLinea">
			 	<h2 className="tituloPedido">Pedido número 3**</h2>
	
			 	<a className="botonCopiar" href="#pedido3" onClick={copiarDir13}>  Copiar dirección </a>
        	</div>

			 <label htmlFor="poblacion3">Población*: </label>
			 <input
				id="poblacion3"
				type="text"
				name="poblacion3"
				value={values.poblacion3}
			 	onChange={handleChange}
				onBlur={handleBlur}
		        placeholder="Los Palacios y Villafranca"

				/>
		    <div className="errores">
		        {errors.poblacion3}
		    </div>
			<br/><br/>

			<label htmlFor="cpostal3">Código postal*: </label>
	        <input
				id="cpostal3"
				type="text"
				name="cpostal3"
				value={values.cpostal3}
		        placeholder="41720"
			    pattern="^\d{5}$"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
		        <div className="errores">
		        	{errors.cpostal3}
		        </div>
				<br/><br/>

			<label htmlFor="provincia3">Provincia*: </label>
	        <input
				id="provincia3"
				type="text"
				name="provincia3"
				value={values.provincia3}
		        placeholder="Sevilla"
		        onChange={handleChange}
				onBlur={handleBlur}
				/>
		        <div className="errores">
	        		{errors.provincia3}
	        	</div>
				<br/><br/>


	        <label htmlFor="direccion3">Calle*: </label>
	        <input
				id="direccion3"
				type="text"
				name="direccion3"
				value={values.direccion3}
		        placeholder="c/Cisnes"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
				<div className="errores">
		        {errors.direccion3}
		        </div>
				<br/><br/>

			<label htmlFor="numero3">Número*: </label>
	        <input
				id="numero3"
				type="number"
				name="numero3"
				value={values.numero3}
	        	min="0"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
	        	<div className="errores">
	        		{errors.numero3}
	        	</div>
				<br/><br/>


			<label htmlFor="fechaEnvio3">Fecha*: </label>
			<input
				id="fechaEnvio3"
				type="date"
				name="fechaEnvio3"
				value={values.fechaEnvio3}
				onChange={handleChange}
				onBlur={handleBlur}
				min={today}
				/>
				<div className="errores">
					{errors.fechaEnvio3}
				</div>
				<br/><br/>

				<br/>
			<label htmlFor="horaEnvioIni3">Hora inicial: </label>
			<input
				id="horaEnvioIni3"
				type="number"
				name="horaEnvioIni3"
				value={values.horaEnvioIni3}
				onChange={handleChange}
				onBlur={handleBlur}
				min="9"
				max="21"
				/>
				<div className="errores">
					{errors.horaEnvioIni3}
				</div>

			<label htmlFor="horaEnvioFin3">Hora final: </label>
			<input
				type="number"
				name="horaEnvioFin3"
				id="horaEnvioFin3"
				value={values.horaEnvioFin3}
				min="9"
				max="21"
				onChange={handleChange}
				onBlur={handleBlur}
				/>
				<div className="errores">
					{errors.horaEnvioFin3}
				</div>
				<br/><br/>
				
				<label htmlFor="cestaId3" className="s">   Elige tu cesta: </label>
				   <select name="cestaId3" id="cestaId3" 
				    value={values.id} onChange={handleChange}
					onBlur={handleBlur}>
				   { cestas().map((cesta) => (

									   <option value={cesta.id}>{cesta.nombre}</option>
									   ))}
				   <option value="0">Carrito</option>
				   </select>
				   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>

			</fieldset>
			</div>
			<br/><br/>
		</div>
		<br/><br/>
		<div id="enlace3">
			<br/><br/>
			<a href="#enlaceMostrarPedido4"  onClick={mostrarPedido4} id="enlaceMostrarPedido4">
				+ Añadir/Eliminar pedido número 4
			</a>
			<br/><br/>
		</div>
		<br/><br/>
		<div id="pedido4">
		<div className="pedido-form-envio-container" >
		<fieldset>
			<div className="mismaLinea">
		 	<h2 className="tituloPedido">Pedido número 4**</h2>

		 	<a className="botonCopiar" href="#pedido4" onClick={copiarDir14}>  Copiar dirección </a>
    	</div>

		 <label htmlFor="poblacion4">Población*: </label>
		 <input
			id="poblacion4"
			type="text"
			name="poblacion4"
			value={values.poblacion4}
	        placeholder="Los Palacios y Villafranca"
			onChange={handleChange}
			onBlur={handleBlur}
			/>
	    <div className="errores">
	        {errors.poblacion4}
	    </div>
		<br/><br/>

		<label htmlFor="cpostal4">Código postal*: </label>
        <input
			id="cpostal4"
			type="text"
			name="cpostal4"
			value={values.cpostal4}
	        placeholder="41720"
	        pattern="^\d{5}$"
			onChange={handleChange}
			onBlur={handleBlur}
			/>
	    <div className="errores">
	        {errors.cpostal4}
	    </div>
			<br/><br/>

		<label htmlFor="provincia4">Provincia*: </label>
        <input
			id="provincia4"
			type="text"
			name="provincia4"
			value={values.provincia4}
	        placeholder="Sevilla"
			onChange={handleChange}
			onBlur={handleBlur}
			/>
	        <div className="errores">
	        	{errors.provincia4}
	        </div>
			<br/><br/>


        <label htmlFor="direccion4">Calle*: </label>
        <input
			id="direccion4"
			type="text"
			name="direccion4"
			value={values.direccion4}
	        placeholder="c/Cisnes"
			onChange={handleChange}
			onBlur={handleBlur}
			/>
	        <div className="errores">
	        	{errors.direccion4}
	        </div>
			<br/><br/>

		<label htmlFor="numero4">Número*: </label>
        <input
			id="numero4"
			type="number"
			name="numero4"
			value={values.numero4}
        	min="0"
    		onChange={handleChange}
			onBlur={handleBlur}
			/>
        	<div className="errores">
        		{errors.numero4}
        	</div>
			<br/><br/>


		<label htmlFor="fechaEnvio4">Fecha*: </label>
		<input
			id="fechaEnvio4"
			type="date"
			name="fechaEnvio4"
			value={values.fechaEnvio4}
			onChange={handleChange}
			onBlur={handleBlur}
			min={today}
			/>
			<div className="errores">
				{errors.fechaEnvio4}
			</div>
			<br/><br/>

			<br/>
		<label htmlFor="horaEnvioIni4">Hora inicial: </label>
		<input
			id="horaEnvioIni4"
			type="number"
			name="horaEnvioIni4"
			value={values.horaEnvioIni4}
			min="9"
			max="21"
			onChange={handleChange}
			onBlur={handleBlur}
			/>
			<div className="errores">
				{errors.horaEnvioIni4}
			</div>

		<label htmlFor="horaEnvioFin4">Hora final: </label>
		<input
			type="number"
			name="horaEnvioFin4"
			id="horaEnvioFin4"
			value={values.horaEnvioFin4}
			min="9"
			max="21"
			onChange={handleChange}
			onBlur={handleBlur}
			/>
			<div className="errores">
				{errors.horaEnvioFin4}
			</div>
				<br/><br/>
			<label htmlFor="cestaId4">   Elige tu cesta: </label>
			   <select name="cestaId4" id="cestaId4" 
			    value={values.id} onChange={handleChange}
				onBlur={handleBlur}>
			   { cestas().map((cesta) => (

								   <option value={cesta.id}>{cesta.nombre}</option>
								   ))}
			   <option value="0">Carrito</option>
			   </select>
			   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>

		</fieldset>
		</div>
		<br/><br/>
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
				 amount={precio()}
	         onSuccess={(values, { setSubmitting }) => {
	             setTimeout(() => {
	             	fetch('', {
	             			headers: {
	             				"Content-Type": "application/json"
	             			},
	             			method:'POST',
	             			body:JSON.stringify(values, null, 2)
	             	}).then(() =>
	             	 {
	             		 handleSubmit();
	             	 }).then(() =>
	             	 {
	             		 handleRedirect();
	             	 })

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


		 ):(<div className="pedido-0-container">
		 <h3> No te quedan envíos por realizar de tu suscripción. </h3>
		 <img src={noPedido} className="imagen-0-pedidos"/>
		 <p>Vuelve cuando hayas renovado tu suscripción.</p>
		 
		 </div>)}
	  
    </div>

	</div>
);



}
export default withRouter(PedidoForm);

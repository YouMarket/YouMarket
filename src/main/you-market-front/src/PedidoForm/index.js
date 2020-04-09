import React,  { useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import './styles.css'
import { withRouter	} from 'react-router-dom';
import Header from '../Header';
import { PayPalButton } from "react-paypal-button-v2";

var pedido2mostrado;
var pedido3mostrado;
var pedido4mostrado;

function mostrarPedido2() {
	  var x = document.getElementById("pedido2");
	  var y = document.getElementById("enlace2")
	  if (x.style.display === "flex") {
		  	pedido2mostrado = "no";
		    x.style.display = "none";
		    y.style.display = "none";
	  } else {
		  	pedido2mostrado = "si";
		    x.style.display = "flex";
		    y.style.display = "flex";
	  }
	  return false;
};

function mostrarPedido3() {
	  var x = document.getElementById("pedido3");
	  var y = document.getElementById("enlace3")
	  if (x.style.display === "flex") {
		  	pedido3mostrado = "no";
		    x.style.display = "none";
		    y.style.display = "none";
	  } else {
		  	pedido3mostrado = "si";
		    x.style.display = "flex";
		    y.style.display = "flex";
	  }
	  return false;
};

function mostrarPedido4() {
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
	  document.getElementById("provincia2").value= provincia1.value;
	  document.getElementById("direccion2").value= direccion1.value;


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
		        <div className="errores">
		        	{errors.poblacion1}
		        </div>
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
		        pattern="^\d{5}$"
				/>
		        <div className="errores">
		        	{errors.cpostal1}
		        </div>
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
		        <div className="errores">
		        	{errors.provincia1}
		        </div>
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

		        <div className="errores">
		        	{errors.direccion1}
		        </div>
				<br/><br/>

			<label htmlFor="numero1">Número*: </label>
	        <input
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
			<input
				id="fechaEnvio1"
				type="date"
				name="fechaEnvio1"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.fechaEnvio1}

				/>
				<div className="errores">
				{errors.fechaEnvio1}
				</div>
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
				<div className="errores">
					{errors.horaEnvioIni1}
				</div>

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
				<div className="errores">
					{errors.horaEnvioFin1}
				</div>
				<br/><br/>
				<label htmlFor="id" className="s">   Elige tu cesta: </label>
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
		<a href="#enlaceMostrarPedido2"  onClick={mostrarPedido2} id="enlaceMostrarPedido2">
		+ Añadir/eliminar pedido número 2
		</a>
		<br/><br/>

		<div id="pedido2">
			<div className="pedido-form-envio-container" >
			<fieldset>
				<div>
				 	<h2>Pedido número 2**</h2>

				    <button className="botonCopiar" onClick={copiarDir12}>
		        		Copiar dirección
		        	</button>
			 	</div>
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
				value={values.cpostal2}
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.provincia2}
		        placeholder="Sevilla"
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.direccion2}
		        placeholder="c/Cisnes"

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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.numero2}
	        	min="0"
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.fechaEnvio2}
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioIni2}
				min="9"
				max="21"
				/>
				<div className="errores">
					{errors.horaEnvioIni2}
				</div>

			<label htmlFor="horaEnvioFin2">Hora final: </label>
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
				<div className="errores">
				{errors.horaEnvioFin2}
				<br/><br/>
				</div>
				<label htmlFor="">   Elige tu cesta: </label>
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
				<div>
				 	<h2>Pedido número 3**</h2> 
	
				    <button className="botonCopiar" onClick={copiarDir13}>
		        		Copiar dirección
		        	</button>
	        	</div>

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
		    <div className="errores">
		        {errors.poblacion3}
		    </div>
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
			    pattern="^\d{5}$"
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.provincia3}
		        placeholder="Sevilla"
				/>
		        <div className="errores">
	        		{errors.provincia3}
	        	</div>
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
				<div className="errores">
		        {errors.direccion3}
		        </div>
				<br/><br/>

			<label htmlFor="numero3">Número*: </label>
	        <input
				id="numero3"
				type="number"
				name="numero3"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.numero3}
	        	min="0"
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.fechaEnvio3}
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioIni3}
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
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.horaEnvioFin3}
				min="9"
				max="21"
				/>
				<div className="errores">
					{errors.horaEnvioFin3}
				</div>
				<br/><br/>
				
				<label htmlFor="id" className="s">   Elige tu cesta: </label>
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
			<div>
		 		<h2>Pedido número 4**</h2>
			    <button className="botonCopiar" onClick={copiarDir13}>
        			Copiar dirección
        		</button>
        	</div>

		 <label htmlFor="poblacion4">Población*: </label>
		 <input
			id="poblacion4"
			type="text"
			name="poblacion4"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.poblacion4}
	        placeholder="Los Palacios y Villafranca"
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
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.cpostal4}
	        placeholder="41720"
	        pattern="^\d{5}$"
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
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.provincia4}
	        placeholder="Sevilla"
			/>
	        <div className="errores">
	        	{errors.provincia4}
	        </div>
			<br/><br/>


        <label htmlFor="direccion4">Calle*: </label>
        <input
			id="direccio4n"
			type="text"
			name="direccion4"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.direccion4}
	        placeholder="c/Cisnes"
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
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.numero4}
        	min="0"
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
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.fechaEnvio4}
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
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioIni4}
			min="9"
			max="21"
			/>
			<div className="errores">
				{errors.horaEnvioIni4}
			</div>

		<label htmlFor="horaEnvioFin4">Hora final: </label>
		<input
			type="number"
			name="horaEnvioFin4"
			id="horaEnvioFin4"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.horaEnvioFin4}
			min="9"
			max="21"
			/>
<div className="errores">
	{errors.horaEnvioFin4}
</div>
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
		<br/><br/>
	</div>
	<br/><br/>



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

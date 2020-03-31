import React, { useState, useCallback, useEffect } from 'react';
import './styles.css';
import Header from '../Header';
import ProductoListado from '../ProductoListado';
import { Formik,Field, Form } from 'formik';
import { useHistory, NavLink } from "react-router-dom";
import shoppingSad from '../assets/shopping-cart-sad.png'

const precioFinal = 0.00
function updatePrecioFinal(cantidad, precio){
	precioFinal += precio*cantidad
	return precioFinal
}

function Carro() {
precioFinal = 0.00
const[carrito, setCarrito] = useState([]);
const[cestas, setCestas] = useState([]);
let history = useHistory();

	const fetchCarrito = useCallback(() => {
		return fetch('carrito')
			.then(res => res.json())
			.then(carrito => {
				setCarrito(carrito)
			});
	}, []);

	useEffect(() => {
		fetchCarrito(carrito);
	},[]);

	const fetchCestas = useCallback(() => {
	    return fetch('cesta/user' , {headers: {
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

	
  return(
		<div>
			<Header/> 
			{carrito.length > 0 ? <div>
			<div className="container clearfix">
			<h1 className="introduction">Este es tu carrito. ¡Estás a pocos pasos de completar tu compra! 👍</h1>
				<div className="vaciar-carrito">
				<Formik
				 onSubmit={(values, { setSubmitting }) => {
				   setTimeout(() => {
					   fetch('/carritoDestroy', {headers: {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
							   method:'POST'
					   }).then((response)=> {
						   setSubmitting=false;
	
					   }).then(() =>
					   {window.location.reload(false);}
					   )
	
	
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
				   <Form onSubmit={handleSubmit}>
	
					 <div className="button-carrito-a-cesta">
					 <button type="submit" disabled={isSubmitting} className="button-vaciar">
					 Vaciar
					 </button>
					 </div>
				  </Form>
	
				 )}
			   </Formik>
				</div>
				<div className="products-container-list">
					{carrito.map((cestaproducto) => (
						<ProductoListado
							id={cestaproducto.producto.id}
							nombre ={cestaproducto.producto.nombre}
							supermercado={cestaproducto.producto.supermercado.nombre}
							precioIva ={cestaproducto.producto.precioIva}
							urlImagen={cestaproducto.producto.urlImagen}
							unidad = {cestaproducto.producto.unidad}
							cantidad = {cestaproducto.cantidad}>
								{updatePrecioFinal(cestaproducto.cantidad, cestaproducto.producto.precioIva)}
						</ProductoListado>
					))}
	
					<div className="price"><b>Precio final: </b>{Math.round(precioFinal * 100) / 100} €</div>
					<div className="buttons">

					{ localStorage.getItem('auth') ? (
						<a href="/pedido/create">
						<button className="button-finish">Terminar pedido</button>
						</a>
					
					): (<a href="/login">
						<button className="button-finish">Terminar pedido</button>
						</a>)}
				 </div>
	
					 { localStorage.getItem('auth') ? (
					<div className="guardar-carrito-a-cesta">
					<h2>¿Quieres guardar tu carrito como cesta?</h2>
					<p>Elige la cesta en la que quieres guardar el carrito:</p>
					<p>(Si guardas este carrito dentro de una cesta que hayas creado,
						  podrás volver a cargar esta cesta como carrito desde la vista
						  de detalle de la cesta que quieras cargar cuando quieras)</p>
					<Formik
					 initialValues={{id: ''}}
					 validate={values => {
						const errors = {};
						if (values.id=="") {
						  errors.id = 'No puede estar vacío';
						}
						return errors;
					  }}
	
					 onSubmit={(values, { setSubmitting }) => {
					   setTimeout(() => {
						   fetch(`/carritoACesta`, {headers: {
							'Content-Type' : 'application/json',
							'Accept' : 'application/json',
							'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
								   method:'POST',
								   body:JSON.stringify(values, null, 2)
						   }).then((response)=> {
							   setSubmitting=false;
	
						   }).then(() =>
						   {history.push(`/show/cesta/${values.id}`);}
						   )
	
	
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
					   <Form onSubmit={handleSubmit}>
					   <div className="">
	
					   <select name="id" id="id" onChange={handleChange}
					   onBlur={handleBlur} value={values.id}>
					   <option value=""></option>
					   { cestas && cestas.map((cesta) => (
	
										   <option value={cesta.id}>{cesta.nombre}</option>
										   ))}
					   </select>
					   <p className="error-required-cesta-a-carrito">{errors.id && touched.id && errors.id}</p>
	
						 <div className="button-carrito-a-cesta">
						 <button type="submit" disabled={isSubmitting} className="button-finish">
						 Guardar como cesta
						 </button>
						 </div>
						</div>
					  </Form>
	
					 )}
				   </Formik>
	
				   </div>
				   ): (<div></div>)}
				</div>
			</div>
		</div>
	 : (
	 <div class="container">
		<h1 className="introduction introduction-empty">Vaya.. parece que aún no tienes productos añadidos</h1>
	 	<div className="introduction"><img className="carrito-empty-image" src={shoppingSad}></img></div>
		<p className="empty-view-text">Si te apetece, puedes añadir productos desde <NavLink className="link-button" to="/products">aquí</NavLink></p>
	 </div>)}
	 
	 </div>

	);
}

export default Carro;

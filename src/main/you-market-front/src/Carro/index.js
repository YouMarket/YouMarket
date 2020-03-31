import React, { useState, useCallback, useEffect } from 'react';
import './styles.css';
import Header from '../Header';
import ProductoListado from '../ProductoListado';
import { Formik,Field, Form } from 'formik';
import { useHistory } from "react-router-dom";

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
				console.log(carrito);
			});
	}, []);
	console.log(carrito);

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
	        console.log(cestas);
	      });
	  }, []);
    console.log(cestas);


	useEffect(() => {
	    fetchCestas(cestas);
	  }, []);
	
  return(
	<div>
		<Header/>

		<div className="container clearfix">
		<p className="introduction">Este es tu carrito de la compra</p>

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
		           {errors.id && touched.id && errors.id}

		             <div className="grid2-carrito-cesta">
		             <button type="submit" disabled={isSubmitting} className="">
		             Guardar como cesta
		             </button>
		             </div>
		            </div>
		          </Form>

		         )}
		       </Formik>
				
					<a href="/pedido/create">
					<button className="button-finish">Terminar pedido</button>
					</a>
				</div>
			</div>
		</div>
	</div>
 );
}

export default Carro;

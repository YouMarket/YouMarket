import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import style from './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { useHistory } from "react-router-dom";

function ShowCesta() {
const [cesta, setCesta] = useState();
const [productoCesta, setProductoCesta] = useState();
const [total, setTotal] = useState(0.0);
let history = useHistory();
const { id } = useParams();

	const fetchCesta = useCallback(() => {
	    return fetch(`../../../cesta/${id}`, {headers:{
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(cesta => {
	        setCesta(cesta)

	      });
	  }, []);


	useEffect(() => {
	    fetchCesta(cesta);
	  }, []);

	const fetchProductoCesta = useCallback(() => {
	    return fetch(`../../../cesta/productos/${id}`, {headers:{
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(productoCesta => {
	        setProductoCesta(productoCesta)

	      });
	  }, []);

	useEffect(() => {
		fetchProductoCesta(productoCesta);
	  }, []);

	const fetchTotal = useCallback(() => {
	    return fetch(`../../../cesta/productos/total/${id}`, {headers:{
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(total1 => {
	        setTotal(total1)

	      });
	  }, []);

	useEffect(() => {
		fetchTotal(total);
	  }, []);



if (!cesta){
	return null;
}
  return(
<div>
  <Header/>

	  <div className="cesta-container-show">

	  <Cesta nombre={cesta.nombre} id={cesta.id} total=""/>
	<h2 className="show-cesta-h">Productos</h2>
	  <div className="separador"></div>
	  { productoCesta && productoCesta.map((productoC) => (

			    <div key={productoC.producto.id} className="div-productos-cesta">
			    
			    <Link to={`/show/producto/${productoC.producto.id}`}> {productoC.producto.nombre}
			    </Link> x{productoC.cantidad}
			    <img src={productoC.url}/>


			    
			    </div>

	           ))}
	  <p className="cesta-total">Total: {total}€</p>
	    
	    <Formik
         initialValues={{id}}

         onSubmit={(values, { setSubmitting }) => {
           setTimeout(() => {
           	fetch(`/cestaACarrito`, {headers: {
        		'Content-Type' : 'application/json',
        		'Accept' : 'application/json',
        		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
           			method:'POST',
           			body:JSON.stringify(values, null, 2)
           	}).then((response)=> {
           		setSubmitting=false;

           	}).then(() =>
           	{history.push("/carro");}
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
           <form onSubmit={handleSubmit}>
           <div className="grid-form-cesta">
           
             <input
             id="id"
               type="hidden"
               name="id"
               onChange={handleChange}
               onBlur={handleBlur}
               value={id}
             	className="id-input-cesta"
             />

             <div className="grid2-carrito-cesta">
             <button type="submit" disabled={isSubmitting} className="submit-cesta-carrito">
             Añadir
             </button>
             </div>
             </div>
           </form>

         )}
       </Formik>

	           
	  </div>

  </div>
 );
}
export default ShowCesta;

import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import style from './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';

function ShowCesta() {
const [cesta, setCesta] = useState();
const [productoCesta, setProductoCesta] = useState();
const [total, setTotal] = useState(0.0);

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
	        console.log(productoCesta)

	      });
	  }, []);
	console.log(productoCesta)

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
	        console.log(total)

	      });
	  }, []);
	console.log(total)

	useEffect(() => {
		fetchTotal(total);
	  }, []);



if (!cesta){
	return (
<div>
  <Header/>

	  <div className="cesta-container-show">
	  <p>Ups! Parece que esta no es tu página</p>
	  </div>

  </div>
 );
}
  return(
<div>
  <Header/>

	  <div className="cesta-container-show">

	  <Cesta nombre={cesta.nombre} id={cesta.id} total=""/>

	  { productoCesta && productoCesta.map((productoC) => (

			    <div key={productoC.producto.id} className="div-productos-cesta">
			    <h2>Productos</h2>
			    <Link to={`/show/producto/${productoC.producto.id}`}> {productoC.producto.nombre}
			    </Link> x{productoC.cantidad}
			    <img src={productoC.url}/>


			    <p>Total: {total}€</p>
			    </div>

	           ))}


	  </div>

  </div>
 );
}
export default ShowCesta;

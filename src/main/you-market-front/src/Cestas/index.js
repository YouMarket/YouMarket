import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import style from './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';

function Cestas() {
let history = useHistory();
const [cestas, setCestas] = useState([]);

	if(localStorage.getItem('auth')==null){
		history.push('/login');
	}

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

  <div className="nueva-cesta">
  	<a href="/create/cesta">Nueva cesta</a>
  	{cestas.length > 0 ?
	  (<div className="cestas-container">
	  { cestas && cestas.map((cesta) => (

			    <div key={cesta.id} className="grid-cesta">
			    <Cesta nombre={cesta.nombre} id={cesta.id} />

	            </div>

	           ))}

	  </div>) : (<div><p>No hay cestas</p></div>)}

  </div>
 </div>
 );
}
export default Cestas;

//productos= { cesta.productos && cesta.productos.map((p) => (
//		<div key={p.id} className="productos">
//	    <a href="../producto/show">{p.nombre}</a>
//
//        </div>
//      {setTotal=total + p.precioIva}

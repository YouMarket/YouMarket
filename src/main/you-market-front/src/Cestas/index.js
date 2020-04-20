import React,  { useCallback, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import './styles.css';
import Cesta from '../Cesta';
import noCestas from './noCestas.png';
import Header from '../Header';

function Cestas() {
let history = useHistory();
const [cestas, setCestas] = useState([]);
const [cestasCheck, setCestasCheck]=useState();

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
	
	const cestasCheck2 = useCallback(() => {
		 return fetch('/usuario/cestasCheck' , {headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
				method:'GET'})
			      .then(res => res.json())
			      .then(cestasCheck1 => {
			    	  setCestasCheck(cestasCheck1);
			    	  localStorage.removeItem('cestasCheck');
			  	      localStorage.setItem('cestasCheck', cestasCheck1);
			        
			      });
	}, []);


	useEffect(() => {
	    fetchCestas(cestas);
	    cestasCheck2(cestasCheck);
	  }, []);
	
  return(
<div>
  <Header/>
  
  <div className="nueva-cesta">
  	<a className="link-button" href="/create/cesta">Nueva cesta</a>
  	{localStorage.getItem('cestasCheck') > 0 ?
	  (<div className="cestas-container">
	  { cestas && cestas.map((cesta) => (

			    <div key={cesta.id} className="grid-cesta">
			    <Cesta nombre={cesta.nombre} id={cesta.id} />

	            </div>

	           ))}

	  </div>) : (<div><img className="no-cestas-img" src={noCestas} alt="No-cestas"/><p>No hay cestas</p></div>)}

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

import React,  { useCallback, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import './styles.css';
import Cesta from '../Cesta';
import noCestas from './noCestas.png';
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
	     fetch('/usuario/cestasCheck' , {headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json',
			'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
			method:'GET'})
		      .then(res => res.json())
		      .then(cestasCheck1 => {
		    	  localStorage.removeItem('cestasCheck');
		  	      localStorage.setItem('cestasCheck', cestasCheck1);
		        
		      });
	  }, []);
	
  return(
<div>
  <Header/>
  
  <div className="container">
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
  </div>
 );
}
export default Cestas;

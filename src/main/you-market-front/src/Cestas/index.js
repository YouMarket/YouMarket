import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';

function Cestas() {
const [cestas, setCestas] = useState([]);

	const fetchCestas = useCallback(() => {
	    return fetch('cesta/user/1')
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
		  
  <div className="nueva-cesta">
  	<a href="/">Nueva cesta</a>
  
	  <div className="cestas-container">
	  	<div className="grid">
	  { cestas && cestas.map((cesta) => ( 
			  
			    <div key={cesta.id}>
			    <Cesta nombre={cesta.name} id={cesta.id} productos="prodcuto1" total="20"/>

	            </div>
	          
	           ))}
	  	</div>
	  </div>
	  		
  </div>
 );
}
export default Cestas;
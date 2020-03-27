import React,  { useFetch, useCallback, useState, useEffect } from 'react';

import style from './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';

function Cestas() {
const [cestas, setCestas] = useState([]);
const [total, setTotal] = useState(0);

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
<div>
  <Header/>
		  
  <div className="nueva-cesta">
  	<a href="/create/cesta">Nueva cesta</a>
  
	  <div className="cestas-container">
	  { cestas && cestas.map((cesta) => ( 
			  
			    <div key={cesta.id} className="grid-cesta">
			    <Cesta nombre={cesta.nombre} id={cesta.id} />

	            </div>
	          
	           ))}
	  
	  </div>
	  		
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
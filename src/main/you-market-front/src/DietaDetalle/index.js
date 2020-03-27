import React, { useCallback, useState, useEffect } from 'react';
import Header from '../Header';
import Dieta from '../Dieta';
import { useParams } from "react-router-dom";



function DietaDetalle() {

	const [ dieta, setDieta] = useState();
	
	const { id } = useParams();
	
	const fetchDieta = useCallback(() => {
	    return fetch(`../../../dieta/${id}`)
	      .then(res => res.json())
	      .then(dieta => {
	        setDieta(dieta)
	        console.log(dieta);
	      });
	  	}, []);
    console.log(dieta);
    useEffect(() => {
	    fetchDieta(dieta);
	  }, []);	
	
    if (!dieta){
    	return null;
    }	
	return(
	  <div>
	  	  <Header/>
	  	  <div>
	  			<h1> {dieta.nombre} </h1>
	  			<img className="dieta-imagen" src={dieta.url_imagen} alt={dieta.nombre}/>
			  	<div className="dieta-info">
			  		<p> <b> Tipo: </b>  {dieta.tipo} </p>
			  		<p> <b> Descripción: </b>  {dieta.descripcion} </p>
			  		<p> <b> Activa: </b>  {dieta.activa} </p>
			  	</div>
	  	  	</div>
	 </div>
	);

}

export default DietaDetalle
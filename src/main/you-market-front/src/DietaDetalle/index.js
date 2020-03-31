import React, { useCallback, useState, useEffect } from 'react';
import Header from '../Header';
import Dieta from '../Dieta';
import { useParams, Link } from "react-router-dom";
import './styles.css';


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
		  		<div>
	  				<b> Tipo: </b>{dieta.tipo}
	  			</div>
	  			<div>
  					<b> Descripción: </b>{dieta.descripcion}
  				</div>
  				<div>
  					<b> Activa: </b>{dieta.activa}
				</div>
			  	</div>
			  	<Link to={`../../../producto/dieta/list/${dieta.id}`}>
			  	Productos
			  	</Link>
	  	  	</div>
	 </div>
	);

}

export default DietaDetalle
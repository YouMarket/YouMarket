import React, { useCallback, useState, useEffect } from 'react';
import Header from '../Header';
import { useParams, NavLink } from "react-router-dom";
import './styles.css';


function RecetaDetalle() {

	const [ receta, setReceta] = useState();
	
	const { id } = useParams();
	
	const fetchReceta = useCallback(() => {
	    return fetch(`https://youmarket-entrega4.herokuapp.com/receta/${id}`)
	      .then(res => res.json())
	      .then(receta => {
	        setReceta(receta)
	      });
	  	}, []);
    useEffect(() => {
	    fetchReceta(receta);
	  }, []);	
	
    if (!receta){
    	return null;
    }	
	return(
	  <div>
	  	  <Header/>
	  	  <div className="receta-detalle-container container clearfix">
	  			<img className="receta-detalle-imagen" src={receta.url_imagen} alt={receta.nombre}/>
				<div className="receta-detalle-info">
					<h2 className="receta-detalle-nombre"> {receta.nombre} </h2>
                    <div className="receta-detalle-field receta-personas">
                        {receta.personas} personas
					</div>
                    <div className="receta-detalle-field receta-tiempo">
                        {receta.tiempo} minutos
					</div>
                    <div className="receta-detalle-field receta-calorias">
                        {receta.calorias} kcal
					</div>
					<div className="receta-detalle-field">
                        {receta.descripcion}
					</div>
				</div>
	  	  	</div>
	 </div>
	);

}

export default RecetaDetalle
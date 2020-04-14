import React from 'react';
import './styles.css';

interface Props {
	id: number;
	imagen: string,
	nombre: string,
	personas: number,
	tiempo: string,
	calorias: number,
}

function Receta({id, imagen, nombre, personas, tiempo, calorias}: Props) {
  return(
	<div>	  
	  	<div className="receta-container">
		  	<img className="receta-imagen" src={imagen} alt={imagen}/>
		  	<div className="receta-content">
		  		<h1 className="receta-title">{nombre}</h1>
		  		<div className="receta-info-wrapper">
			  		<p className="receta-info">{personas} Personas</p>
			  		<p className="receta-info">{tiempo}</p>
			  		<p className="receta-info">{calorias}</p>
		  		</div>
		  	</div>
	  	</div>
	  </div>
 );
}
export default Receta;
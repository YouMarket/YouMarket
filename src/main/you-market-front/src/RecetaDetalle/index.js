import React from 'react';
import './styles.css';
import Header from '../Header';

interface Props {
	id: number;
	imagen: string,
	nombre: string,
	personas: number,
	tiempo: string,
	calorias: number
}

function RecetaDetalle({id, imagen, nombre, personas, tiempo, calorias}: Props) {
  return(
		  <div>
		  	<Header/>
		  		<h1> Hummus </h1>
		  		<img className="receta-imagen" src="https://cutt.ly/leche" alt="hummus"/>
				  	<div className="receta-info">
				  		<p> <b> Personas: </b>  2 </p>
				  		<p> <b> Tiempo(minutos): </b>  15 </p>
				  		<p> <b> Kcal: </b>  550 </p>
				  	</div>
		  </div>
 );
}

export default RecetaDetalle;
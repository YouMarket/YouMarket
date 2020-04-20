import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

interface Props {
	id: number;
	url_imagen: string,
	nombre: string,
	personas: number,
	tiempo: string,
	calorias: number,
}

function Receta({id, url_imagen, nombre, personas, tiempo, calorias}: Props) {
  return(
	<Link to={`../${id}`} className="receta-container">
		<img className="receta-imagen" src={url_imagen} alt="Imagen de receta"/>
		<div className="receta-content">
			<h1 className="receta-title">{nombre}</h1>
			<div className="receta-info-wrapper">
				<p className="receta-info">{personas} Personas</p>
				<p className="receta-info">{tiempo}</p>
				<p className="receta-info">{calorias}</p>
			</div>
		</div>
	</Link>
 );
}
export default Receta;
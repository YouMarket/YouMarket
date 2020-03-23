import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

interface Props {
	nombre: string,
	url_imagen: string,
	id: int,
	tipo: string,
	descripcion: string,
	
}

function Dieta({nombre, url_imagen, descripcion, id, tipo}: Props) {
  return(
  <Link to="/recetas" className="dieta-container">
  	<img className="dieta-imagen" src={url_imagen} alt={nombre}/>
  	<div classname="dieta-info">
  		<p classname="dieta-nombre"> {nombre} </p>
  	</div>
  </Link>

 );
}
export default Dieta;
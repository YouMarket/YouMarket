import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

function Dieta({id, nombre, url_imagen, descripcion, tipo, activa}: Props) {
	interface Props {
		nombre: string,
		url_imagen: string,
		id: number,
		tipo: string,
		descripcion: string,
		activa: Boolean
	}
	
	
	  return(
	  <Link to={`../../../show/dieta/${id}`} className="dieta-container">
	  	<img className="dieta-imagen" src={url_imagen} alt={nombre}/>
	  	<div className="dieta-info">
	  		<p className="dieta-nombre"> {nombre} </p>
	  	</div>
	  </Link>
	
	 );
}
export default Dieta;
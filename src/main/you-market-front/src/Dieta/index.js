import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

interface Props {
	nombre: string,
	imagen: string,
}

function Dieta({nombre, imagen}: Props) {
  return(
  <Link to="/recetas" className="dieta-container">
  	<img className="dieta-imagen" src={imagen} alt={nombre}/>
  	<p className="dieta-nombre">{nombre}</p>
  </Link>
 );
}
export default Dieta;
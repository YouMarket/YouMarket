import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

interface Props {
	tipo: string,
	imagen: string,
}

function Dieta({tipo, imagen}: Props) {
  return(
  <Link to="/recetas" className="dieta-container">
  	<img className="dieta-imagen" src={imagen} alt={tipo}/>
  	<p className="dieta-tipo">{tipo}</p>
  </Link>
 );
}
export default Dieta;
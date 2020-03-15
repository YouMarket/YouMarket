import React from 'react';
import './styles.css';

interface Props {
	tipo: string,
	imagen: string,
}

function Dieta({tipo, imagen}: Props) {
  return(
  <div className="dieta-container">
  	<img className="dieta-imagen" src={imagen} alt={tipo}/>
  	<p className="dieta-tipo">{tipo}</p>
  </div>
 );
}
export default Dieta;
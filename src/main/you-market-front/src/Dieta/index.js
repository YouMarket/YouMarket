import React from 'react';
import './styles.css';

interface Props {
	tipo: string,
}

function Dieta({tipo}: Props) {
  return(
  <div className="dieta-container">
  	<img className="dieta-imagen" src="https://i.blogs.es/120994/brocoli/450_1000.jpg"/>
  	<p className="dieta-tipo">{tipo}</p>
  </div>
 );
}
export default Dieta;
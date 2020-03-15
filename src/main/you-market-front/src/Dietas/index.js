import React from 'react';
import './styles.css';
import Dieta from '../Dieta';

function Dietas() {
  return(
  <div className="productos-container">
  	<div className="grid">
	  	<Dieta tipo="Vegetariana"/>
	  	<Dieta tipo="Mediterránea"/>
	  	<Dieta tipo="Hiperproteica"/>
  	</div>
  </div>
 );
}
export default Dietas;
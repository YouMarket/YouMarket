import React from 'react';
import './styles.css';
import Header from '../../Header';
import Navegacion from '../Navegacion';

function DatosSubscripcion() {
  return(
	<div>
		<Header/>
		<Navegacion/>
		<div className="seccion-perfil">
			<h1>Datos de Subscripción</h1>
			<div className="datos-subscripcion">
				<p>Tipo de subscripción: Premium</p>
				<p>Precio: 17 €/mes</p>
				<p>Número de envíos: 4 envíos al mes</p>
				<p>Subscripción a las dietas: Sí</p>
			</div>
			<p className="info-cambio-subscripcion">
			Puedes cambiar la subscripción en cualquier momento,
			sin embargo no se te aplicará hasta el siguiente mes de compra.
			</p>
			<button className="boton-perfil">Cambiar subscripción</button>
			
		</div>
	</div>
 );
}

export default DatosSubscripcion;
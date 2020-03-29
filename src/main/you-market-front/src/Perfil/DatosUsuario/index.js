import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Navegacion from '../Navegacion';

function DatosUsuario() {
  return(
	<div>
		<Header/>
		<Navegacion/>
		<div className="seccion-perfil">
			<h1>Información Personal</h1>
			<div className="informacion-personal">
				<p>Nombre: Maria del Carmen</p>
				<p>Apellidos: De La Rosa Dominguez</p>
				<p>DNI: 89877898I </p>
				<p>Fecha de nacimiento: 02/06/1980 </p>
			</div>
			<h1>Información de Usuario</h1>
			<div className="informacion-usuario">
				<p>Email: maria@gmail.com</p>
				<p>Contraseña: **********</p>
				<p>Teléfono: 643234565 </p>
			</div>
			<button className="boton-perfil">Cambiar datos</button>
		</div>
	</div>
 );
}
export default DatosUsuario;
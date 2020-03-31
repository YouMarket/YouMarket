import React, { useCallback, useState, useEffect } from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import {Card} from 'primereact/card';

function DatosUsuario() {

	const [usuario, setUsuario] = useState([]);
	const [direccion, setDireccion] = useState([]);
		
	const fetchUsuario = useCallback(() => {
		return fetch('usuario/getUser' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
			.then(res => res.json())
			.then(usuario => {
				setUsuario(usuario)
			});
		}, []);		

	const fetchDireccion = useCallback(() => {
		return fetch('direccion/principal' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
			.then(res => res.json())
			.then(direccion => {
				setDireccion(direccion)
			});
		}, []);		
		
		useEffect(() => {
			fetchUsuario(usuario);
			fetchDireccion(direccion);
			}, []);

  return(
	<div>
		<Header/>
		<Navegacion/>
		<div className="card-container">
			
			<Card title="Información Personal" style={{margin: 20}} >
				<div >
					<p>Nombre: {usuario.nombre}</p>
					<p>Apellidos: {usuario.apellidos}</p>
					<p>DNI: {usuario.dni} </p>
					<p>Fecha de nacimiento: {usuario.fechaNacimiento} </p>
					<p>Zona de reparto: {usuario.cpostal}</p>
				</div>
			</Card>
			<Card title="Información de Usuario" style={{margin: 20}} >
				<div>
					
					<p>Email: {usuario.email}</p>
					<p>Dirección completa: {direccion.direccion}</p>
					<p>Población: {direccion.poblacion}</p>
					<p>Provincia: {direccion.provincia}</p>
					<p>Código postal: {direccion.cpostal}</p>
				</div>
			</Card>
			
			{/* <button className="boton-perfil">Cambiar datos</button>*/}
		</div>
	</div>
 );
}
export default DatosUsuario;
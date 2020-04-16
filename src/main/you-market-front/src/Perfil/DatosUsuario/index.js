import React, { useCallback, useState, useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import { useHistory } from "react-router-dom";

import {Card} from 'primereact/card';

function DatosUsuario() {
	let history = useHistory();


	const [usuario, setUsuario] = useState([]);
	const [direccion, setDireccion] = useState([]);
	const [suscripcion, setSuscripcion] = useState([]);
		
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
	
	const fetchSuscripcion = useCallback(() => {
		return fetch('usuario/getSuscripcion' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
			.then(res => res.json())
			.then(suscripcion => {
				setSuscripcion(suscripcion)
			});
		}, []);
	
	function deleteUser(id) {
		alert("¿Está a punto de eliminar su cuenta, ¿desea continuar?");
		fetch('/eliminarUsuario', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': "application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('auth')
			},
			method:'POST',
			body:JSON.stringify({usuarioId: id})
		})
		
	}

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
			fetchSuscripcion(suscripcion);
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
					<p>Suscripción: {suscripcion.nombre} </p>
					<p>Precio: {suscripcion.precio} €</p>
				</div>
				<p>Pagar subscripción</p>
				
				<PayPalButton
				 amount={suscripcion.precio}
	         	 currency="EUR"
	         onSuccess={(values, { setSubmitting }) => {
	             setTimeout(() => {
	             	fetch('/factura/create', {
	             			headers: {
	             				"Content-Type": "application/json"
	             			},
	             			method:'POST',
	             			body:JSON.stringify(values, null, 2)
	             	}).then(function(response) {
	             	    return console.log(response.json());
	             	}).then(() => 
	             	 {
	             		history.push('/');

	             	 })
	             
	               
	               setSubmitting(false);
	             }, 400);
			   }}
			   
			   options={{
				clientId: "AQ1wSRRux5eVDHDZia2gH5NfFd_dO2-mooYqs-CdF3E53DIHclXqJlDI_2I2vtfIeQi5qVQTciRnOS9Y",
				currency: "EUR"
			  }}
	       />
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
			
			{ <button className="boton-perfil" onClick={() => deleteUser(id)}
			alert("¿Está a punto de eliminar su cuenta, ¿desea continuar?")>Eliminar cuenta</button> }
			
			{/* <button className="boton-perfil">Cambiar datos</button>*/}
		</div>
	</div>
 );
}
export default DatosUsuario;
import React, { useCallback, useState, useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

import './styles.css';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import { useHistory } from "react-router-dom";

import {Card} from 'primereact/card';

function DatosUsuario() {
	let history = useHistory();

	
	const [usuario, setUsuario] = useState([]);
	const urlPDF = "http://localhost:8081/usuario/exportPDF/"+usuario.id;
	const [direccion, setDireccion] = useState([]);
	const [suscripcion, setSuscripcion] = useState([]);
	const [pagada, setPagada] = useState([]);
	const [meses, setMeses] = useState([]);
		
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
	
	function deleteUser() {
		fetch('/usuario/eliminarUsuario', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
			method:'POST'
		});
		var url= "/logout"; 
    	window.location = url; 
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
	
	const fetchPagoSus = useCallback(() => {
		return fetch('suscripcion/pagada' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
			.then(res => res.json())
			.then(response => {
				setPagada(response.success)
				setMeses(response.message)
			});
		}, []);			

		useEffect(() => {
			fetchUsuario(usuario);
			fetchDireccion(direccion);
			fetchSuscripcion(suscripcion);
			fetchPagoSus();
			}, []);
	

  return(
	<div>
		<Header/>
		<Navegacion/>
		<div className="container">
			
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

				{!pagada && <div>
					<p>Pagar subscripción</p>
					<PayPalButton
						amount={suscripcion.precio}
						currency="EUR"
						onSuccess={() => {
						setTimeout(() => {
							fetch('/factura/createSuscripcion', {
								headers: {
									'Content-Type' : 'application/json',
									'Accept' : 'application/json',
									'Authorization' : 'Bearer ' + localStorage.getItem('auth')
								},
								method:'POST'})
							.then(function(response) {})
							.then(() => {history.push('/datos-perfil')})
						
						
						}, 400);
					}}
					
					options={{
						clientId: "AQ1wSRRux5eVDHDZia2gH5NfFd_dO2-mooYqs-CdF3E53DIHclXqJlDI_2I2vtfIeQi5qVQTciRnOS9Y",
						currency: "EUR"
					}}
				/>

				</div>
			}
			</Card>

			{meses !== 1 && 
				<a href="/cambio-suscripcion" className="modificar-suscripcion">
					<button className="button-finish">Modificar Suscripción</button>
				</a>
			}

			{
				meses === 1 && 
				<div>
					<p>Ya ha realizado una modificación en su suscripción para el mes siguiente. Hasta entonces, no podrá volver a modificarla.</p>
				</div>
			}
			
			<Card title="Información de Usuario" style={{margin: 20}} >
				<div>
					
					<p>Email: {usuario.email}</p>
					<p>Dirección completa: {direccion.direccion}</p>
					<p>Población: {direccion.poblacion}</p>
					<p>Provincia: {direccion.provincia}</p>
					<p>Código postal: {direccion.cpostal}</p>
				</div>
			</Card>
			
			{ <button className="boton-perfil" onClick={() => {if (window.confirm('¿Seguro que desea eliminar su cuenta?')) deleteUser()}}>Eliminar cuenta</button> }

			
			<a href={urlPDF} target="_blank">
				<button className="button-finish">Exportar información del usuario en PDF</button>
			</a>
			{/* <button className="boton-perfil">Cambiar datos</button>*/}
		</div>
	</div>
 );
}
export default DatosUsuario;
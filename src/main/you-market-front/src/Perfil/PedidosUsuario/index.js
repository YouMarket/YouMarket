import React, { useCallback, useState, useEffect } from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import {Card} from 'primereact/card';

function PedidosUsuario() {
	
	const [usuario, setUsuario] = useState([]);
	const [pedidos, setPedidos] = useState([]);
	
	
	const fetchUsuario = useCallback(() => {
		return fetch('https://youmarket-entrega2.herokuapp.com/usuario/getUser' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
			.then(res => res.json())
			.then(usuario => {
				setUsuario(usuario)
			});
		}, []);	

	const fetchPedidos = useCallback(() => {
		return fetch('https://youmarket-entrega2.herokuapp.com/pedido/getAll' , {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json'},
		method:'GET'})
			.then(res => res.json())
			.then(pedidos => {
				setPedidos(pedidos)
			});
		}, []);		
	
	useEffect(() => {
		fetchUsuario(usuario);
		fetchPedidos(pedidos);
		}, []);


  return(
	<div>
		<Header/>
		<Navegacion/>
		<div className="card-container">
			<h1>Todos los pedidos</h1>
			<div className="list-pedidos">
				{pedidos.length >0 && pedidos.map((pedido) => 
					<div key={pedido.id} >
						<Card title="Pedido" style={{margin: 20}}>
							<p>Fecha de pedido: {pedido.fechaHoraPedido}</p> 
							<p>Dirección del pedido: {pedido.direccion}</p> 
							<p>Hora mínima de entrega: {pedido.horaEnvioIni}:00</p> 
							<p>Hora máxima de entrega: {pedido.horaEnvioFin}:00</p> 
						</Card>
					</div>)}
					{pedidos.length == 0 &&  (<div>
						<p>No ha realizado ningún pedido aún.</p>
						</div>)}
			</div>
		
		</div>
	</div>
 );
}
export default PedidosUsuario;
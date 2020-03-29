import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Navegacion from '../Navegacion';

function PedidosUsuario() {
  return(
	<div>
		<Header/>
		<Navegacion/>
		<div className="seccion-perfil">
		<h1>Siguiente Pedido</h1>
		<div className="list-pedidos">
			<p>Aquí va el componente pedido</p>
		</div>
		<h1>Próximos Pedidos</h1>
		<div className="list-pedidos">
			<p>Aquí va el componente pedido</p>
		</div>
		<h1>Historial de Pedidos</h1>
		<div className="list-pedidos">
			<p>Aquí va el componente pedido</p>
		</div>
		</div>
	</div>
 );
}
export default PedidosUsuario;
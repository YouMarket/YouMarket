
import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

function Navegacion() {
	
  return(
	<div className="perfil-links" >
		<Link to="/datos-perfil" className="perfil-link">DATOS DEL PERFIL</Link>
	   	<Link to="/pedidos-usuario" className="perfil-link">MIS PEDIDOS</Link>
		<Link to="/facturas-usuario" className="perfil-link">MIS FACTURAS</Link>
	</div>
 );
}
export default Navegacion;
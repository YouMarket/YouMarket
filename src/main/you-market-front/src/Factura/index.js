import React from 'react';
import './styles.css';
import { NavLink } from "react-router-dom";

interface Props {
	id : Number,
    total : Number,
    totalIva : Number,
    fechaFactura : String,
    pedido : Number
}

function Factura({id, total, totalIva, fechaFactura, pedido}: Props) {
  
  const url = "http://localhost:8081/factura/generateFactura/" + id.toString();

  return(
		<div className="factura-container">
			<p className="factura-field factura-id"><b>ID: </b>{id}</p>
            <p className="factura-field factura-precio"><b>Precio: </b>{total}</p>
            <p className="factura-field factura-precioIva"><b>Precio con IVA: </b>{totalIva}</p>
            <p className="factura-field factura-fecha"><b>Fecha: </b>{fechaFactura}</p>
            <p className="factura-field factura-pedido"><b>ID Pedido: </b>{pedido}</p>
            <NavLink className="link-button" to={url}>Descargar factura</NavLink>
  		</div>
 );
}

export default Factura;

import React from 'react';
import './styles.css';

interface Props {
	id : Number,
    total : Number,
    totalIva : Number,
    fechaFactura : String,
    pedido : Number
}

function Factura({id, total, totalIva, fechaFactura, pedido}: Props) {
  
  const url = "https://youmarket-entrega4.herokuapp.com/factura/generateFactura/" + id
  const dateFormatted = new Date(fechaFactura).toLocaleDateString()

  return(
		<div className="factura-container">
			<p className="factura-field factura-id"><b>ID: </b>{id}</p>
            <p className="factura-field factura-precio"><b>Precio: </b>{total} €</p>
            <p className="factura-field factura-precioIva"><b>Precio con IVA: </b>{totalIva} €</p>
            <p className="factura-field factura-fecha"><b>Fecha: </b>{dateFormatted}</p>
            {pedido != null ? <p className="factura-field factura-pedido"><b>ID Pedido: </b>{pedido}</p> : <p></p>}
            <a className="link-button" href={url} target="_blank">Descargar factura</a>
  		</div>
 );
}

export default Factura;

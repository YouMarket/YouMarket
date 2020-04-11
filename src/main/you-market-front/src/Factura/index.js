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
	
  return(
		<div className="factura-container">
			<p className="factura-field factura-id">ID: {id}</p>
            <p className="factura-field factura-precio">{total}</p>
            <p className="factura-field factura-precioIva">{totalIva}</p>
            <p className="factura-field factura-fecha">{fechaFactura}</p>
            <p className="factura-field factura-pedido">ID Pedido: {pedido}</p>
  		</div>
 );
}

export default Factura;

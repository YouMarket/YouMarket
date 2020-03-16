import React from 'react';
import './styles.css';

interface Props {
	id: number;
	imagen: string,
	nombre: string,
	supermercado: string,
	precio: number,
    unidad: string,
    cantidad: number
}

function ProductoListado({id, imagen, nombre, supermercado, precio, unidad, cantidad}: Props) {
  return(
  <div className="producto-list-container clearfix">
  	<img className="producto-list-imagen" src={imagen} alt={imagen}/>
  	<div className="producto-list-info">
  		<p className="producto-list-nombre">{nombre}</p>
  		<p className="producto-list-precio">{precio} {unidad}</p>
  		<p className="producto-list-supermercado">{supermercado}</p>
          <p className="producto-list-cantidad">Cantidad: {cantidad}</p>
  	</div>
  </div>
 );
}

export default ProductoListado;
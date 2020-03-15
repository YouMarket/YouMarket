import React from 'react';
import './styles.css';

interface Props {
	id: number;
	imagen: string,
	nombre: string,
	supermercado: string,
	precio: number,
	unidad: string
}

function Producto({id, imagen, nombre, supermercado, precio, unidad}: Props) {
  return(
  <div className="producto-container">
  	<img className="producto-imagen" src={imagen} alt={imagen}/>
  	<div className="producto-info">
  		<p className="producto-precio">{precio} {unidad}</p>
  		<p className="producto-nombre">{nombre}</p>
  		<p className="producto-supermercado">{supermercado}</p>
  	</div>
  </div>
 );
}
export default Producto;
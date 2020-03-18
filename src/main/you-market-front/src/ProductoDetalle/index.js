import React from 'react';
import './styles.css';
import Header from '../Header';

interface Props {
	id: number;
	imagen: string,
	nombre: string,
	supermercado: string,
	precio: number,
	unidad: string
}

function ProductoDetalle({id, imagen, nombre, supermercado, precio, unidad}: Props) {
  return(
		  <div>
		  	<Header/>
		  		<h1> Patata </h1>
		  		<img className="producto-imagen" src="https://cutt.ly/leche" alt="patata"/>
				  	<div className="producto-info">
				  		<p> <b> Producto: </b>  Patata </p>
				  		<p> <b> Precio: </b>  0,8 €/kilo</p>
				  		<p> <b> Supermercado: </b>  Mercadona </p>
				  	</div>
		  </div>
 );
}

export default ProductoDetalle;
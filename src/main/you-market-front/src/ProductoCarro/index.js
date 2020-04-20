import React from 'react';
import './styles.css';
import removeButton from '../assets/delete.svg';

interface Props {
	id: number;
	urlImagen: string,
	nombre: string,
	supermercado: string,
	precioIva: number,
    unidad: string,
    cantidad: number
}

function eliminarProducto(id) {
	fetch('/eliminarProducto', {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		method:'POST',
		body:JSON.stringify({postId: id})
	})
	localStorage.removeItem('carrolleno');
	window.location.reload(false)
}

function ProductoListado({id, urlImagen, nombre, supermercado, precioIva, unidad, cantidad}: Props) {

	var productoId = "producto-"+id
	return(
	<div id={productoId} className="producto-list-container clearfix">
		<img className="producto-list-imagen" src={urlImagen} alt={urlImagen}/>
		<div className="producto-list-info clearfix">
			<p className="producto-list-nombre">{nombre}</p>
			<p className="producto-list-precio">{precioIva} {unidad}</p>
			<p className="producto-list-supermercado">{supermercado}</p>
			<p className="producto-list-cantidad"><b>Unidades:</b> {cantidad}</p>
			<img className="borrar-producto" src={removeButton} onClick={() => eliminarProducto(id)} alt="Eliminar producto"/>
		</div>
	</div>
 );
}

export default ProductoListado;

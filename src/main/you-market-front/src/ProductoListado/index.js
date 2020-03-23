import React from 'react';
import './styles.css';
import removeButton from '../assets/delete.svg';
import plus from '../assets/plus.svg'
import less from '../assets/less.svg'

interface Props {
	id: number;
	urlImagen: string,
	nombre: string,
	supermercado: string,
	precio: number,
    unidad: string,
    cantidad: number
}

function ProductoListado({id, urlImagen, nombre, supermercado, precio, unidad, cantidad}: Props) {
  return(
  <div className="producto-list-container clearfix">
  	<img className="producto-list-imagen" src={urlImagen} alt={urlImagen}/>
  	<div className="producto-list-info clearfix">
  		<p className="producto-list-nombre">{nombre}</p>
  		<p className="producto-list-precio">{precio} {unidad}</p>
  		<p className="producto-list-supermercado">{supermercado}</p>
		<img className="borrar-producto" src={removeButton} />
		<div className="editar-cantidad">
			<img className="menos" src={less}/>
			<p className="contador">{cantidad}</p>
			<img className="mas" src={plus}/>
		</div>
  	</div>
  </div>
 );
}

export default ProductoListado;
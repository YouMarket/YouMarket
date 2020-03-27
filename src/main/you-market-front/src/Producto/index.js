import React, {useState} from 'react';
import './styles.css';
import plus from '../assets/plus.svg'
import less from '../assets/less.svg'

interface Props {
	id: number,
	urlImagen: string,
	nombre: string,
	supermercado: string,
	precio: number,
	unidad: string,
}

function Producto({id, urlImagen, nombre, supermercado, precio, unidad}: Props) {
	
	const [cantidad, setCantidad] = useState(0);
	
	var idContador = "contador-"+id
	var idMenos = "menos-"+id

	function lessProduct(){
		if(cantidad > 0){
			setCantidad(cantidad - 1)
			document.getElementById(idContador).textContent = cantidad
		}
	}
	
	function plusProduct() {
		setCantidad(cantidad + 1)
		document.getElementById(idContador).textContent = cantidad
	}

  return(
  <div className="producto-container">
  	<img className="producto-imagen" src={urlImagen} alt="Imagen"/>
  	<div className="producto-info">
  		<p className="producto-precio">{precio} {unidad}</p>
  		<p className="producto-nombre">{nombre}</p>
  		<p className="producto-supermercado">{supermercado}</p>
  	</div>
  	<div className="producto-editar-cantidad">
  		<img id={idMenos} className="menos" src={less} onClick={lessProduct}/>
  		<p id={idContador} className="contador">{cantidad}</p>
  		<img className="mas" src={plus} onClick={plusProduct}/>
	</div>
  </div>
 );
}

export default Producto;
import React, { useState, useCallback, useEffect } from 'react';
import './styles.css';
import Header from '../Header';
import ProductoListado from '../ProductoListado'

var precioFinal = 0.0
function updatePrecioFinal(cantidad: Number, precio: Number){
	precioFinal += precio*cantidad
	return precioFinal
}

function Carro() {
const[carrito, setCarrito] = useState([]);
	const fetchCarrito = useCallback(() => {
		return fetch('carrito')
			.then(res => res.json())
			.then(carrito => {
				setCarrito(carrito)
				console.log(carrito);
			});
	}, []);
	console.log(carrito);

	useEffect(() => {
		fetchCarrito(carrito);
	},[]);
	
  return(
	<div>
		<Header/>

		<div className="container clearfix">
		<p className="introduction">Este es tu carrito de la compra</p>

			<div className="products-container-list">
				{carrito.map((cestaproducto) => (
					<ProductoListado 
						id={cestaproducto.producto.id} 
						nombre ={cestaproducto.producto.nombre} 
						supermercado={cestaproducto.producto.supermercado.nombre} 
						precioIva ={cestaproducto.producto.precioIva}
						urlImagen={cestaproducto.producto.urlImagen} 
						unidad = {cestaproducto.producto.unidad} 
						cantidad = {cestaproducto.cantidad}>
							{updatePrecioFinal(cestaproducto.cantidad, cestaproducto.producto.precioIva)}
					</ProductoListado>
				))}
				
				<div className="price"><b>Precio final: </b>{precioFinal} €</div>
				<div className="buttons">
					<button className="save-cesta">Guardar como cesta</button>
					<button className="button-finish">Terminar pedido</button>
				</div>
			</div>
		</div>
	</div>
 );
}

export default Carro;

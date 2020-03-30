import React, { useState, useCallback, useEffect } from 'react';
import './styles.css';
import Header from '../Header';
import ProductoListado from '../ProductoListado';

const precioFinal = 0.00
function updatePrecioFinal(cantidad, precio){
	precioFinal += precio*cantidad
	return precioFinal
}

function Carro() {
precioFinal = 0.00
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
				
				<div className="price"><b>Precio final: </b>{Math.round(precioFinal * 100) / 100} €</div>
				<div className="buttons">
					{/* <button className="save-cesta">Guardar como cesta</button> */}
					<a href="/pedido/create">
					<button className="button-finish">Terminar pedido</button>
					</a>
				</div>
			</div>
		</div>
	</div>
 );
}

export default Carro;

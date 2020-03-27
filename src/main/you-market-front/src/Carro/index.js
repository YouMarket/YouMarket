import React from 'react';
import './styles.css';
import Header from '../Header';
import ProductoListado from '../ProductoListado'

function Carro() {
  return(  
	<div>
		<Header/>

		<div className="container clearfix">
		<p className="introduction">Este es tu carrito de la compra</p>

			<div className="products-container-list">
				<ProductoListado id="1" nombre="leche" supermercado="Mercadona" precio="1,3" imagen="https://cutt.ly/leche" unidad="€/litro" cantidad="1"/>
				<ProductoListado id="1" nombre="leche" supermercado="Mercadona" precio="1,3" imagen="https://cutt.ly/leche" unidad="€/litro" cantidad="1"/>
				<ProductoListado id="1" nombre="leche" supermercado="Mercadona" precio="1,3" imagen="https://cutt.ly/leche" unidad="€/litro" cantidad="1"/>

				<div className="price"><b>Precio final:</b> 15€</div>
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

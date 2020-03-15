import React from 'react';
import './styles.css';
import Producto from '../Producto';
import Header from '../Header';

function Productos() {
  return(
	<div>	  
	  <Header/>
	  <div className="productos-container">
	  	<div className="grid">
	  		<Producto id="1" nombre="patata" supermercado="Mercadona" precio="1,3" imagen="https://cutt.ly/leche" unidad="€/litro"/>
	  		<Producto id="2" nombre="pera" supermercado="Mercadona" precio="0,8" imagen="https://cutt.ly/pera" unidad="€/kilo"/>
	  		<Producto id="1" nombre="patata" supermercado="Mercadona" precio="1,3" imagen="https://cutt.ly/leche" unidad="€/litro"/>
	  		<Producto id="2" nombre="pera" supermercado="Mercadona" precio="0,8" imagen="https://cutt.ly/pera" unidad="€/kilo"/>
	  		<Producto id="1" nombre="patata" supermercado="Mercadona" precio="1,3" imagen="https://cutt.ly/leche" unidad="€/litro"/>
	  		<Producto id="2" nombre="pera" supermercado="Mercadona" precio="0,8" imagen="https://cutt.ly/pera" unidad="€/kilo"/>
	  	</div>
	  </div>
	</div>
 );
}
export default Productos;
import React from 'react';
import style from './styles.css';
import Producto from '../Producto';

function Productos() {
  return(
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
 );
}
export default Productos;
import React from 'react';
import style from './styles.css';
import logo from '../logo.png';
import cart from './shopping-cart-solid.svg';

function Header() {
  return(
  <div className="container">
   <img className="logo" src={logo} alt="Logo"/>
   <div className="links">
   	<a className="link" href="../App.js">Productos</a>
   	<a className="link" href="">Dietas</a>
   	<a className="link" href="/cestas">Cestas</a>
   	<a className="link" href="">Carro</a>
   </div>
  </div>	
 );
}

export default Header;
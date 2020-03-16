import React from 'react';
import style from './styles.css';
import logo from '../logo.png';
import cart from './shopping-cart-solid.svg';

function Header() {
  return(
  <div className="header-container">
   <img className="logo" src={logo} alt="Logo"/>
   <div className="header-links">
   	<a className="header-link" href="../App.js">Productos</a>
   	<a className="header-link" href="">Dietas</a>
   	<a className="header-link" href="">Cestas</a>
   	<a className="header-link" href="">Carro</a>
   </div>
  </div>	
 );
}

export default Header;
import React from 'react';
import style from './styles.css';
import logo from '../logo.png';
import carro from './shopping-cart-solid.svg';
import menu from './bars-solid.svg';


window.onresize = hideMenuLinks;

function hideMenuLinks() {
	var width = window.innerWidth;
	var x = document.getElementById("menuLinks");
	if(width > 580){
		x.style.display = "none";
	}
}

function menuInteraction() {
	  var x = document.getElementById("menuLinks");
	  if (x.style.display === "flex") {
		    x.style.display = "none";
	  } else {
		    x.style.display = "flex";
	  }
 
};



function Header() {
  return(
	<div>
	  <div className="header-container">
	  	<img className="logo" src={logo} alt="Logo"/>
	  	<div className="header-links">
		   	<a className="header-link" href="../App.js">Productos</a>
		   	<a className="header-link" href="">Dietas</a>
		   	<a className="header-link" href="">Cestas</a>
	   	</div>
		<a className="carro" href="">
		  	<img src={carro} className="carro-icon" alt="Carro"/>
		</a>
		<a href="javascript:void(0);" className="hamburger-menu" onClick={menuInteraction}>
	   		<img src={menu} className="hamburger-icon" alt="Menu"/>
	    </a>
	  </div>
	  <div id="menuLinks">
		  <a href="" className="menuLink">Productos</a>
		  <a href="" className="menuLink">Dietas</a>
		  <a href="" className="menuLink">Cestas</a>
	  </div>
	</div>
 );
}

export default Header;
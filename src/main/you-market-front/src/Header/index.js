import React from 'react';
import './styles.css';
import logo from '../logo.png';
import carro from './shopping-cart-solid.svg';
import menu from './bars-solid.svg';
import {Link} from 'react-router-dom';


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
	  return false;
};

function closeMenu() {
	var x = document.getElementById("menuLinks");
	x.style.display = "none";
}



function Header() {
  return(
	<div>
	  <div className="header-container">
	  	<img className="logo" src={logo} alt="Logo"/>
	  	<div className="header-links">
		   	<Link to="/" className="header-link" >Productos</Link>
		   	<Link className="header-link" to="/dietas">Dietas</Link>
		   	<Link className="header-link" to="/products">Cestas</Link>
	   	</div>
		<Link className="carro" to="/carro">
		  	<img src={carro} className="carro-icon" alt="Carro"/>
		</Link>
		<a href="#" className="hamburger-menu" onClick={menuInteraction}>
	   		<img src={menu} className="hamburger-icon" alt="Menu"/>
	    </a>
	  </div>
	  <div id="menuLinks">
	  	<Link to="/" className="menuLink" onClick={closeMenu}>Productos</Link>
	   	<Link className="menuLink" to="/products" onClick={closeMenu}>Dietas</Link>
	   	<Link className="menuLink" to="/products" onClick={closeMenu}>Cestas</Link>
	  </div>
	</div>
 );
}

export default Header;
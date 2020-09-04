import React, { useState,useCallback, useEffect } from 'react';
import './styles.css';
import logo from '../logo.png';
import carro from './shopping-cart.svg';
import menu from './menu.svg';
import {Link, NavLink} from 'react-router-dom';
import user from './user.svg';

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
	const [login, setLogin]=useState('');
	const [loginEsp, setLoginEsp]=useState('');

	const loginCheck = useCallback(() => {
		if(localStorage.getItem('auth')!=null){
			setLogin('/logout');
			setLoginEsp('Salir');
		}else{
			setLogin('/login');
			setLoginEsp('Iniciar Sesión');
	      }
		return login;
	  }, []);

	  useEffect(() => {
		    loginCheck();
		  }, [loginCheck]);


	return(
		<div>
		<div className="header-container">
			<NavLink to="/">
				<img className="logo" src={logo} alt="Logo"/>
			</NavLink>
			<div className="header-links">
				<Link to="/productos" className="header-link" >Productos</Link>
				{localStorage.getItem('dietasCheck')===1 ?
				(<Link className="header-link" to="/dieta/list">Dietas</Link>)  : <div></div>}
				<Link className="header-link" to="/cesta">Cestas</Link>
			</div>
			<div className="carro-menu-container">
				<Link className="carro" to="/carro">
					<img src={carro} className="icon" alt="Carro"/>
				</Link>
			</div>

			{localStorage.getItem('auth')!=null ? (<Link className="perfil" to="/perfil">
				<img src={user} className="icon" alt="Mi Perfil"/>
			</Link>) : <div></div>}
			<a href="#" className="hamburger-menu" onClick={menuInteraction}>
				<img src={menu} className="hamburger-icon" alt="Menu"/>
			</a>
			<Link className="login" to={login}>
				{loginEsp}
			</Link>
		</div>
		<div id="menuLinks">
			<Link to="/productos" className="menuLink" onClick={closeMenu}>Productos</Link>
			{localStorage.getItem('dietasCheck')===1 ?
			<Link className="menuLink" to="/dieta/list" onClick={closeMenu}>Dietas</Link> : <div></div>}
			<Link className="menuLink" to="/cesta" onClick={closeMenu}>Cestas</Link>
			<Link className="menuLink" to="/perfil" onClick={closeMenu}>Mi perfil</Link>
		</div>
		</div>
	);
}

export default Header;

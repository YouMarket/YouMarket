import React, { useState,useCallback, useEffect } from 'react';
import './styles.css';
import logo from '../logo.png';
import carro from './shopping-cart.svg';
import menu from './menu.svg';
import {Link, NavLink} from 'react-router-dom';
import user from './user-circle-solid.svg';

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
				<Link to="/" className="header-link" >Productos</Link>
				<Link className="header-link" to="/dieta/list">Dietas</Link>
				<Link className="header-link" to="/products">Cestas</Link>
			</div>
			<div className="carro-menu-container">
				<Link className="carro" to="/carro">
					<img src={carro} className="icon" alt="Carro"/>
				</Link>
			</div>

			<Link className="perfil" to="/perfil">
				<img src={user} className="icon" alt="Mi Perfil"/>
			</Link>
			<a href="#" className="hamburger-menu" onClick={menuInteraction}>
				<img src={menu} className="hamburger-icon" alt="Menu"/>
			</a>
			<Link className="login" to={login}>
				{loginEsp}
			</Link>
		</div>
		<div id="menuLinks">
			<Link to="/" className="menuLink" onClick={closeMenu}>Productos</Link>
			<Link className="menuLink" to="/dietas" onClick={closeMenu}>Dietas</Link>
			<Link className="menuLink" to="/products" onClick={closeMenu}>Cestas</Link>
			<Link className="menuLink" to="/perfil" onClick={closeMenu}>Mi perfil</Link>
		</div>
		</div>
	);
}

export default Header;

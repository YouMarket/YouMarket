import React from 'react';
import { useHistory } from "react-router-dom"
import './styles.css';
import DatosUsuario from './DatosUsuario';

function Perfil() {
	let history = useHistory();
	
	if (localStorage.getItem('auth')==null){
		history.push('/login');
	}
	
  return(
	<div className="perfil-container">
		<DatosUsuario/>
	</div>
 );
}
export default Perfil;
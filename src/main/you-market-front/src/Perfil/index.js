import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../Header';
import Navegacion from './Navegacion';
import DatosUsuario from './DatosUsuario';

function Perfil() {
  return(
	<div className="perfil-container">
		<DatosUsuario/>
	</div>
 );
}
export default Perfil;
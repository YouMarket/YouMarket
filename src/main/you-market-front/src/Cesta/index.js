import React from 'react';
import style from './styles.css';
import {Link} from "react-router-dom";
import cest from './cesta.png';


function Cesta({id, nombre, productos, total}: Props) {

	interface Props {
		id: number,
		nombre: string,
		total:? number
	}

  return (

<div className="cesta-container-show">
  <h2 className="cesta-nombre">{nombre}</h2>
	  <div className="cesta-icon-show">

	  <Link to={`/show/cesta/${id}`}><img className="cesta-imagen-show" src={cest} alt="Imagen de cesta"/></Link>
		<Link to={`/cesta/edit/${id}`} className="cesta-editar">Editar</Link>

  	</div>
  </div>

 );
}
export default Cesta;

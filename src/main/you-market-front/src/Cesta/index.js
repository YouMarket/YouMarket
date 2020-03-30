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

<<<<<<< Updated upstream
<div className="show-cesta-div">
<div className="cesta-container">
  <h2 className="cesta-nombre">{nombre}</h2>
	  <div className="cesta-icon-show">
	  <Link to={`show/cesta/${id}`}><img className="cesta-imagen-show" src={cest} alt="Imagen de cesta"/></Link>
		<a className="cesta-editar" href="../cesta/edit/">Editar</a>
		
		 <span className="cesta-info">
				
				<p className="cesta-total">Total: 22e</p>
				<p className="cesta-productos">Id: {id}</p>
				<p className="cesta-productos">{productos}</p>
				{total && <p className="cesta-productos">{total}e</p>}
			</span>
=======
<div className="cesta-container-show">
  <h2 className="cesta-nombre">{nombre}</h2>
	  <div className="cesta-icon-show">
	  <Link to={`show/cesta/${id}`}><img className="cesta-imagen-show" src={cest} alt="Imagen de cesta"/></Link>
		<Link to={`/cesta/edit/${id}`} className="cesta-editar">Editar</Link>

>>>>>>> Stashed changes
  	</div>
  </div>	  
  </div>
 );
}
export default Cesta;

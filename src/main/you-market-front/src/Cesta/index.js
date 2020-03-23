import React from 'react';
import style from './styles.css';
import cest from './cesta.png';

function Cesta({id, nombre, productos, total}: Props) {
	
	interface Props {
		id: number,
		nombre: string,
		productos: List<String>,
		total: number
	}
  
  return (

<div className="cesta-container">
  <h2 className="cesta-nombre">{nombre}</h2>
	  <div className="cesta-icon">
		<img className="cesta-imagen" src={cest} alt="Imagen de cesta"/>
		<a className="cesta-editar" href="../cesta/edit/">Editar</a>
		
		 <span className="cesta-info">
				
				<p className="cesta-total">Total: 22e</p>
				<p className="cesta-productos">Id: {id}</p>
				<p className="cesta-productos">{productos}</p>
				{total && <p className="cesta-productos">{total}e</p>}
			</span>
  	</div>
  </div>	  
 );
}
export default Cesta;



//function Cesta({id, nombre, productos}: Props) {
//  return(
//  <div className="cesta-container">
//  <h2 className="cesta-nombre">{nombre}</h2>
//	  <div className="cesta-icon">
//		<img className="cesta-imagen" src={cest} alt="Imagen de cesta"/>
//		<a className="cesta-editar" href="../cesta/edit/{id}">Editar</a>
//		
//		 <span className="cesta-info">
//				
//				<p className="cesta-total">Total: 22e</p>
//				<p className="cesta-productos">{productos}</p>
//			</span>
//  	</div>
//  </div>
// );
//}
//export default Cesta;
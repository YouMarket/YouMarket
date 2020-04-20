import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import CestaProducto from '../CestaProducto';
import Header from '../Header';
import { useParams } from "react-router-dom";

function CestaProductos() {
	
const [cestaproductos, setCestaproductos] = useState();

	const { id } = useParams();
	
	const fetchCestaProductos = useCallback(() => {
	    return fetch(`https://youmarket-entrega2.herokuapp.com/cesta/productos/dieta/list/${id}`)
	      .then(res => res.json())
	      .then(cestaproductos => {
	        setCestaproductos(cestaproductos);
	      });
	  }, []);
	
	useEffect(() => {
		fetchCestaProductos();
	  }, [fetchCestaProductos]);
	
	
  return(
	<div>	  
	  <Header/>
	  <div className="productos-container">
	  	<div className="grid">
		      {cestaproductos && cestaproductos.map(cestaproducto => (
		    		  <div key={cestaproducto.cesta.id}>
				          <CestaProducto 
				          producto={cestaproducto.producto}
				          cesta={cestaproducto.cesta}
				          />
				      </div>
		      ))}
	  	</div>
	  </div>
	</div>
 );
}
export default CestaProductos;
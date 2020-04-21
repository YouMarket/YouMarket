import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Producto from '../Producto';
import Header from '../Header';
import { useParams } from "react-router-dom";

function DietaProductos() {
	
const [productos, setProductos] = useState([]);

	const { id } = useParams();

	const fetchDietaProductos = useCallback(() => {
	    return fetch(`https://youmarket-entrega4.herokuapp.com/producto/dieta/list/${id}`, {headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json',
			'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
			method:'GET'})
	      .then(res => res.json())
	      .then(productos => {
	        setProductos(productos);
	      });
	  }, []);
	
	useEffect(() => {
		fetchDietaProductos();
	  }, [fetchDietaProductos]);
	
	
  return(
	<div>	  
	  <Header/>
	  <div className="productos-container">
	  	<div className="grid">
	  		{productos && productos.map(producto => (
	  			<Producto 
	  				id={producto.id}  
	  				urlImagen={producto.urlImagen} 
	  				nombre={producto.nombre} 
	  				supermercado={producto.supermercado.nombre} 
	  				precio={producto.precioIva} 
	  				unidad={producto.unidad}
	  				key={producto.id}
	  			/>
	  		))}
	  	</div>
	  </div>
	</div>
 );
}
export default DietaProductos;

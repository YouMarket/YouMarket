import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Producto from '../Producto';
import Header from '../Header';

function Productos() {
	
const [productos, setProductos] = useState([]);

	const fetchProductos = useCallback(() => {
	    return fetch('https://youmarket-entrega2.herokuapp.com/producto/list')
	      .then(res => res.json())
	      .then(productos => {
	        setProductos(productos);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchProductos();
	  }, [fetchProductos]);
	
	
  return(
	<div>	  
	  <Header/>
	  <h1 className="container productos-title">¡Bienvenido a YouMarket!</h1>
	  <h1 className="container productos-title">Aquí tienes los productos disponibles 🤙</h1>
	  <div className="productos-container">
	  	<div className="grid">
	  		{productos.map(producto => (
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
export default Productos;
import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Producto from '../Producto';
import Header from '../Header';

function Productos() {
	
const [productos, setProductos] = useState([]);
	
	
	const fetchProductos = useCallback(() => {
	    return fetch('producto/list')
	      .then(res => res.json())
	      .then(productos => {
	        setProductos(productos);
	        console.log(productos);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchProductos();
	  }, [fetchProductos]);
	
	
  return(
	<div>	  
	  <Header/>
	  <div className="productos-container">
	  	<div className="grid">
	  		{productos.map(producto => (
	  			<Producto 
	  				id={producto.id}  
	  				imagen={producto.imagen} 
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
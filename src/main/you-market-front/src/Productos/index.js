import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Producto from '../Producto';
import Header from '../Header';

function Productos() {
	
const [productos, setProductos] = useState([]);
const [displayedProducts, setDisplayedProducts] = useState([]);

	const fetchProductos = useCallback(() => {
	    return fetch('https://youmarket-entrega2.herokuapp.com/producto/list')
	      .then(res => res.json())
	      .then(productos => {

			setProductos(productos);
			setDisplayedProducts(productos);
	        console.log(productos);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchProductos();
	  }, [fetchProductos]);
	
	function search(event){
		var searchQuery = event.target.value.toLowerCase();
		var displayedProducts = productos.filter(function(el){
			var serchVal = el.nombre.toLowerCase();
			return serchVal.indexOf(searchQuery)!==-1;
		});
		console.log(displayedProducts);
		setDisplayedProducts(displayedProducts)
	};
	
  return(
	<div>	  
	  <Header/>
	  <div className="productos-page container">
		<h1 className="productos-title">Aquí tienes los productos disponibles 🤙</h1>
		<input className="productos-search" type="text" onChange={search} placeholder="Busca aquí tus productos favoritos..."/>
	  </div>
	  <div className="productos-container">
	  	<div className="grid">
	  		{displayedProducts.map(producto => (
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
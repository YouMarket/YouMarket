import React, { useCallback, useState, useEffect} from 'react';
import './styles.css';
import Header from '../Header';
import { useParams } from "react-router-dom";

function ProductoDetalle() {

	const [ producto, setProducto] = useState();
	
	const { id } = useParams();
	
	const fetchProducto = useCallback(() => {
	    return fetch(`../../../producto/${id}`)
	      .then(res => res.json())
	      .then(producto => {
	        setProducto(producto)
	        console.log(producto);
	      });
	  	}, []);
    console.log(producto);
    useEffect(() => {
	    fetchProducto(producto);
	  }, []);	
	
    if (!producto){
    	return null;
    }	
	return(
	  <div>
	  	  <Header/>
	  	  <div>
	  	  		<div>
	  	  			<h2> {producto.nombre} </h2>
	  			</div>
	  			<img className="producto-imagen" src={producto.urlImagen} alt={producto.nombre}/>
			  	<div className="producto-info">
			  		<div>
						<b> Descripcion: </b>{producto.descripcion}
					</div>
		  			<div>
		  				<b> Precio: </b> {producto.precio}
		  			</div>
		  			<div>
	  					<b> Precio IVA: </b> {producto.precioIva}
	  				</div>
		  			<div>
		  				<b> Unidad: </b>{producto.unidad}
	  				</div>
			  		<div>
  						<b> Marca: </b>{producto.marca.name}
  					</div>
			  		<div>
						<b> Supermercado: </b> {producto.supermercado.name}
					</div>

			  	</div>
	  	  	</div>
	 </div>
	);
	
	
}

export default ProductoDetalle;
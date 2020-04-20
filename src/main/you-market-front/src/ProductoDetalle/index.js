import React, { useCallback, useState, useEffect} from 'react';
import './styles.css';
import Header from '../Header';
import { useParams } from "react-router-dom";
import plus from '../assets/plus.svg'
import less from '../assets/less.svg'
import Producto from '../Producto';

function ProductoDetalle() {

	const [producto, setProducto] = useState();
	const [cantidad, setCantidad] = useState(0);
	const { id } = useParams();
	
	const fetchProducto = useCallback(() => {
	    return fetch(`https://youmarket-entrega2.herokuapp.com/producto/${id}`)
	      .then(res => res.json())
	      .then(producto => {
	        setProducto(producto)
	      });
	  	}, []);

    useEffect(() => {
	    fetchProducto(producto);
	  }, []);	
	
    if (!producto){
    	return null;
	}	
	
	const renderDescription = () => {
		if	(producto.descripcion != null){
			return <div className="producto-detalle-field">{producto.descripcion}</div>
		}
	}

	var idContador = "contador-"+id
	var idMenos = "menos-"+id

	function lessProduct(){
		if(cantidad > 0){
			setCantidad(cantidad - 1)
			document.getElementById(idContador).textContent = cantidad
		}
	}
	
	function plusProduct() {
		setCantidad(cantidad + 1)
		document.getElementById(idContador).textContent = cantidad
	}


	function storeProdSession(id, cantidad, nombre, precio, urlImagen, supermercado, unidad){
		if(cantidad!=0){
			localStorage.setItem('carrolleno', true);
		}
        var prodSession = sessionStorage.getItem('prod_'+id);
        if(!prodSession){
            var jsonProd = {
                'producto': {
                    'id': id, 
                    'nombre': nombre,
                    'precioIva': precio,
                    'supermercado': supermercado,
                    'urlImagen': urlImagen,
                    'unidad': unidad
                },
                'cantidad': cantidad
            }
            var res = JSON.stringify(jsonProd)
            console.log(res)
            sessionStorage.setItem('prod_'+id, res)
        }else{
            var strProd = JSON.parse(prodSession)
            strProd.cantidad = parseInt(strProd.cantidad,10)+cantidad;
            console.log(strProd)
            sessionStorage.setItem('prod_'+id, JSON.stringify(strProd))
		}
		setCantidad(0)
	}


	return(
	  <div>
	  	  <Header/>
	  	  <div>
					
					<div className="producto-detalle-container container clearfix">

						<img className="producto-detalle-imagen" src={producto.urlImagen} alt={producto.nombre}/>

						<div className="producto-detalle-info">
							<div>
								<h2 className="producto-detalle-nombre"> {producto.nombre} </h2>
							</div>
							
							{renderDescription}

							<div className="producto-detalle-field">
								<b> Precio: </b> {producto.precio} {producto.unidad}
							</div>
							<div className="producto-detalle-field">
								<b> Precio con IVA: </b> {producto.precioIva} {producto.unidad}
							</div>
							<div className="producto-detalle-field">
								<b> Marca: </b>{producto.marca.nombre}
							</div>
							<div className="producto-detalle-field">
								<b> Supermercado: </b> {producto.supermercado.nombre}
							</div>

							<div className="producto-add-contenedor">
								<div className="producto-editar-cantidad clearfix">
									<img id={idMenos} className="menos" src={less} onClick={lessProduct} alt="Quitar uno"/>
									<p id={idContador} className="contador no-link">{cantidad}</p>
									<img className="mas" src={plus} onClick={plusProduct} alt="Añadir uno"/>
								</div>
								<button className="producto-detalle-add" onClick={() => storeProdSession(producto.id, cantidad, producto.nombre,
									 producto.precio, producto.urlImagen, producto.supermercado, producto.unidad)}>AÑADIR AL CARRO</button>
							</div>
						</div>
				</div>
	  	  	</div>
	 </div>
	);
	
	
}

export default ProductoDetalle;
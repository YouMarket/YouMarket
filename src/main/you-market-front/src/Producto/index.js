import React, {useState} from 'react';
import './styles.css';
import plus from '../assets/plus.svg'
import less from '../assets/less.svg'
import {NavLink} from 'react-router-dom';

interface Props {
	id: number,
	urlImagen: string,
	nombre: string,
	supermercado: string,
	precio: number,
	unidad: string,
}


function Producto({id, urlImagen, nombre, supermercado, precio, unidad}: Props) {
	
	const [cantidad, setCantidad] = useState(0);
	
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
        var prodSession = sessionStorage.getItem('prod_'+id);
        if(!prodSession){
            var jsonProd = {
                'producto': {
                    'id': id, 
                    'nombre': nombre,
                    'precioIva': precio,
                    'supermercado': {
                        'nombre': supermercado
                    },
                    'urlImagen': urlImagen,
                    'unidad': unidad
                },
                'cantidad': cantidad
            }
            var res = JSON.stringify(jsonProd)
            sessionStorage.setItem('prod_'+id, res)
        }else{
            var strProd = JSON.parse(prodSession)
            strProd.cantidad = parseInt(strProd.cantidad,10)+cantidad;
            sessionStorage.setItem('prod_'+id, JSON.stringify(strProd))
        }
    }

	function sendToBack(id, cantidad, nombre, precio, urlImagen, supermercado, unidad) {
		storeProdSession(id, cantidad, nombre, precio, urlImagen, supermercado, unidad)
		if(cantidad!=0){
			localStorage.setItem('carrolleno',true);
		}


		setCantidad(0);
	}

  return(
	  
		<div className="producto-container">
			<NavLink to={`../../../show/producto/${id}`} className="link">
			<img className="producto-imagen" src={urlImagen} alt="Imagen"/>
			<div className="producto-info">
				<p className="producto-precio no-link">{precio} {unidad}</p>
				<p className="producto-nombre no-link">{nombre}</p>
				<p className="producto-supermercado no-link">{supermercado}</p>
			</div>
	        </NavLink>
			<div className="container-cantidad">
				<div className="producto-editar-cantidad">
					<img id={idMenos} className="menos" src={less} onClick={lessProduct} alt="Menos"/>
					<p id={idContador} className="contador">{cantidad}</p>
					<img className="mas" src={plus} onClick={plusProduct} alt="Mas"/>
				</div>
				<button className="boton-add-producto" onClick={() => sendToBack(id, cantidad, nombre, precio, urlImagen, supermercado, unidad)}>AÑADIR AL CARRO</button>
			</div>
  		</div>
	  
 );
}

export default Producto;

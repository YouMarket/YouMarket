
import React,  { useCallback, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';
import { Formik } from 'formik';

import { useHistory } from "react-router-dom";


function ShowCesta() {
	const [cesta, setCesta] = useState();
	const [productoCesta, setProductoCesta] = useState();
	const [total, setTotal] = useState(0.0);
	let history = useHistory();
	const { id } = useParams();

	const fetchCesta = useCallback(() => {
		return fetch(`../../../cesta/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('auth')
			},
			method: 'GET'
		})
			.then(res => res.json())
			.then(cesta => {
				setCesta(cesta)

			});
	}, []);

	const fetchProductoCesta = useCallback(() => {
		return fetch(`../../../cesta/productos/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('auth')
			},
			method: 'GET'
		})
			.then(res => res.json())
			.then(productoCesta => {
				setProductoCesta(productoCesta)
				var tot = 0.0
				productoCesta.forEach(prod => {
					tot = tot + ( prod.cantidad * prod.producto.precioIva)
				})
				setTotal(tot)
			});
	}, []);

	useEffect(() => {
		fetchCesta(cesta);
		fetchProductoCesta(productoCesta);

	}, []);

	function storeProdSession(id, cantidad, nombre, precio, urlImagen, supermercado, unidad){
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
	}

	function storeAsCarrito(){
		productoCesta.forEach(prod => {
			storeProdSession(prod.producto.id, prod.cantidad, prod.producto.nombre, prod.producto.precioIva, prod.producto.urlImagen, prod.producto.supermercado, prod.producto.unidad)
		});
		history.push('/carro')
	}

	if (!cesta) {
		return null;
	}

	if (localStorage.getItem('auth') == null) {
		history.push('/login');
	}

	return (
		<div>
			<Header />

			<div className="cesta-container-show">

				<Cesta nombre={cesta.nombre} id={cesta.id} total="" />
				<h2 className="show-cesta-h">Productos</h2>
				<div className="separador"></div>
				{productoCesta && productoCesta.map((productoC) => (

					<div key={productoC.producto.id} className="div-productos-cesta">
						<Link to={`/show/producto/${productoC.producto.id}`}> {productoC.producto.nombre}
						</Link> x{productoC.cantidad}
						<img src={productoC.url} />
					</div>

				))}
				<p className="cesta-total">Total: {total}€</p>

				<div className="grid2-carrito-cesta">
					<button onClick={() => {storeAsCarrito()}}  className="submit-cesta-carrito">
						Añadir
            		</button>
				</div>
			</div>
		</div>
	);

}
export default ShowCesta;

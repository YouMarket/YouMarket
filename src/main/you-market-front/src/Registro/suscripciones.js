import React, { useCallback, useState, useEffect } from 'react';
import Header from '../Header';
import './styles.css';
import Dieta from '../Dieta';
import { useParams } from "react-router-dom";


function ListaSuscripciones() {

	
	const [suscripciones, setSuscripciones] = useState([]);
		
		const fetchSuscripciones = useCallback(() => {
			return fetch('suscripcion/all' , {headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'},
			method:'GET'})
				.then(res => res.json())
				.then(suscripciones => {
				setSuscripciones(suscripciones)
				});
			}, []);		
		useEffect(() => {
			fetchSuscripciones(suscripciones);
			}, []);

	return(
	  <div>
	  	<select className="input-select" id="selectSuscripciones">
            {suscripciones.map((suscripcion) => <option key={suscripcion.id} value={suscripcion.id}>{suscripcion.nombre} {suscripcion.precio} €</option>)}

		</select>
	 </div>
	);

}

export default ListaSuscripciones
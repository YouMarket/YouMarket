import React, {useCallback, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import Header from '../Header';
import Receta from '../Receta';
import SinAcceso from '../SinAcceso';

function Recetas() {
	const [recetas, setRecetas] = useState([]);

	const { id } = useParams();
	
	const fetchRecetas = useCallback(() => {
		return fetch(`../../../receta/list/${id}`)
	      .then(res => res.json())
	      .then(recetas => {
			setRecetas(recetas)
	      });
		  }, []);
    
    useEffect(() => {
	    fetchRecetas();
	  }, [fetchRecetas]);	
    
    if(localStorage.getItem('auth')==null){
		history.push('/login');
	}
    
	if(localStorage.getItem('dietasCheck')==0){
		history.push('/404');
	}

  return(
	<div>	  
	  <Header/>
	  {localStorage.getItem('dietasCheck')==1 ?
	  		(<div>
			<h2 className="container">¡Aquí tienes las recetas de la dieta que has seleccionado!</h2>
			<div className="recetas-container container">
			{recetas.length > 0 ? 
				<div className="grid">
					{recetas && recetas.map(receta => (
						<Receta id={receta.id} url_imagen={receta.url_imagen} nombre={receta.nombre} personas={receta.personas} tiempo={receta.tiempo} calorias={receta.calorias} />
					))}
				</div>:<h1 className="container">No hay recetas</h1>}
			</div>
			</div>) :(<SinAcceso/>)}
	</div>
  );
}

export default Recetas;

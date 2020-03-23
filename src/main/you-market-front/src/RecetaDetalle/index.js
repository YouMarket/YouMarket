import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Header from '../Header';

  const [recetas, setRecetas] = useState([]);
	
	
  const fetchRecetas = useCallback(() => {
	    return fetch('receta/list')
	      .then(res => res.json())
	      .then(recetas => {
	        setRecetas(recetas);
	        console.log(recetas);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchRecetas();
	  }, [fetchRecetas]);
  
  return(
	<div>	  
	  <Header/>
	  <div className="receta-container">
	  	<div className="grid">
	  		{receta.map(receta => (
	  			<Receta 
	  				id={receta.id}  
	  				imagen={receta.url_imagen} 
	  				nombre={receta.nombre} 
	  				descripcion={receta.descripcion}
	  				personas={receta.personas} 
	  				tiempo={receta.tiempo} 
	  				calorias={receta.calorias}
	  				key={producto.id}
	  			/>
	  		))}
	  	</div>
	  </div>
	</div>
 );
}

export default RecetaDetalle;
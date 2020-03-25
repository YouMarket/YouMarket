import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Header from '../Header';

  const [recetas, setRecetas] = useState([]);
	
  const { id } = useParams();
	
  const fetchReceta = useCallback(() => {
	    return fetch(`../../../receta/${id}`)
	      .then(res => res.json())
	      .then(recetas => {
	        setReceta(receta);
	        console.log(receta);
	      });
		}, []);
  	console.log(receta);
  	useEffect(() => {
  		fetchReceta(receta);
  	  }, []);
  	
  	if (!receta){
    	return null;
    }
  
  return(
	<div>
		  <Header/>
		  <div>
		  		<div>
		  			<h2> {receta.nombre} </h2>
				</div>
				<img className="receta-imagen" src={receta.urlImagen} alt={receta.nombre}/>
			  	<div className="receta-info">
			  		<div>
			  			<b> Calorias: </b>{receta.calorias}
					</div>
					<div>
						<b> Personas: </b> {receta.personas}
					</div>
					<div>
						<b> Tiempo: </b> {receta.tiempo}
					</div>
					<div>
						<b> Descripcion: </b>{receta.descripcion}
					</div>
		
			  	</div>
		  	</div>
	</div>
	);

}  
  
export default RecetaDetalle;
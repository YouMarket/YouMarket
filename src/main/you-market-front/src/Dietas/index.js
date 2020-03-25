import React, { useCallback, useState, useEffect} from 'react';
import './styles.css';
import Dieta from '../Dieta';
import Header from '../Header';
	
function Dietas() {
	
	
	const [dietas, setDietas] = useState([]);
	
	const fetchDietas = useCallback(() => {
	    return fetch('list')
	      .then(res => res.json())
	      .then(dietas => {
	        setDietas(dietas)
	        console.log(dietas);
	      });
	  	}, []);
    console.log(dietas);
    
    useEffect(() => {
	    fetchDietas(dietas);
	  }, []);	
	
		
	return(
	  <div>
	  	  <Header/>
	  	  	<div className="dietas-container">
		  	  	<div className="grid">
			      {dietas && dietas.map(dieta => (
			    		  <div key={dieta.nombre}>
					          <Dieta nombre={dieta.nombre}
					          url_imagen={dieta.url_imagen}
					          id={dieta.id}
					          tipo={dieta.tipo}
					          descripcion={dieta.descripcion}
					          activa={dieta.activa}/>
					      </div>
			      ))}
			    </div>
			</div>
	 </div>
	);
	
}
export default Dietas;
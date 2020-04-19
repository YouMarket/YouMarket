import React from 'react';
import './styles.css';
import Header from '../Header';
import Receta from '../Receta';

function Recetas() {
  return(
	<div>	  
	  <Header/>
	  <h2 className="container">¡Aquí tienes las recetas de la dieta que has seleccionado!</h2>
	  <div className="recetas-container container">
	  	<div className="grid">
	  		<Receta id="1" nombre="Hummus" imagen="https://delantaldealces.com/wp-content/uploads/2016/09/hummus-FB.jpg" personas="2" tiempo="20 min" calorias="60 calorias"/>
	  		<Receta id="2" nombre="Sopa de Garbanzo con especias y un monton de cosas vegetarianas" imagen="https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/03/29163422/RFB-1503-2-sopadegarbanzos.jpg" personas="3" tiempo="40 min" calorias="100 calorias"/>
			<Receta id="1" nombre="Hummus" imagen="https://delantaldealces.com/wp-content/uploads/2016/09/hummus-FB.jpg" personas="2" tiempo="20 min" calorias="60 calorias"/>
	  		<Receta id="2" nombre="Sopa de Garbanzo con especias y un monton de cosas vegetarianas" imagen="https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/03/29163422/RFB-1503-2-sopadegarbanzos.jpg" personas="3" tiempo="40 min" calorias="100 calorias"/>
	  		<Receta id="1" nombre="Hummus" imagen="https://delantaldealces.com/wp-content/uploads/2016/09/hummus-FB.jpg" personas="2" tiempo="20 min" calorias="60 calorias"/>
	  		<Receta id="2" nombre="Sopa de Garbanzo con especias y un monton de cosas vegetarianas" imagen="https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/03/29163422/RFB-1503-2-sopadegarbanzos.jpg" personas="3" tiempo="40 min" calorias="100 calorias"/>
	  	</div>
	  </div>
	</div>
 );
}
export default Recetas;

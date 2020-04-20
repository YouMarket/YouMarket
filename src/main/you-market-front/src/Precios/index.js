import React from 'react';
import './styles.css';
import Header from '../Header';
import cesta from '../assets/basket.svg'
import suscripcion from '../assets/subscription.svg'
import furgoneta from '../assets/van.svg'
import dieta from '../assets/fruit.svg'

function Precios() {

  return(
      <div>
        <Header/>
        <div className="preciospage">
            <p className="preciospage-welcome">Suscripciones</p>
            <div className="preciospage-services container">
                <div className="preciospage-service service-left">
                    <img className="service-image" src="https://image.flaticon.com/icons/svg/1170/1170678.svg" alt="estandar" />
                    <div className="service-information">
                        <p className="service-envios">Servicio estándar</p>
                        <p className="service-euros"></p>
                        <p className="service-text">Podrás realizar una suscripción que incluirá un número de envíos al mes.
                         				También podrás preparar cestas para que luego solo tengas que seleccionarlas.
                        </p>
                    </div>
                </div>
                <div className="preciospage-service service-right">
                    <img className="service-image" src="https://image.flaticon.com/icons/svg/1597/1597203.svg" alt="dietista"/>
                    <div className="service-information">
                        <p className="service-envios">Servicio de dietistas</p>
                        <p className="service-euros"></p>
                        <p className="service-text">
                        		El servicio de dietas te dará acceso a una serie de dietas que preparan nuestro equipo de dietistas.
                        		Incluye productos de temporada y garantiza una dieta equilibrada. Además, ofrecemos una serie de
                        		 recetas para cada dieta.
                        </p>
                    </div>
                </div>
            </div>
  		</div>    
        
        
        <div className="preciospage2">
            <p className="preciospage-welcome">Precios</p>
            <div className="preciospage-services container">
                <div className="preciospage-service service-left">
                    <div className="service-information">
                        <p className="service-envios">Servicio estándar</p>
                        <p className="service-text">
                        	<ul>
                        		<li> 1 envío: 6 € </li>
                        		<li> 2 envíos: 10 € </li>
                        		<li> 3 envíos: 14 € </li>
                        		<li> 4 envíos: 17 € </li>
                        		
                        	</ul>
                        </p>
                    </div>
                </div>
                <div className="preciospage-service service-right">
                    <div className="service-information">
                        <p className="service-envios">Servicio de dietistas</p>
                        <p className="service-euros">
                         + 3 €
                        </p>

                    </div>
                </div>
            </div>
  		</div>    
        
        

      </div>
 );
}

export default Precios;

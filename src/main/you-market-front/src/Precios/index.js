import React from "react";
import nutritionist from "../assets/nutritionist.svg";
import cart from "../assets/supermarket.svg";
import Header from "../Header";
import "./styles.css";

function Precios() {
  return (
    <div>
      <Header />
      <div className="preciospage-container container">
        <p className="preciospage-title">Suscripciones</p>
        <div className="preciospage-suscripciones container">
          <div className="preciospage-card card-left">
            <img className="card-image" src={cart} alt="estandar" />
            <div className="card-information">
              <p className="card-envios">Servicio estándar</p>
              <p className="card-euros"></p>
              <p className="card-text">
                Podrás realizar una suscripción que incluirá un número de envíos
                al mes. También podrás preparar cestas para que luego solo
                tengas que seleccionarlas.
              </p>
            </div>
          </div>
          <div className="preciospage-card card-right">
            <img className="card-image" src={nutritionist} alt="dietista" />
            <div className="card-information">
              <p className="card-envios">Servicio de dietistas</p>
              <p className="card-euros"></p>
              <p className="card-text">
                El servicio de dietas te dará acceso a una serie de dietas que
                preparan nuestro equipo de dietistas. Incluye productos de
                temporada y garantiza una dieta equilibrada. Además, ofrecemos
                una serie de recetas para cada dieta.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="preciospage-container container">
        <p className="preciospage-title">Precios</p>
        <div className="preciospage-precios container">
          <div className="preciospage-card card-left">
            <div className="card-information">
              <p className="card-envios">Servicio estándar</p>
              <ul className="card-text">
                <li> 1 envío: 6,00 € </li>
                <li> 2 envíos: 10,00 € </li>
                <li> 3 envíos: 14,00 € </li>
                <li> 4 envíos: 17,00 € </li>
              </ul>
            </div>
          </div>
          <div className="preciospage-card card-right">
            <div className="card-information">
              <p className="card-envios">Servicio de dietistas</p>
              <p className="card-euros">+ 3,00 €</p>
            </div>
          </div>
        </div>

        <div className="terminosYCondiciones-a-enlace">
          <a href="/terminosYCondiciones" className="link-button">
            Acceder a los terminos y condiciones de la web
          </a>
        </div>
      </div>
    </div>
  );
}

export default Precios;

import React from "react";
import Header from "../../Header";
import Navegacion from "../Navegacion";
import "./styles.css";

function DatosEnvio() {
  return (
    <div>
      <Header />
      <Navegacion />
      <div className="seccion-perfil">
        <h1>Datos de Envío</h1>
        <div className="datos-envio">
          <p>Direccion: Calle Tomás de Ibarra, 12</p>
          <p>Población: Tomares</p>
          <p>Provincia: Sevilla</p>
          <p>Código Postal: 41940</p>
        </div>
        <button className="boton-perfil">Cambiar dirección de envío</button>
      </div>
    </div>
  );
}
export default DatosEnvio;

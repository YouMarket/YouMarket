import React from "react";
import prohibido from "../assets/prohibido.png";
import "./styles.css";

function SinAcceso() {
  return (
    <div className="container">
      <img className="access-img" alt="No tienes acceso" src={prohibido} />
      <h1 className="access-text">Vaya, no deberías estar aquí...</h1>
    </div>
  );
}
export default SinAcceso;

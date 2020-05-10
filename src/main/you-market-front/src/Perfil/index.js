import React from "react";
import { useHistory } from "react-router-dom";
import DatosUsuario from "./DatosUsuario";
import "./styles.css";

function Perfil() {
  let history = useHistory();

  if (localStorage.getItem("auth") == null) {
    history.push("/login");
  }

  return (
    <div className="perfil-container">
      <DatosUsuario />
    </div>
  );
}
export default Perfil;

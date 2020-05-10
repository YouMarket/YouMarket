import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dieta from "../Dieta";
import Header from "../Header";
import SinAcceso from "../SinAcceso";
import "./styles.css";

function Dietas() {
  let history = useHistory();

  const [dietas, setDietas] = useState([]);

  const fetchDietas = useCallback(() => {
    return fetch("list", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dietas) => {
        setDietas(dietas);
      });
  }, []);

  useEffect(() => {
    fetchDietas(dietas);
  }, []);

  if (localStorage.getItem("auth") == null) {
    history.push("/login");
  }

  if (localStorage.getItem("dietasCheck") == 0) {
    history.push("/404");
  }

  return (
    <div>
      <Header />
      {localStorage.getItem("dietasCheck") == 1 ? (
        <div className="dietas-page-container container">
          <h1 className="container dietas-title">
            Estas son las dietas que tenemos disponibles actualmente,
            ¡disfrútalas! 🥳
          </h1>
          <div className="dietas-container">
            <div className="grid">
              {dietas &&
                dietas.map((dieta) => (
                  <div key={dieta.nombre}>
                    <Dieta
                      nombre={dieta.nombre}
                      url_imagen={dieta.url_imagen}
                      id={dieta.id}
                      tipo={dieta.tipo}
                      descripcion={dieta.descripcion}
                      activa={dieta.activa}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <SinAcceso />
      )}
    </div>
  );
}
export default Dietas;

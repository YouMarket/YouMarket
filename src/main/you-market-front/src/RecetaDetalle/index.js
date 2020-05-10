import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "./styles.css";

function RecetaDetalle() {
  const [receta, setReceta] = useState();

  const { id } = useParams();

  const fetchReceta = useCallback(() => {
    return fetch(`../../../receta/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((receta) => {
        setReceta(receta);
      });
  }, []);
  useEffect(() => {
    fetchReceta(receta);
  }, []);

  if (!receta) {
    return null;
  }
  return (
    <div>
      <Header />
      <div className="receta-detalle-container container clearfix">
        <img
          className="receta-detalle-imagen"
          src={receta.url_imagen}
          alt={receta.nombre}
        />
        <div className="receta-detalle-info">
          <h2 className="receta-detalle-nombre"> {receta.nombre} </h2>
          <div className="receta-detalle-field receta-personas">
            {receta.personas} personas
          </div>
          <div className="receta-detalle-field receta-tiempo">
            {receta.tiempo} minutos
          </div>
          <div className="receta-detalle-field receta-calorias">
            {receta.calorias} kcal
          </div>
          <div className="receta-detalle-field">{receta.descripcion}</div>
        </div>
      </div>
    </div>
  );
}

export default RecetaDetalle;

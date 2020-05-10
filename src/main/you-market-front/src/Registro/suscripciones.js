import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";

function ListaSuscripciones() {
  const [suscripciones, setSuscripciones] = useState([]);

  const fetchSuscripciones = useCallback(() => {
    return fetch("suscripcion/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((suscripciones) => {
        setSuscripciones(suscripciones);
      });
  }, []);
  useEffect(() => {
    fetchSuscripciones(suscripciones);
  }, []);

  return (
    <div>
      <select className="input-select" id="selectSuscripciones">
        {suscripciones.map((suscripcion) => (
          <option key={suscripcion.id} value={suscripcion.id}>
            {suscripcion.nombre} {suscripcion.precio.toFixed(2)} €
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListaSuscripciones;

import React, { useCallback, useEffect, useState } from "react";
import Factura from "../../Factura";
import Header from "../../Header";
import Navegacion from "../Navegacion";
import "./styles.css";

function Facturas() {
  const [facturasPedidos, setFacturasPedidos] = useState([]);
  const [facturasSuscripcion, setFacturasSuscripcion] = useState([]);

  const fetchFacturasPedidos = useCallback(() => {
    return fetch("factura/pedidosUser", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((facturasPedidos) => {
        setFacturasPedidos(facturasPedidos);
      });
  }, []);

  const fetchFacturasSuscripcion = useCallback(() => {
    return fetch("factura/suscripcionesUser", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((facturasSuscripcion) => {
        setFacturasSuscripcion(facturasSuscripcion);
      });
  }, []);

  useEffect(() => {
    fetchFacturasPedidos();
  }, [fetchFacturasPedidos]);

  useEffect(() => {
    fetchFacturasSuscripcion();
  }, [fetchFacturasSuscripcion]);

  return (
    <div>
      <Header />
      <Navegacion />
      <div className="facturas-container container">
        <h2 className="facturas-title">Facturas de pedidos</h2>
        {facturasPedidos.length > 0 ? (
          <div>
            {facturasPedidos.map((factura) => (
              <Factura
                id={factura.id}
                total={factura.total}
                totalIva={factura.totalIva}
                fechaFactura={factura.fechaFactura}
                pedido={factura.pedido.id}
              />
            ))}
          </div>
        ) : (
          <p>No tienes facturas de este tipo</p>
        )}
        <h2 className="facturas-title">Facturas de suscripciones</h2>
        {facturasSuscripcion.length > 0 ? (
          <div>
            {facturasSuscripcion.map((factura) => (
              <Factura
                id={factura.id}
                total={factura.total}
                totalIva={factura.totalIva}
                fechaFactura={factura.fechaFactura}
              />
            ))}
          </div>
        ) : (
          <p>No tienes facturas de este tipo</p>
        )}
      </div>
    </div>
  );
}
export default Facturas;

import React from "react";
import "./styles.css";

interface Props {
  id: Number;
  total: Number;
  totalIva: Number;
  fechaFactura: String;
  pedido: Number;
}

function Factura({ id, total, totalIva, fechaFactura, pedido }: Props) {
  const url = "http://localhost:8081/factura/generateFactura/" + id;
  const dateFormatted = new Date(fechaFactura).toLocaleDateString();

  function descarga() {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download =
          pedido != null ? "factura_pedido.pdf" : "factura_suscripcion.pdf";

        a.click();
      });
    });
  }

  return (
    <div className="factura-container">
      <p className="factura-field factura-id">
        <b>ID: </b>
        {id}
      </p>
      <p className="factura-field factura-precio">
        <b>Precio: </b>
        {total.toFixed(2)} €
      </p>
      <p className="factura-field factura-precioIva">
        <b>Precio con IVA: </b>
        {totalIva.toFixed(2)} €
      </p>
      <p className="factura-field factura-fecha">
        <b>Fecha: </b>
        {dateFormatted}
      </p>
      {pedido != null ? (
        <p className="factura-field factura-pedido">
          <b>ID Pedido: </b>
          {pedido}
        </p>
      ) : (
        <p></p>
      )}
      <a target="_blank">
        <button className="button-perfil button-finish" onClick={descarga}>
          Descargar factura
        </button>
      </a>
    </div>
  );
}

export default Factura;

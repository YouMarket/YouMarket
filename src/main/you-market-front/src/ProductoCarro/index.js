import React from "react";
import removeButton from "../assets/delete.svg";
import "./styles.css";

interface Props {
  id: number;
  urlImagen: string;
  nombre: string;
  supermercado: string;
  precioIva: number;
  unidad: string;
  cantidad: number;
}

function eliminarProducto(id) {
  sessionStorage.removeItem("prod_" + id);
  if (sessionStorage.length == 0) {
    localStorage.removeItem("carrolleno");
  }
  window.location.reload(false);
}

function ProductoListado({
  id,
  urlImagen,
  nombre,
  supermercado,
  precioIva,
  unidad,
  cantidad,
}: Props) {
  var productoId = "producto-" + id;
  return (
    <div id={productoId} className="producto-list-container clearfix">
      <img className="producto-list-imagen" src={urlImagen} alt={urlImagen} />
      <div className="producto-list-info clearfix">
        <p className="producto-list-nombre">{nombre}</p>
        <p className="producto-list-precio">
          {precioIva.toFixed(2)} {unidad}
        </p>
        <p className="producto-list-supermercado">{supermercado}</p>
        <p className="producto-list-cantidad">
          <b>Unidades:</b> {cantidad}
        </p>
        <img
          className="borrar-producto"
          src={removeButton}
          onClick={() => eliminarProducto(id)}
          alt="Eliminar producto"
        />
      </div>
    </div>
  );
}

export default ProductoListado;

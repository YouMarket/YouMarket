import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header";
import Producto from "../Producto";
import "./styles.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [supermercados, setSupermercados] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const fetchProductos = useCallback(() => {
    return fetch("producto/list")
      .then((res) => res.json())
      .then((productos) => {
        setProductos(productos);
        setDisplayedProducts(productos);
      });
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const fetchMarcas = useCallback(() => {
    return fetch("producto/marcas")
      .then((res) => res.json())
      .then((marcas) => {
        setMarcas(marcas);
        console.log(marcas);
      });
  }, []);

  useEffect(() => {
    fetchMarcas();
  }, [fetchMarcas]);

  const fetchSupermercados = useCallback(() => {
    return fetch("producto/supermercados")
      .then((res) => res.json())
      .then((supermercados) => {
        setSupermercados(supermercados);
        console.log(supermercados);
      });
  }, []);

  useEffect(() => {
    fetchSupermercados();
  }, [fetchSupermercados]);

  function filter() {
    var inputSearch = document.getElementById("input-search").value;
    var selectMarcas = document.getElementById("select-marcas").value;
    var selectSupermercados = document.getElementById("select-supermercados")
      .value;
    var productosFiltradosTotal = [];

    if (selectMarcas == "" && selectSupermercados == "" && inputSearch == "") {
      // Todos vacíos
      productosFiltradosTotal = productos;
    } else if (
      selectMarcas != "" &&
      selectSupermercados == "" &&
      inputSearch == ""
    ) {
      // Solo marca
      productosFiltradosTotal = productos.filter(function (el) {
        var serchVal = el.marca.nombre.toLowerCase();
        return serchVal.indexOf(selectMarcas.toLowerCase()) !== -1;
      });
    } else if (
      selectSupermercados != "" &&
      selectMarcas == "" &&
      inputSearch == ""
    ) {
      // Solo supermercados
      productosFiltradosTotal = productos.filter(function (el) {
        var serchVal = el.supermercado.nombre.toLowerCase();
        return serchVal.indexOf(selectSupermercados.toLowerCase()) !== -1;
      });
    } else if (
      selectSupermercados != "" &&
      selectMarcas != "" &&
      inputSearch == ""
    ) {
      // Marca y super
      productosFiltradosTotal = productos.filter(function (el) {
        var serchValSuper = el.supermercado.nombre.toLowerCase();
        var serchValMarca = el.marca.nombre.toLowerCase();
        return (
          serchValSuper.indexOf(selectSupermercados.toLowerCase()) !== -1 &&
          serchValMarca.indexOf(selectMarcas.toLowerCase()) !== -1
        );
      });
    } else if (
      selectSupermercados != "" &&
      selectMarcas == "" &&
      inputSearch != ""
    ) {
      // Supermercado y buscador
      productosFiltradosTotal = productos.filter(function (el) {
        var serchValSuper = el.supermercado.nombre.toLowerCase();
        var serchValBuscador = el.nombre.toLowerCase();
        return (
          serchValSuper.indexOf(selectSupermercados.toLowerCase()) !== -1 &&
          serchValBuscador.indexOf(inputSearch.toLowerCase()) !== -1
        );
      });
    } else if (
      selectSupermercados == "" &&
      selectMarcas != "" &&
      inputSearch != ""
    ) {
      // Marca y buscador
      productosFiltradosTotal = productos.filter(function (el) {
        var serchValMarca = el.marca.nombre.toLowerCase();
        var serchValBuscador = el.nombre.toLowerCase();
        return (
          serchValMarca.indexOf(selectMarcas.toLowerCase()) !== -1 &&
          serchValBuscador.indexOf(inputSearch.toLowerCase()) !== -1
        );
      });
    } else if (
      selectSupermercados != "" &&
      selectMarcas != "" &&
      inputSearch != ""
    ) {
      // Todos rellenos
      productosFiltradosTotal = productos.filter(function (el) {
        var searchValSuper = el.supermercado.nombre.toLowerCase();
        var serchValMarca = el.marca.nombre.toLowerCase();
        var serchValBuscador = el.nombre.toLowerCase();
        return (
          serchValMarca.indexOf(selectMarcas.toLowerCase()) !== -1 &&
          serchValBuscador.indexOf(inputSearch.toLowerCase()) !== -1 &&
          searchValSuper.indexOf(selectSupermercados.toLowerCase()) !== -1
        );
      });
    } else if (
      selectSupermercados == "" &&
      selectMarcas == "" &&
      inputSearch != ""
    ) {
      // Solo buscador
      productosFiltradosTotal = productos.filter(function (el) {
        var serchValBuscador = el.nombre.toLowerCase();
        return serchValBuscador.indexOf(inputSearch.toLowerCase()) !== -1;
      });
    }

    setDisplayedProducts(productosFiltradosTotal);
  }

  function resetFilters() {
    setDisplayedProducts(productos);
    window.location.reload();
  }

  return (
    <div>
      <Header />
      <div className="productos-page container">
        <h1 className="productos-title">
          Aquí tienes los productos disponibles 🤙
        </h1>
        <input
          id="input-search"
          className="productos-search"
          type="text"
          onChange={filter}
          placeholder="Busca aquí tus productos favoritos..."
        />
        <div className="productos-filtro filtroMarca">
          <p>Filtra por marca:</p>
          <select id="select-marcas" name="marcas" onChange={filter}>
            <option key="null" value="">
              ------------
            </option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.nombre}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="productos-filtro filtroSuper">
          <p>Filtra por supermercado:</p>
          <select
            id="select-supermercados"
            name="supermercados"
            onChange={filter}
          >
            <option key="null" value="">
              ------------
            </option>
            {supermercados.map((supermercado) => (
              <option key={supermercado.id} value={supermercado.nombre}>
                {supermercado.nombre}
              </option>
            ))}
          </select>
        </div>

        <button className="button-finish" onClick={resetFilters}>
          Resetear filtros
        </button>
      </div>
      <div className="productos-container">
        <div className="grid">
          {displayedProducts.map((producto) => (
            <Producto
              id={producto.id}
              urlImagen={producto.urlImagen}
              nombre={producto.nombre}
              supermercado={producto.supermercado.nombre}
              precio={producto.precioIva}
              unidad={producto.unidad}
              key={producto.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Productos;

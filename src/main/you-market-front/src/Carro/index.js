import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import shoppingSad from "../assets/shopping-cart-sad.png";
import Header from "../Header";
import ProductoListado from "../ProductoCarro";
import "./styles.css";

var precioFinal = 0.0;
function updatePrecioFinal(cantidad, precio) {
  precioFinal += precio * cantidad;
  return precioFinal;
}

function limpiaStorage() {
  localStorage.removeItem("carrolleno");
  sessionStorage.clear();
}

function Carro() {
  precioFinal = 0.0;
  const [carrito, setCarrito] = useState([]);
  const [cestas, setCestas] = useState([]);
  const [sinSuscripcion, setSinSuscripcion] = useState([]);
  const [mensajeAlerta, setMensajeAlerta] = useState([]);
  let history = useHistory();

  const fetchCarrito = useCallback(() => {
    return construyeCarrito();
  }, []);

  function construyeCarrito() {
    var prods = [];
    Object.keys(sessionStorage).forEach((element) => {
      var ele = sessionStorage.getItem(element);
      if (JSON.parse(ele)) {
        prods.push(JSON.parse(ele));
      }
      setCarrito(prods);
    });
    setCarrito(prods);
    return 0;
  }

  useEffect(() => {
    fetchCarrito(carrito);
    fetch("/usuario/cestasCheck", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((cestasCheck1) => {
        localStorage.removeItem("cestasCheck");
        localStorage.setItem("cestasCheck", cestasCheck1);
      });
  }, []);

  const fetchCestas = useCallback(() => {
    return fetch("cesta/user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((cestas) => {
        setCestas(cestas);
      });
  }, []);

  const fetchMsg = useCallback(() => {
    return fetch("/usuario/alertaPago", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setSinSuscripcion(response.success);
        setMensajeAlerta(response.message);
      });
  }, []);

  useEffect(() => {
    fetchCestas(cestas);
    fetchMsg();
  }, []);

  function carritoLleno() {
    localStorage.setItem("carrolleno", true);
  }

  return (
    <div>
      <Header />
      {localStorage.getItem("carrolleno") ? (
        <div>
          <div className="container clearfix">
            <h1 className="introduction">
              Este es tu carrito. ¡Estás a pocos pasos de completar tu compra!
              👍
            </h1>
            <div className="vaciar-carrito">
              <Formik
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    fetch("/carritoDestroy", {
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("auth"),
                      },
                      method: "POST",
                    })
                      .then((response) => {
                        setSubmitting = false;
                        localStorage.removeItem("carrolleno");
                      })
                      .then(() => {
                        window.location.reload(false);
                      });
                  }, 400);
                }}
              >
                {({
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="button-carrito-a-cesta">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => limpiaStorage()}
                        className="button-vaciar"
                      >
                        Vaciar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="products-container-list">
              {carrito.map((cestaproducto) => (
                <ProductoListado
                  id={cestaproducto.producto.id}
                  nombre={cestaproducto.producto.nombre}
                  supermercado={cestaproducto.producto.supermercado.nombre}
                  precioIva={cestaproducto.producto.precioIva}
                  urlImagen={cestaproducto.producto.urlImagen}
                  unidad={cestaproducto.producto.unidad}
                  cantidad={cestaproducto.cantidad}
                >
                  {updatePrecioFinal(
                    cestaproducto.cantidad,
                    cestaproducto.producto.precioIva
                  )}
                </ProductoListado>
              ))}

              <div className="price">
                <b>Precio final: </b>
                {precioFinal.toFixed(2)} €
              </div>
              <div className="buttons">
                {localStorage.getItem("auth") ? (
                  sinSuscripcion ? (
                    <a href="/pedido/create">
                      <button className="button-finish" onClick={carritoLleno}>
                        Terminar pedido
                      </button>
                    </a>
                  ) : (
                    <div>
                      <p>{mensajeAlerta}</p>
                      <a href="/datos-perfil" className="enlace-perfil">
                        <button className="button-finish">
                          Ir a mi perfil
                        </button>
                      </a>
                      <br />
                    </div>
                  )
                ) : (
                  <a href="/login">
                    <button className="button-finish">Terminar pedido</button>
                  </a>
                )}
              </div>

              {localStorage.getItem("cestasCheck") > 0 ? (
                <div className="guardar-carrito-a-cesta">
                  <h2>¿Quieres guardar tu carrito como cesta?</h2>
                  <p>Elige la cesta en la que quieres guardar el carrito.</p>
                  <p>
                    Si guardas este carrito dentro de una cesta que hayas
                    creado, podrás volver a cargar esta cesta como carrito desde
                    la vista de detalle de la cesta que quieras cargar cuando
                    quieras
                  </p>
                  <p>
                    Si no tienes ningua cesta puedes crearla{" "}
                    <a href="/create/cesta" className="link-button">
                      aquí
                    </a>
                  </p>
                  <Formik
                    initialValues={{ id: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (values.id === "") {
                        errors.id = "No puede estar vacío";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        fetch(`/carritoACesta/${values.id}`, {
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization:
                              "Bearer " + localStorage.getItem("auth"),
                          },
                          method: "POST",
                          body: JSON.stringify(carrito, null, 1),
                        })
                          .then((response) => {
                            setSubmitting = false;
                          })
                          .then(() => {
                            history.push(`/show/cesta/${values.id}`);
                          });
                      }, 400);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="">
                          <select
                            name="id"
                            id="id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.id}
                          >
                            <option value=""></option>
                            {cestas &&
                              cestas.map((cesta) => (
                                <option value={cesta.id}>{cesta.nombre}</option>
                              ))}
                          </select>
                          <p className="error-required-cesta-a-carrito">
                            {errors.id && touched.id && errors.id}
                          </p>

                          <div className="button-carrito-a-cesta">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="button-finish"
                            >
                              Guardar como cesta
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="introduction introduction-empty">
            Vaya... parece que aún no tienes productos añadidos
          </h1>
          <div className="introduction">
            <img
              className="carrito-empty-image"
              src={shoppingSad}
              alt="Carro vacío"
            />
          </div>
          <p className="empty-view-text">
            Si te apetece, puedes añadir productos desde{" "}
            <NavLink className="link-button" to="/productos">
              aquí
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default Carro;

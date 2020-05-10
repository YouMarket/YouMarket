import { Formik } from "formik";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import React from "react";
import Header from "../../Header";
import "../styles.css";

export default class RegistroDireccion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <div className="registro-container">
          <Formik
            initialValues={{
              nombre: "",
              apellidos: "",
              dni: "",
              fechaNacimiento: "",
              telefono: "",
              email: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch("../usuario/signUp", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(values, null, 7),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.id != null) {
                      this.props.history.push("/cesta");
                    } else {
                      this.onChangeErrors("Contraseña incorrecta");
                    }
                  });

                setSubmitting(false);
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
              <form onSubmit={handleSubmit}>
                <Card title="Direccion del usuario">
                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="text"
                        name="nombre"
                        id="nombreIn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
                      />
                      <label htmlFor="nomIn">Nombre: </label>
                    </span>
                  </div>
                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="text"
                        name="apellidos"
                        id="apellidosIn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.apellidos}
                      />
                      <label htmlFor="apellidosIn">Apellidos: </label>
                    </span>
                  </div>
                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="text"
                        name="dni"
                        id="dniIn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dni}
                      />
                      <label htmlFor="dniIn">DNI: </label>
                    </span>
                  </div>
                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="text"
                        name="fechaNacimiento"
                        id="nacimientoIn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fechaNacimiento}
                      />
                      <label htmlFor="nacimientoIn">Fecha de nacimiento</label>
                    </span>
                  </div>
                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.telefono}
                      />
                      <label htmlFor="telefono">Teléfono: </label>
                    </span>
                  </div>

                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="new-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <label htmlFor="email">Email </label>
                    </span>
                  </div>
                  <div className="row">
                    <span className="p-float-label">
                      <input
                        type="password"
                        name="password"
                        id="passwordIn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <label htmlFor="passwordIn">Contraseña: </label>
                    </span>
                  </div>
                </Card>

                <div className="row">
                  <button type="submit" disabled={isSubmitting}>
                    Enviar
                  </button>
                  <br />
                  <ProgressBar value="40" style={{ margin: 20 }} />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

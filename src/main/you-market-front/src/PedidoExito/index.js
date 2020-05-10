import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import "./styles.css";

class PedidoExito extends React.Component {
  componentWillMount() {
    if (!localStorage.getItem("pedido")) {
      this.props.history.push("/");
    } else {
      localStorage.removeItem("pedido");
      localStorage.removeItem("carrolleno");
    }
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <br />
        <center>
          <img
            src="https://www.irelandwebsitedesign.com/images/request-a-quote/thumbs-up.gif"
            alt="alert"
            id="alert"
          />

          <div className="producto-detalle-container container clearfix">
            <h1> Pedido/s realizado/s con Éxito </h1>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(PedidoExito);

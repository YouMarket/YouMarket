import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlertaBrecha from "./AlertaBrecha";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Carro from "./Carro";
import CestaProductos from "./CestaProductos";
import Cestas from "./Cestas";
import DietaDetalle from "./DietaDetalle";
import DietaForm from "./DietaForm";
import DietaProductos from "./DietaProductos";
import Dietas from "./Dietas";
import EditCesta from "./EditCesta";
import FormCesta from "./FormCesta";
import Inicio from "./Inicio";
import Error from "./Misc";
import NotificarBrecha from "./NotificarBrecha";
import PedidoExito from "./PedidoExito";
import PedidoForm from "./PedidoForm";
import Perfil from "./Perfil";
import DatosEnvio from "./Perfil/DatosEnvio";
import DatosSubscripcion from "./Perfil/DatosSubscripcion";
import DatosUsuario from "./Perfil/DatosUsuario";
import PerfilForm from "./Perfil/DatosUsuario/perfilForm";
import SubscripcionForm from "./Perfil/DatosUsuario/suscripcionForm";
import Facturas from "./Perfil/Facturas";
import PedidosUsuario from "./Perfil/PedidosUsuario";
import Precios from "./Precios";
import ProductoDetalle from "./ProductoDetalle";
import Productos from "./Productos";
import RecetaDetalle from "./RecetaDetalle";
import Recetas from "./Recetas";
import RegistroUsuario from "./Registro";
import ShowCesta from "./ShowCesta";
import TerminosYCondiciones from "./TerminosCondiciones";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/producto/dieta/list/:id">
          <DietaProductos />
        </Route>
        <Route path="/pedido/create">
          <PedidoForm />
        </Route>
        <Route path="/create/dieta">
          <DietaForm />
        </Route>

        <Route path="/productos">
          <Productos />
        </Route>
        <Route path="/show/producto/:id">
          <ProductoDetalle />
        </Route>
        <Route path="/carro">
          <Carro />
        </Route>
        <Route path="/dieta/list">
          <Dietas />
        </Route>
        <Route path="/show/dieta/:id">
          <DietaDetalle />
        </Route>
        <Route path="/registro">
          <RegistroUsuario />
        </Route>
        <Route path="/perfil">
          <Perfil />
        </Route>
        <Route path="/datos-envio">
          <DatosEnvio />
        </Route>
        <Route path="/datos-perfil">
          <DatosUsuario />
        </Route>
        <Route path="/cambio-suscripcion">
          <SubscripcionForm />
        </Route>
        <Route path="/cambio-perfil">
          <PerfilForm />
        </Route>
        <Route path="/datos-subscripcion">
          <DatosSubscripcion />
        </Route>
        <Route path="/pedidos-usuario">
          <PedidosUsuario />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/cesta/edit/:id">
          <EditCesta />
        </Route>
        <Route path="/cesta">
          <Cestas />
        </Route>
        <Route path="/create/cesta">
          <FormCesta />
        </Route>
        <Route path="/show/cesta/:id">
          <ShowCesta />
        </Route>
        <Route path="/facturas-usuario">
          <Facturas />
        </Route>
        <Route path="/cesta/productos/dieta/list/:id">
          <CestaProductos />
        </Route>
        <Route path="/404">
          <Error />
        </Route>
        <Route path="/pedidoexito">
          <PedidoExito />
        </Route>
        <Route path="/terminosycondiciones">
          <TerminosYCondiciones />
        </Route>
        <Route path="/alertabrecha">
          <AlertaBrecha />
        </Route>
        <Route path="/recetas/list/:id">
          <Recetas />
        </Route>
        <Route path="/recetas/:id">
          <RecetaDetalle />
        </Route>
        <Route path="/productos">
          <Productos />
        </Route>
        <Route path="/precios">
          <Precios />
        </Route>
        <Route path="/brecha">
          <NotificarBrecha />
        </Route>

        <Route path="/">
          <Inicio />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

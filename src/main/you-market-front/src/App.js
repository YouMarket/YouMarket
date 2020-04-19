import React from 'react';

import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";
import Productos from './Productos';
import Dietas from './Dietas';
import Perfil from './Perfil';
import RecetasListado from './Recetas';
import ProductoDetalle from './ProductoDetalle';
import RegistroUsuario from './Registro';
import PedidosUsuario from './Perfil/PedidosUsuario';
import DatosUsuario from './Perfil/DatosUsuario';
import DatosSubscripcion from './Perfil/DatosSubscripcion';
import DatosEnvio from './Perfil/DatosEnvio';
import DietaDetalle from './DietaDetalle';
import DietaForm from './DietaForm';
import Login from './auth/Login'
import Logout from './auth/Logout'
import Inicio from './Inicio'
import PedidoForm from './PedidoForm';

import DietaProductos from './DietaProductos';

import Carro from './Carro';
import Cestas from './Cestas';
import FormCesta from './FormCesta';
import ShowCesta from './ShowCesta';
import EditCesta from './EditCesta';
import Error from './Misc';
import CestaProductos from './CestaProductos';
import Facturas from './Perfil/Facturas';
import SubscripcionForm from './Perfil/DatosUsuario/suscripcionForm'
import TerminosYCondiciones from './TerminosCondiciones';
import AlertaBrecha from './AlertaBrecha';
import PedidoExito from './PedidoExito';
import Recetas from './Recetas';
import Receta from './Receta';

function App() {

        return (
        <Router>
	        <Switch>
				<Route path="/producto/dieta/list/:id">
					<DietaProductos/>
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
    			<Route path="/recetas">
    				<RecetasListado/>
    			</Route>
    			<Route path="/registro">
					<RegistroUsuario/>
				</Route>
    			<Route path="/perfil">
					<Perfil/>
				</Route>
				<Route path="/datos-envio">
					<DatosEnvio/>
				</Route>
				<Route path="/datos-perfil">
					<DatosUsuario/>
				</Route>
				<Route path="/cambio-suscripcion">
					<SubscripcionForm/>
				</Route>
				<Route path="/datos-subscripcion">
					<DatosSubscripcion/>
				</Route>
				<Route path="/pedidos-usuario">
					<PedidosUsuario/>
				</Route>
				<Route path="/login">
    				<Login />
				</Route>
				<Route path="/logout">
					<Logout />
				</Route>
				<Route path="/cesta/edit/:id">
				<EditCesta/>
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
					<CestaProductos/>
				</Route>
				<Route path="/404">
					<Error/>
				</Route>
				<Route path="/pedidoexito">
					<PedidoExito/>
				</Route>
				<Route path="/terminosycondiciones">
        			<TerminosYCondiciones />
        		</Route>
				<Route path="/alertabrecha">
    				<AlertaBrecha />
				</Route>
				<Route path="/recetas/list">
					<Recetas />
				</Route>
				<Route path="/recetas/:id">
					<Receta />
				</Route>
				<Route path="/productos">
					<Productos />
				</Route>
				<Route path="/">
					<Inicio/>
				</Route>

		      </Switch>
        </Router>
        );
}

export default App;

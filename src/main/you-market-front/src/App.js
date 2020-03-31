import React, { Component } from 'react';

import {
	  BrowserRouter as Router,
	  Switch,
	  Route,
	  withRouter
	} from "react-router-dom";
import Productos from './Productos';
import Dietas from './Dietas';
import Perfil from './Perfil';
import RecetasListado from './RecetasListado';
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

import PedidoForm from './PedidoForm';
import CestaProductos from './CestaProductos';

import Carro from './Carro';
import Cestas from './Cestas';
import FormCesta from './FormCesta';
import ShowCesta from './ShowCesta';
import EditCesta from './EditCesta';
import Error from './Misc';

function App() {

        return (
        <Router>
	        <Switch>
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



				<Route path="/cesta/productos/dieta/list/:id">
					<CestaProductos/>
				</Route>
				
				<Route path="/404">
				<Error/>
			</Route>


		        <Route path="/">
		        	<Productos />
		        </Route>


		      </Switch>
        </Router>
        );
}

export default App;

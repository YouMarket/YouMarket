import React from 'react';
import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";
import Productos from './Productos';
import Dietas from './Dietas';
import Perfil from './Perfil';
import RecetasListado from './RecetasListado';
import ProductoDetalle from './ProductoDetalle';
import PedidosUsuario from './Perfil/PedidosUsuario';
import DatosUsuario from './Perfil/DatosUsuario';
import DatosSubscripcion from './Perfil/DatosSubscripcion';
import DatosEnvio from './Perfil/DatosEnvio';
import DietaDetalle from './DietaDetalle';
import DietaForm from './DietaForm';
import Login from './auth/Login'

import Carro from './Carro';

function App() {
        return (
        <Router>
	        <Switch>
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
				
    			<Route path="create/dieta">
					<DietaForm />
				</Route>
			
    			<Route path="/recetas">
    				<RecetasListado/>
    			</Route>
    			<Route path="/show/receta/:id">
    				<ProductoDetalle />
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
				<Route path="/">
		        	<Productos />
		        </Route>
		      </Switch>
        </Router>
        );
}

export default App;

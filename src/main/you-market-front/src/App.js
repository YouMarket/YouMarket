<<<<<<< Updated upstream
import React from 'react';
=======
import React, { Component } from 'react';
>>>>>>> Stashed changes

import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";

<<<<<<< Updated upstream
import Cestas from './Cestas'
import ShowCesta from './ShowCesta'
import FormCesta from './FormCesta'
import Login from './auth/Login'
import './App.css';
 
=======
import Carro from './Carro';
import Cestas from './Cestas';
import FormCesta from './FormCesta';
import ShowCesta from './ShowCesta';
import EditCesta from './EditCesta';
	
>>>>>>> Stashed changes
function App() {
	
        return (
        <Router>
	        <Switch>
<<<<<<< Updated upstream
		    	<Route path="/cesta">
=======
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
				<Route path="/cesta/edit/1">
				<EditCesta/>
				</Route>
				<Route path="/cesta">
>>>>>>> Stashed changes
		    		<Cestas />
		    	</Route>
		    	<Route path="/create/cesta">
	    			<FormCesta />
	    		</Route>
	    		<Route path="/show/cesta/:id">
	    			<ShowCesta />
	    		</Route>
	    		<Route path="/login">
    			<Login />
    		</Route>
		      </Switch>
        </Router>
        );
}

export default App;

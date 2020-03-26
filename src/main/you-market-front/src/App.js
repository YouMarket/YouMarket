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
import Carro from './Carro';

function App() {
        return (
        <Router>
	        <Switch>
		    	<Route path="/productos">
		    		<Productos />
		    	</Route>
		    	<Route path="/productodetalle">
	    			<ProductoDetalle />
	    		</Route>
		    	<Route path="/carro">
	    			<Carro />
	    		</Route>
		    	<Route path="/dieta/list">
    				<Dietas />
    			</Route>
    			<Route path="/recetas">
    				<RecetasListado/>
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
		        <Route path="/">
		        	<Productos />
		        </Route>
		      </Switch>
        </Router>
        );
}

export default App;

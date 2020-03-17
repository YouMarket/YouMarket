import React from 'react';
import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";
import Productos from './Productos';
import Dietas from './Dietas';

import RecetasListado from './RecetasListado';
import ProductoDetalle from './ProductoDetalle';


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
		    	<Route path="/dietas">
    				<Dietas />
    			</Route>
    			<Route path="/recetas">
    				<RecetasListado/>
    			</Route>
		        <Route path="/">
		        	<Productos />
		        </Route>
		      </Switch>
        </Router>
        );
}

export default App;
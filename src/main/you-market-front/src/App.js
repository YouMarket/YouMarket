import React from 'react';
import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";
import Productos from './Productos';
import Dietas from './Dietas';
import Carro from './Carro';
	
function App() {
        return (
        <Router>
	        <Switch>
		    	<Route path="/productos">
		    		<Productos />
		    	</Route>
		    	<Route path="/carro">
	    			<Carro />
	    		</Route>
		    	<Route path="/dietas">
    				<Dietas />
    			</Route>
		        <Route path="/">
		        	<Productos />
		        </Route>
		      </Switch>
        </Router>
        );
}

export default App;
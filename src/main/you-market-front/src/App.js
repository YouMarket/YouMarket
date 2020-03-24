import React from 'react';

import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";

import Cestas from './Cestas'
import ShowCesta from './ShowCesta'
import FormCesta from './FormCesta'
import './App.css';
 
function App() {
	
        return (
        <Router>
	        <Switch>
		    	<Route path="/cesta">
		    		<Cestas />
		    	</Route>
		    	<Route path="/create/cesta">
	    			<FormCesta />
	    		</Route>
	    		<Route path="/show/cesta/:id">
	    			<ShowCesta />
	    		</Route>
		      </Switch>
        </Router>
        );
}

export default App;

import React from 'react';

import {
	  BrowserRouter as Router,
	  Switch,
	  Route
	} from "react-router-dom";

import Cestas from './Cestas'
import ShowCesta from './ShowCesta'
import FormCesta from './FormCesta'
import Login from './auth/Login'
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
	    		<Route path="/login">
    			<Login />
    		</Route>
		      </Switch>
        </Router>
        );
}

export default App;

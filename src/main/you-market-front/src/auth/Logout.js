import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import Logo from '../logo.png';
import Header from '../Header';
import { Formik } from 'formik';
import {
	  withRouter
	} from 'react-router-dom';

			
class Logout extends React.Component{
	 constructor(props) {
		    super(props);
		    this.state = { status: "NotLogged" };
		  }

		handleRedirect = () => {
		    localStorage.removeItem('auth'); 
			this.props.history.push('/login');
	    }
			
		 componentWillMount() {
      this.handleRedirect();
   }
		
		render(){
			return(<div>
					Se esta desconectando...
					</div>

);}}
export default withRouter(Logout);
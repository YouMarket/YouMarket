import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import Logo from '../logo.png';
import Header from '../Header';
import { Formik } from 'formik';
import {
	  withRouter
	} from 'react-router-dom';

			
class 404 extends React.Component{
	 constructor(props) {
		    super(props);

		  }
		
		render(){
			return(


		<div>
		  <Header/>

		  <div className="caja-form">
		    <img src={Logo} className="logo-umarket"/>
		   
		  </div>
		 </div>
		);}

}
export default withRouter(404);
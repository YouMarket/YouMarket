import React,  { useFetch, useCallback, useState, useEffect } from 'react';

import style from './styles.css';
import Header from '../Header';
import { Formik } from 'formik';
import {
	  withRouter
	} from 'react-router-dom';

			
class AlertaBrecha extends React.Component{
	 constructor(props) {
		    super(props);

		  }
		
		render(){
			return(


		<div >
		<Header/>
			<br/>
			<center>
				<img src="https://www.lineex.es/wp-content/uploads/2018/06/alert-icon-red-11-1.png" alt="alert" id="alert"/>
			
			<div className="producto-detalle-container container clearfix" >
			
			
			<h1> SE HA PRODUCIDO UNA BRECHA DE SEGURIDAD </h1>
			
			<p>
				Revise su bandeja de entrada, ah� encontrar� toda la informaci�n
				referente a lo sucedido y a las medidas que puede tomar.
			</p>
		  	<p>
		  	 	Disculpe las molestias.
		  	</p>
		  	
		  </div>
		  </center>
		</div>
		);}

}
export default withRouter(AlertaBrecha);
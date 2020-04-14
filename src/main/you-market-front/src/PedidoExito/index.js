import React,  { useFetch, useCallback, useState, useEffect } from 'react';

import style from './styles.css';
import Header from '../Header';
import { Formik } from 'formik';
import {
	  withRouter
	} from 'react-router-dom';

			
class PedidoExito extends React.Component{
	 constructor(props) {
		    super(props);

		  }
		
		render(){
			return(


		<div >
		<Header/>
			<br/><br/>
			<center>
				<img src="https://media1.tenor.com/images/06ae072fb343a704ee80c2c55d2da80a/tenor.gif" alt="alert" id="alert"/>
			
			<div className="producto-detalle-container container clearfix" >
			
			
			<h1> Pedido/s realizado/s con éxito </h1>
			

		  	
		  </div>
		  </center>
		</div>
		);}

}
export default withRouter(PedidoExito);
import React from 'react';

import './styles.css';
import Header from '../Header';
import {
	  withRouter
	} from 'react-router-dom';

			
class AlertaBrecha extends React.Component{
			
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
				Revise su bandeja de entrada, ahí encontrar�á toda la información
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
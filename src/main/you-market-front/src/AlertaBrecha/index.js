import React from 'react';

import './styles.css';
import {
	  withRouter
	} from 'react-router-dom';

			
class AlertaBrecha extends React.Component{
			
		render(){
			return(


		<div >
			<br/>
			<center>
				<img src="https://www.lineex.es/wp-content/uploads/2018/06/alert-icon-red-11-1.png" alt="alert" id="alert"/>
			
			<div className="producto-detalle-container container clearfix" >
			
			
			<h1> SE HA PRODUCIDO UNA BRECHA DE SEGURIDAD </h1>
			
			<p>
				Si usted tiene cuenta en YouMarket, por favor, revise su correo electrónico. Le enviaremos una notificación en los próximos días.
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
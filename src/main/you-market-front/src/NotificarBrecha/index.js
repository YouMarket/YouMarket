import React from 'react';

import './styles.css';
import Header from '../Header';
import {
	  withRouter
	} from 'react-router-dom';

			
class NotificarBrecha extends React.Component{
	
		constructor(props){
		    super(props);
		    
		    this.state = {
		         estadoBrecha: false
		     };
		}
		
		hazFetch() {
			fetch('/brecha/alertar', {
		        headers: {
		            'Authorization': 'Bearer ' + localStorage.getItem('auth')
		        },
		        method: 'GET'
		    }).then(
		    	window.reload()
		    )
		}
		
		 componentWillMount() {
				fetch('/brecha/devuelveBrecha', {
			        headers: {
			            'Authorization': 'Bearer ' + localStorage.getItem('auth')
			        },
			        method: 'GET'
			    }).then(
			    	response => response.json()
			    ).then(
			    	res => {
			    		window.alert(res)
			    		this.setState({estadoBrecha:res})
			    	}
			    )
			    
		 }
		
		render(){
			return(
		<div >
		<Header/>
			<br/><br/>
			<center>
				<img src="https://www.lineex.es/wp-content/uploads/2018/06/alert-icon-red-11-1.png" alt="alert" id="alert"/>
			
			<div className="producto-detalle-container container clearfix" >
			
			<h1> USTED VA A NOTIFICAR UNA BRECHA DE SEGURIDAD </h1>
			
			<p>
				La brecha se encuentra: 
			</p>
		  	
			<a href="#" onClick={this.hazFetch}> Activar/desactivar notificación de brecha </a>
		  	
		  </div>
		  </center>
		</div>
		);}

}
export default withRouter(NotificarBrecha);
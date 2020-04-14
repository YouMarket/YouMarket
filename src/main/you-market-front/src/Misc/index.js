import React from 'react';
import img from './404.png';
import Header from '../Header';
import {
	  withRouter
	} from 'react-router-dom';

			
class Error extends React.Component{
	 constructor(props) {
		    super(props);

		  }
		
		render(){
			return(


		<div>
		  <Header/>

		  <div className="caja-404">
		    <img src={img} className="error404"/>
		     <div className="disculpa">
		    	<p>Póngase en contacto con el administrador del sistema, <a href="#"> you.market.0@gmail.com</a>, si el error persiste.</p>
		    		<p>Disculpe las molestias.</p>
		    		
		    </div>
		   
		  </div>
		 </div>
		);}

}
export default withRouter(Error);
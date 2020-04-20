import React from 'react';
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
		    localStorage.removeItem('dietasCheck'); 
		    localStorage.removeItem('enviosD');
		    localStorage.removeItem('cestasCheck'); 
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
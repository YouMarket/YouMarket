import React from 'react';
import Logo from '../logo.png';
import Header from '../Header';
import { Formik } from 'formik';
import {
	  withRouter
	} from 'react-router-dom';

			
class Login extends React.Component{
	 constructor(props) {
		    super(props);
			this.state = { status: "NotLogged" };
			this.state = { signup: ""};
		  }
	 
	 onChangeStatus() {        
		    this.setState({ status: "Logged" });
		  }
		
		onChangeErrors(Serrors) {        
		    this.setState({ errors: Serrors });
		  }

		handleRedirect = () => {
			if (localStorage.getItem('auth') != null){	
		      this.props.history.push('/');
			}
		}
			
		 componentWillMount() {
			if(localStorage.registroOK){
				this.setState({signup : localStorage.registroOK});
				localStorage.registroOK = ''
			}
      		this.handleRedirect();
   		}
		
		render(){
			return(


		<div>
		  <Header/>

		  <div className="caja-form">
		    <img src={Logo} alt="imagen-logo" className="logo-umarket"/>
		    <div className="span-login">
			<span className="p-float-label"><p className="registrado-p">{this.state.signup}</p></span>
			</div>
			<Formik
		      initialValues={{ email: '', password: '' }}

		      onSubmit={(values, { setSubmitting }) => {
		        setTimeout(() => {
		        	fetch('../usuario/signIn', {
		        			headers: {
		        				"Content-Type": "application/json"
		        			},
		        			method:'POST',
		        			body:JSON.stringify(values, null, 2)

					}).then(response => response.json())
						.then(data => {
						
						if (data.accessToken!=null) {
		                    this.onChangeStatus("Logged");
		                    localStorage.setItem('auth', data.accessToken);
							
		                    this.handleRedirect();
		                  }
		                else{
		                	this.onChangeErrors("Contraseña incorrecta");
	
		                	}
						});

		          setSubmitting(false);
		        }, 400);
		      }}
		    >
		      {({
		        values,
		        errors,
		        touched,
		        handleChange,
		        handleBlur,
		        handleSubmit,
		        isSubmitting,
		        /* and other goodies */
		      }) => (
		        <form onSubmit={handleSubmit}>
		        
		        <div className="span-login">
		        <span className="p-float-label">
	        	<label htmlFor="email"  className="login-label">Email </label>
		        <input
		            type="text"
		            name="email"
		            id="email"
		            autoComplete="new-password"
		            onChange={handleChange}
		            onBlur={handleBlur}
		            value={values.email}
		        	className="input-login"
		          />
		          </span> 
		        </div>
		        {errors.email && touched.email}
		        	<div className="span-login">
		        	<span className="p-float-label">
		        	
		        	<label htmlFor="password" className="login-label">Contraseña </label>
		          <input
		          id="password"
		            type="password"
		            name="password"
		            autoComplete="new-password"
		            onChange={handleChange}
		            onBlur={handleBlur}
		            value={values.name}
		          	className="input-login"
		          />
		          </span>
		          </div>
		       
		          {errors.password && touched.password}
		          <button type="submit" disabled={isSubmitting} className="submit-login">
		          Iniciar Sesión
		          </button>
		          <br/>
		          <small className="error-login">{this.state.errors}</small>

		        </form>
		      )}
		    </Formik>
		    <p className="registry-in-login">¿Aún no tienes cuenta?, <a href="/registro">Registrate</a></p>
		  </div>
		 </div>
		);}

}
export default withRouter(Login);
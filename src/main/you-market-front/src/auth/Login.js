import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
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
		  }
	 
	 onChangeStatus() {        
		    this.setState({ status: "Logged" });
		  }
		  
		onChangeStatus(Serrors) {        
		    this.setState({ errors: Serrors });
		  }

		handleRedirect = () => {
			if(localStorage.getItem('auth')!=null){	
		      this.props.history.push('/cesta');
			}
		    }
			
		 componentWillMount() {
      this.handleRedirect();
   }
		
		render(){
			return(


		<div>
		  <Header/>

		  <div className="caja-form">
		    <img src={Logo} className="logo-umarket"/>
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
						console.log(data)
						if (data.accessToken!=null) {
		                    this.onChangeStatus("Logged");
		                    localStorage.setItem('auth', data.accessToken);
							
		                    {this.handleRedirect();}
		                  }
		                else{
		                	this.onChangeErrors("Contraseña incorrecta");
	
		                	}
						});

		                	
		          
		          alert(JSON.stringify(values, null, 2));
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

		        <span className="p-float-label" className="span-login">
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
		        {errors.email && touched.email}
		        	<span className="p-float-label" className="span-login">
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
		       
		          {errors.password && touched.password}
		          <button type="submit" disabled={isSubmitting} className="submit-login">
		          Iniciar Sesión
		          </button>
		          <br/>
		          <small className="error-login">{this.state.errors}</small>

		        </form>
		      )}
		    </Formik>
		  </div>
		 </div>
		);}

}
export default withRouter(Login);
import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import Logo from '../logo.png';
import Header from '../Header';
import { Formik } from 'formik';
			
class Login extends React.Component{
	 constructor(props) {
		    super(props);
		    this.state = { errors: "" };
		    this.state = { status: "NotLogged" };
		  }
	 onChangeStatus() {        
		    this.setState({ status: "Logged" });
		  }
	 
	 onChangeErrors(Serrors) {        
		    this.setState({ errors: Serrors });
		  }

		handleRedirect = () => {
			console.log(this.props.history);
		      this.props.history.push('/home');
		    }
		render(){
			return(


		<div>
		  <Header/>
		  {this.state.errors}
		  <div className="caja-form">
		    <img src={Logo} className="logo-umarket"/>
		    <Formik
		      initialValues={{ email: '', password: '' }}

		      onSubmit={(values, { setSubmitting }) => {
		        setTimeout(() => {
		        	fetch('', {
		        			headers: {
		        				"Content-Type": "application/json"
		        			},
		        			method:'POST',
		        			body:JSON.stringify(values, null, 2)
		        	}).then(response => {
		                if (response.data.usuario!=null) {
		                    {this.inicializa();}
		                    this.onChangeStatus("Logged");
		                    {this.handleRedirect('home');}
		                  }
		                else{
		                	if(response.data.errors){
		                	this.onChangeErrors(response.data.errors);
		                	}else{
		                	this.onChangeErrors("Fallo de conexión");
		                	console.log(this.state.errors)
		                	}
		                	
		                }})
		          
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

		        </form>
		      )}
		    </Formik>
		  </div>
		 </div>
		);}

}
export default Login;
import React from 'react';
import Logo from '../logo.png';
import Header from '../Header';
import "./styles.css"
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
		 
		 dietasCheck() {
			 fetch('/usuario/dietasCheck' , {headers: {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
					method:'GET'})
				      .then(res => res.json())
				      .then(dietasCheck => {
				    	  localStorage.setItem('dietasCheck', dietasCheck);
				      });
		 }

		 adminCheck() {
			fetch('/usuario/adminCheck' , {headers: {
				   'Content-Type' : 'application/json',
				   'Accept' : 'application/json',
				   'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
				   method:'GET'})
					 .then(res => res.json())
					 .then(adminCheck => {
						 localStorage.setItem('adminCheck', adminCheck);
						 this.handleRedirect();
					 });
		}
		 
		 cestasCheck() {
			 fetch('/usuario/cestasCheck' , {headers: {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
					method:'GET'})
				      .then(res => res.json())
				      .then(cestasCheck1 => {
				    	  localStorage.setItem('cestasCheck', cestasCheck1);

				      });
		 }
		 
		 enviosCheck() {
			 fetch('/usuario/envios', {
					headers:{
					  'Content-Type' : 'application/json',
					  'Accept' : 'application/json',
					  'Authorization' : 'Bearer ' + localStorage.getItem('auth')
					  		},
					  method:'GET'})
					       .then(res => res.json())
					       .then(envios1 => {
					    	   localStorage.setItem('enviosD',envios1);
					       });
		 }

		render(){
			return(


		<div>
		  <Header/>

		  <div className="caja-form">
		    <img src={Logo} alt="imagen-logo" className="logo-umarket"/>
		    <div>
			<span className="p-float-label" className="span-login"><p className="registrado-p">{this.state.signup}</p></span>
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
		                    this.cestasCheck();
		                    this.enviosCheck();
							this.dietasCheck();
							this.adminCheck();
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
		        <form onSubmit={handleSubmit} className="login-form">

		        <div>
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
		        </div>
		        {errors.email && touched.email}
		        	<div>
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
		    <p className="registry-in-login">¿Aún no tienes cuenta?, <a className="register-link" href="/registro">Registrate</a></p>
		  </div>
		 </div>
		);}

}
export default withRouter(Login);

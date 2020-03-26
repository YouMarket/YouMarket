import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import Logo from '../logo.png';
import Header from '../Header';
import { Formik } from 'formik';
			
function inicializa(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [erros, setErrors] = useState("");
	const [status, setStatus] = useState("");
	
return(

		<div>
		  <Header/>
		  {status}
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
		                if (response.data.status="Logged") {
		                    
		                  }
		                })
		                .catch(error => {
		                  console.log("login error", error);
		                })
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
		);

}
export default inicializa;
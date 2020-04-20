import React from 'react';

import cest from './cesta2.png';
import { Formik } from 'formik';
import Header from '../Header';
import {
	  withRouter
	} from 'react-router-dom';

class formCesta extends React.Component{
	compruebaAuth(){
		if (localStorage.getItem('auth')==null){
			this.props.history.push('/login');
		}		
	}
	
	handleRedirect = () => {
	      this.props.history.push('/cesta');
	    }
	
	cestasCheck() {
		  fetch('usuario/cestasCheck' , {headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
				method:'GET'})
			      .then(res => res.json())
			      .then(cestasCheck1 => {
			    	  localStorage.removeItem('cestasCheck');
			    	  localStorage.setItem('cestasCheck', cestasCheck1);
			        
			      }).then(() => {this.handleRedirect()});
	 }
	
	render(){ 
		{this.compruebaAuth();}
		
		return(<div>
  <Header/>
  <div className="container">
    <h1 className="titulo-create-cesta">Crear cesta</h1>
    <img src={cest} className="cesta-imagen-edit" alt="Cesta"/>
    <Formik
      initialValues={{name: 'Nueva cesta'}}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	 fetch('cesta', {
        			headers: {
        				"Content-Type": "application/json",
        				'Authorization' : 'Bearer ' + localStorage.getItem('auth')
        			},
        			method:'POST',
        			body:JSON.stringify(values, null, 2)
        	}).then((response)=> {
        		setSubmitting=false;
        		localStorage.removeItem('cestasCheck');
        		this.cestasCheck();


        	})


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
        <div className="grid-form-cesta">

        	<label htmlFor="name" className="label-cesta-create">Nombre </label>
          <input
          id="name"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          	className="name-input-cesta"
          	required
          />

          {errors.name && touched.name}
          <div className="grid2-create-cesta">
          <button type="submit" disabled={isSubmitting} className="submit-cesta-create link-button">
          Enviar
          </button>
          </div>
          </div>
        </form>

      )}
    </Formik>
  </div>
 </div>
);}
}
export default withRouter(formCesta);

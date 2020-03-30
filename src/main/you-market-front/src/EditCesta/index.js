import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import cest from './cesta2.png';
import { Formik } from 'formik';
import {Button} from 'primereact/button';
import Header from '../Header';
import { Redirect } from 'react-router-dom';
import {
	  withRouter
	} from 'react-router-dom';

class formCesta extends React.Component{
	const [cesta, setCesta] = useState();
	const { id } = useParams();
	
	const fetchCesta = useCallback(() => {
	    return fetch(`../../../cesta/${id}`, {headers:{
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(cesta => {
	        setCesta(cesta)
	       
	      });
	  }, []);

	
	useEffect(() => {
	    fetchCesta(cesta);
	  }, []);
	
	handleRedirect = () => {
		console.log(this.props.history);
	      this.props.history.push('/cesta');
	    }
	render(){
		return(<div>
  <Header/>
  <div>
    <h1 className="titulo-create-cesta">Editar cesta</h1>
    <img src={cest} className="cesta-imagen-edit"/>
    <Formik
      initialValues={{name: {cesta.id}}}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch(`/cesta/${id}`, {
        			headers: {
        				"Content-Type": "application/json",
        				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
        			},
        			method:'PUT',
        			body:JSON.stringify(values, null, 2)
        	}).then((response)=> {
        		setSubmitting=false;
        		
        	  
        	}).then(() =>
        	{this.handleRedirect();}
            )
        			
        	  
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
          <button type="submit" disabled={isSubmitting} className="submit-cesta-create">
          Enviar
          </button>
          </div>
          </div>
        </form>

      )}
    </Formik>
    
    <Formik
    initialValues={{name: {cesta.id}}}

    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
      	fetch(`/cesta/${id}`, {
      			headers: {
      				"Content-Type": "application/json",
      				'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
      			},
      			method:'PUT',
      			body:JSON.stringify(values, null, 2)
      	}).then((response)=> {
      		setSubmitting=false;
      		
      	  
      	}).then(() =>
      	{this.handleRedirect();}
          )
      			
      	  
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
    
        <input
        id="id"
          type="hidden"
          name="id"
          onChange={handleChange}
          onBlur={handleBlur}
          value={id}
        	className="id-input-cesta"
        />

        <div className="grid2-create-cesta">
        <button type="submit" disabled={isSubmitting} className="submit-cesta-delete">
        Borrar
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
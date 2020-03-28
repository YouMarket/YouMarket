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
	handleRedirect = () => {
		console.log(this.props.history);
	      this.props.history.push('/cesta');
	    }
	render(){
		return(<div>
  <Header/>
  <div>
    <h1 className="titulo-create-cesta">Crear cesta</h1>
    <img src={cest} className="cesta-imagen-edit"/>
    <Formik
      initialValues={{ usuario: '1', name: 'nuevaCesta', productos:'' }}
      validate={values => {
        const errors = {};
        if (!values.usuario) {
          errors.usuario = 'Required';
        } else if (
          !/^[0-9]{1,}$/i.test(values.usuario)
        ) {
          errors.usuario = 'Invalid usuario';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch('../../cesta', {
        			headers: {
        				"Content-Type": "application/json"
        			},
        			method:'POST',
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
        <div className="grid">
        <input
            type="hidden"
            name="usuario.id"
            id="user"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.usuario}
          />
           
        {errors.usuario && touched.usuario}
        	<span className="p-float-label">
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
          </span>
          <input
          type="hidden"
          name="productos"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.productos}
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
  </div>
 </div>
);}
}
export default withRouter(formCesta);
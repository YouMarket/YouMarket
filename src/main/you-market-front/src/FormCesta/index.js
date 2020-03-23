import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import style from './styles.css';
import cest from './cesta2.png';
import { Formik } from 'formik';
import {InputText} from 'primereact/inputtext';


const formCesta = () => (
  <div className="titulo">
    <h1>Crear cesta</h1>
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
        	fetch('cesta', {
        			headers: {
        				"Content-Type": "application/json"
        			},
        			method:'POST',
        			body:JSON.stringify(values, null, 2)
        	}).then(function(response) {
        	    return console.log(response.json());
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
        <div className="grid">
          Usuario: <input
            type="number"
            name="usuario.id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.usuario}
          />
          {errors.usuario && touched.usuario}
        	<div className="grid">
          name: <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <hidden
          type="text"
          name="productos"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.productos}
          />
          {errors.name && touched.name}
        		<div className="grid">
          <button type="submit" disabled={isSubmitting}>
          Submit
          </button>
          		</div>
          	</div>
          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default formCesta;
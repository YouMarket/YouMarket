import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';



const PedidoForm = () => (
  <div >
    <h1>Crear pedido</h1>
    <Formik
      initialValues={{   }}
      validate={values => {
        const errors = {};
        if (!values.direccion) {
          errors.direccion = 'Required';
        } 
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch('pedido', {
        			headers: {
        				"Content-Type": "application/json"
        			},
        			method:'POST',
        			body:JSON.stringify(values, null, 7)
        	}).then(function(response) {
        	    return console.log(response.json());
        	  })
          alert(JSON.stringify(values, null, 7));
          
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
        
		Dirección: <input
		type="text"
		name="direccion"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.direccion}
		/>
		{errors.direccion && touched.direccion}
		<br/><br/>
          
		Fecha y hora del envío: <input
		type="text"
		name="fechaHoraEnvio"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.fechaHoraEnvio}
		/>
		{errors.fechaHoraEnvio && touched.fechaHoraEnvio}
		<br/><br/>
          
		
        		<div className="grid">
          <button type="submit" disabled={isSubmitting}>
          Submit
          </button>

          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default PedidoForm;
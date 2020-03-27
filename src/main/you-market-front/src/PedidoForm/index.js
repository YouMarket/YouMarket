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
        	fetch('', {
        			headers: {
        				"Content-Type": "application/json"
        			},
        			method:'POST',
        			body:JSON.stringify(values, null, 5)
        	}).then(function(response) {
        	    return console.log(response.json());
        	  })
          alert(JSON.stringify(values, null, 5));
          
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
          
		Fecha del envío: <input
		type="text"
		name="fechaEnvio"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.fechaEnvio}
		/>
		{errors.fechaEnvio && touched.fechaEnvio}
		<br/><br/>
		
		Hora del envío: <input
		type="text"
		name="horaEnvio"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.horaEnvio}
		/>
		{errors.horaEnvio && touched.horaEnvio}
		<br/><br/>
		
         <div className="grid">
         <button type="submit" disabled={isSubmitting}>
         	Enviar
         </button>

          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default PedidoForm;
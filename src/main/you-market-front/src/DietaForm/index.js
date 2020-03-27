import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';


function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

const DietaForm = () => (
  <div >
    <h1>Crear dieta</h1>
    <Formik
      initialValues={{   }}
      validate={values => {
        const errors = {};
        if (!values.nombre) {
          errors.nombre = 'Required';
        } 
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch('dieta', {
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
        
		Tipo: <input
		type="text"
		name="tipo"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.tipo}
        validate={validateEmail}
		/>
		{errors.tipo && touched.tipo}
		<br/><br/>
          
		Nombre: <input
		type="text"
		name="nombre"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.nombre}
		/>
		{errors.nombre && touched.nombre}
		<br/><br/>
          
		Descripción: <input
		type="text"
		name="descripcion"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.descripcion}
		/>
		{errors.descripcion && touched.descripcion}
		<br/><br/>
		
		Activa:  
		<select
		name="activa"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.activa}>
	        <option value="true">Sí</option>
	        <option value="false">No</option>
        </select>
        {errors.activa && touched.activa}
        <br/><br/>
		
		Enlace de la imagen: <input
		type="text"
		name="url_imagen"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.url_imagen}
		/>
		{errors.url_imagen && touched.url_imagen}
		<br/><br/>		
        
        <hidden
	        type="text"
	        name="productos"
	        onChange={handleChange}
	        onBlur={handleBlur}
	        value={values.productos}
	        />
	        
        <hidden
	        type="text"
	        name="productos"
	        onChange={handleChange}
	        onBlur={handleBlur}
	        value={values.recetas}
	        />
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

export default DietaForm;
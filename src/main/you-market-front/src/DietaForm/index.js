import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { withRouter	} from 'react-router-dom';
import Header from '../Header';


class DietaForm extends React.Component{
		
	handleRedirect = () => {
		console.log(this.props.history);
		this.props.history.push('../../dieta/show/id');
	}
	
	render() {
		return(
	
		<div >
			<h1>Crear dieta</h1>
			<Formik
			initialValues={{   }}
			validate={values => {
			const errors = {};
				if (!values.tipo) {
		        	errors.tipo = 'Campo obligatorio';
		        } 
				if (!values.descripcion) {
		        	errors.descripcion = 'Campo obligatorio';
		        }
				if (!values.nombre) {
		        	errors.nombre = 'Campo obligatorio';
		        }
				if (!values.url_imagen) {
		        	errors.url_imagen = 'Campo obligatorio';
		        }
		        
			return errors;
			}}
			
		onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        	fetch('dieta', {
        			headers: {
        				"Content-Type": "application/json",
        				'Accept' : 'application/json',
        				'Authorization' : 'Bearer ' + localStorage.getItem('auth'),
        			    method:'POST'},
        			    body:JSON.stringify(values, null, 2)
        	,
        	}).then(function(response) {
        	    return console.log(response.json());
        	}).then(() => 
       	 		{
       	 			this.handleRedirect();
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
        
		<label for="tipo"> Tipo*: </label>
        <input
        id="tipo"
		type="text"
		name="tipo"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.tipo}
		/>
		{errors.tipo}
		<br/><br/>
          
		<label for="nombre"> Nombre*: </label>
		<input
		id="nombre"
		type="text"
		name="nombre"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.nombre}
		/>
		{errors.nombre}
		<br/><br/>
          
		<label for="descripcion"> Descripción*: </label>
		<input
		id="descripcion"
		type="text"
		name="descripcion"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.descripcion}
		/>
		{errors.descripcion}
		<br/><br/>
		
		<label for="activa"> Activa*: </label>
		<select
		id="activa"
		name="activa"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.activa}>
	        <option value="true">Sí</option>
	        <option value="false">No</option>
        </select>
        {errors.activa}
        <br/><br/>
		
		<label for="url_imagen"> Enlace de la imagen*: </label>
        <input
        id="url_imagen"
		type="text"
		name="url_imagen"
		onChange={handleChange}
		onBlur={handleBlur}
		value={values.url_imagen}
        pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
		/>
		{errors.url_imagen}
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
          Guardar
          </button>

          </div>
        </form>
      )}
    </Formik>
  </div>
);}
}	
export default withRouter(DietaForm);
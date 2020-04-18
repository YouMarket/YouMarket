import React,  { useCallback, useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import cestaEdit from './cesta.png';
import Header from '../Header';
import { Formik } from 'formik';
import './styles.css'
import { useHistory } from "react-router-dom";

function EditCesta() {
const [cesta, setCesta] = useState();

let history = useHistory();
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

if (!cesta){
	return null;
}

if (localStorage.getItem('auth')==null){
	history.push('/login');
}
  return(
    <div>
      <Header/>

      <div class="container">
      <h1 className="titulo-create-cesta">Editar cesta</h1>
      <img src={cestaEdit} className="cesta-imagen-edit"/>
      <Formik
        initialValues={{nombre: `${cesta.nombre}`}}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            fetch(`../../cesta/${id}`, {
                headers: {
                  "Content-Type": "application/json"
                },
                method:'PUT',
                body:JSON.stringify(values, null, 2)
            }).then((response)=> {
              setSubmitting=false;

            }).then(() =>
            {history.push("/cesta");}
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

            <label htmlFor="nombre" className="label-cesta-create">Nombre </label>
            <input
            id="nombre"
              type="text"
              name="nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nombre}
              className="name-input-cesta"
              required
            />
            
            <div className="grid2-create-cesta">
            <button type="submit" disabled={isSubmitting} className="submit-cesta-create link-button">
            Enviar
            </button>
            </div>
            </div>
          </form>

        )}
      </Formik>
      
      <Formik
      initialValues={{id}}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          fetch(`/cesta/${id}`, {
              headers: {
                "Content-Type": "application/json"
              },
              method:'DELETE'
          }).then((response)=> {
            setSubmitting=false;

          }).then(() =>
          {history.push("/cesta");}
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

          <div className="grid2-delete-cesta">
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
 );
}
export default EditCesta;

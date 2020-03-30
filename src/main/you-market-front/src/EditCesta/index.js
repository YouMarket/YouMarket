import React,  { useFetch, useCallback, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import cest from './cesta.png';
import style from './styles.css';
import Cesta from '../Cesta';
import Header from '../Header';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
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
	console.log(cesta);

if (!cesta){
	return null;
}
  return(
<div>
  <Header/>

  <h1 className="titulo-create-cesta">Editar cesta</h1>
  <img src={cest} className="cesta-imagen-edit"/>
  <Formik
    initialValues={{name: `${cesta.nombre}`}}

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

	           
	  </div>
 );
}
export default EditCesta;

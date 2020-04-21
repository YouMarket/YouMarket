import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import {Card} from 'primereact/card';
import { Formik } from 'formik';

function PerfilForm() {
const [usuario, setUsuario] = useState();
    let history = useHistory();
	
 const fetchUsuario = useCallback(() => {
	    return  fetch('/usuario/userPerfil', {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(usuario1 => {
	    	  setUsuario(usuario1)

	      });
	  }, []);
 
const [direccion, setDireccion] = useState();
	
const fetchUsuario2 = useCallback(() => {
	    return  fetch('/usuario/direccion', {headers: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
		'Authorization' : 'Bearer ' + localStorage.getItem('auth')},
		method:'GET'})
	      .then(res => res.json())
	      .then(direccion1 => {
	    	  setDireccion(direccion1)

	      });
	  }, []);


	useEffect(() => {
		fetchUsuario(usuario);
	    fetchUsuario2(direccion);
	  }, []);

if (!usuario||!direccion){
	return null;
}

if (localStorage.getItem('auth')==null){
	history.push('/404');
}

    return (
        <div>
            <Header />
            <Navegacion />
            
            <Formik validateOnBlur={false} validateOnChange={false}
						initialValues={{  
							usuario: {
								nombre: `${usuario.nombre}`,
								apellidos: `${usuario.apellidos}`, 
								telefono: `${usuario.telefono}`,
								email: `${usuario.email}`
							},
							dir: {
								direccion: `${direccion.direccion}`,
								poblacion: `${direccion.poblacion}`,
								provincia: `${direccion.provincia}`,
								cpostal: `${direccion.cpostal}`
							}
						}}
            validate={values => {
				const errors={};
				if (!values.usuario.nombre) {
					errors.nombre='El usuario es obligatorio';
				}else if(values.usuario.nombre.includes("1")||
						values.usuario.nombre.includes("2")||
						values.usuario.nombre.includes("3")||
						values.usuario.nombre.includes("4")||
						values.usuario.nombre.includes("5")||
						values.usuario.nombre.includes("6")||
						values.usuario.nombre.includes("7")||
						values.usuario.nombre.includes("8")||
						values.usuario.nombre.includes("9")){
					errors.nombre='No se permiten números';
				}
				if (!values.usuario.apellidos) {
					errors.apellidos='El apellido es obligatorio';
				}else if(values.usuario.apellidos.includes("1")||
						values.usuario.apellidos.includes("2")||
						values.usuario.apellidos.includes("3")||
						values.usuario.apellidos.includes("4")||
						values.usuario.apellidos.includes("5")||
						values.usuario.apellidos.includes("6")||
						values.usuario.apellidos.includes("7")||
						values.usuario.apellidos.includes("8")||
						values.usuario.apellidos.includes("9")){
					errors.apellidos='No se permiten números';
				}

				if (!values.usuario.telefono || !/[0-9]{9}/.test(values.usuario.telefono)) {
					errors.telefono='El teléfono es obligatorio';
				}else if(values.usuario.telefono.toString().length!==9){
					errors.telefono='Tiene que seguir el formato español sin incluir el prefijo (+34)';
				}
				if(!values.usuario.email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.usuario.email)){
					errors.email='Debe introducir un email válido' 
				}
				if (!values.dir.direccion) {
					errors.direccion='La dirección es obligatoria';
				}
				if (!values.dir.provincia || values.dir.provincia==="") {
					errors.provincia='La provincia es obligatoria';
				}else if(values.dir.provincia.includes("1")||
						values.dir.provincia.includes("2")||
						values.dir.provincia.includes("3")||
						values.dir.provincia.includes("4")||
						values.dir.provincia.includes("5")||
						values.dir.provincia.includes("6")||
						values.dir.provincia.includes("7")||
						values.dir.provincia.includes("8")||
						values.dir.provincia.includes("9")){
					errors.provincia='No se permiten números';
				}
				if (!values.dir.poblacion) {
					errors.poblacion='La población es obligatoria';
				}else if(values.dir.poblacion.includes("1")||
						values.dir.poblacion.includes("2")||
						values.dir.poblacion.includes("3")||
						values.dir.poblacion.includes("4")||
						values.dir.poblacion.includes("5")||
						values.dir.poblacion.includes("6")||
						values.dir.poblacion.includes("7")||
						values.dir.poblacion.includes("8")||
						values.dir.poblacion.includes("9")){
					errors.poblacion='No se permiten números';
				}
				if (!values.dir.cpostal || !/[0-9]{5}/.test(values.dir.cpostal)||values.dir.cpostal.toString().length!==5) {
					errors.cpostal='El código postal es obligatorio y debe tener 5 dígitos';
				}
				return errors;
			}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								 fetch('../../../usuario/updatePerfil', {headers: {
                                            'Content-Type' : 'application/json',
                                            'Accept' : 'application/json',
                                            'Authorization' : 'Bearer ' + localStorage.getItem('auth')
										},
										method:'PUT',
										body:JSON.stringify(values, null, 2)
								}).then(response => response.json())
										.then(data => {
									if (data.success) {
										history.push('/datos-perfil');
									  }
								  });
							
							setSubmitting(false);
							}, 400);
						}}
						>
						{({
							values,
							errors,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
							/* and other goodies */
						}) => (
							<div className="registro-container">
							<form onSubmit={handleSubmit}>
							<Card title="Editar perfil" subTitle="Cambie los datos que desee modificar" style={{ margin: 20 }}>

							<div className="row">
								<span className="span">
									<label htmlFor="nomIn" className="registro-label">Nombre: </label>
									<input
										className="registro-input"
										type="text"
										name="usuario.nombre"
										id="nombreIn"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.usuario.nombre}
									/>
									<small className="error">{errors.nombre}</small>
								</span>
							</div>
							<div className="row">
								<span  className="span"> 
									<label className="registro-label" htmlFor="apellidosIn">Apellidos: </label>
									<input
										className="registro-input"
										type="text"
										name="usuario.apellidos"
										id="apellidosIn"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.usuario.apellidos}
									/>
									<small className="error">{errors.apellidos}</small>
									
								</span>
							</div>
							<div className="row">
								<span  className="span">
									<label className="registro-label" htmlFor="telefono" >Teléfono: </label>
									
									<input
										className="registro-input"
										type="text"
										name="usuario.telefono"
										id="telefono"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.usuario.telefono}
									/>
									<small className="error">{errors.telefono}</small>
								</span> 
							</div>
					
							<div className="row">
								<span  className="span">
									<label className="registro-label" htmlFor="email" >Email </label>
									<input
										className="registro-input"
										type="text"
										name="usuario.email"
										id="email"
										autoComplete="new-password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.usuario.email}
									/>
									<small className="error">{errors.email}</small>
								</span> 
							</div>
						</Card>

						<Card title="Dirección del usuario" subTitle="Todos los datos son obligatorios" style={{margin: 20}}> 
							<div className="row">
								<span  className="span">
									<label className="registro-label" htmlFor="direccion">Dirección completa:</label>
									<input
										className="registro-input"
										type="text"
										name="dir.direccion"
										id="direccion"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.dir.direccion}
									/>
									<small className="error">{errors.direccion}</small>
								</span> 
							</div>
							<div className="row">
								<span  className="span">
									<label className="registro-label" htmlFor="poblacion" >Municipio: </label>
									<input
										className="registro-input"
										type="text"
										name="dir.poblacion"
										id="poblacion"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.dir.poblacion}
									/>
									<small className="error">{errors.poblacion}</small>
								</span> 
							</div>
							<div className="row">
								<span  className="span">
									<label className="registro-label" htmlFor="provincia"  >Provincia </label>
									<input
										className="registro-input"
										type="text"
										name="dir.provincia"
										id="provincia"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.dir.provincia}
									/>
									<small className="error">{errors.provincia}</small>
								</span> 
							</div>
							<div className="row">
								<span  className="span">
									<label className="registro-label" htmlFor="cpostal" >Código postal </label>
									<input
										className="registro-input"
										type="text"
										name="dir.cpostal"
										id="cpostal"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.dir.cpostal}
									/>
									<small className="error">{errors.cpostal}</small>
								</span> 
							</div>
						</Card>
							
                              <a href="#"><button type="submit" className="boton" disabled={isSubmitting}>
                                    Enviar
                                </button></a>
							
						    </form>
							</div>
						)}
					</Formik>
        </div>
    );
}
export default PerfilForm;

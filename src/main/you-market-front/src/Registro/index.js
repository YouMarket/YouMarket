import React, { useFetch, useCallback, useState, useEffect, Component } from 'react';
import './styles.css';
import Header from '../Header';
import {Card} from 'primereact/card';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ListaSuscripciones from './suscripciones';


class RegistroUsuario extends React.Component{
	constructor(props) {
		super(props);
		this.state = { errors: "" };

	}

	handleRedirect = () => {
			this.props.history.push('/login');
	}

  	render(){
		

		return (
			<div>	  
				<Header/>
				
				<div className="registro-container">
			
					{this.state.errors}
					<Formik
						initialValues={{  
							usuario: {
								nombre: '',
								apellidos: '',
								dni: '', 
								fechaNacimiento: '', 
								telefono: '',
								email: '',
								cpostal: '',
								password: '',
								suscripcion: {
									id: 1
								}
							},
							dir: {
								direccion: '',
								poblacion: '',
								provincia: '',
								cpostal: ''
							}
						}}
						validate={values => {
							const errors = {};
							if (!values.usuario.nombre) {
								errors.usuario = 'El usuario es obligatorio';
							}
							if (!values.usuario.apellidos) {
								errors.apellidos = 'El apellido es obligatorio';
							}
							if (!values.usuario.dni || !/[0-9]{8}[A-Z]{1}/.test(values.usuario.dni)) {
								errors.dni = 'El dni es obligatorio';
							}
							if (!values.usuario.telefono || !/[0-9]*/.test(values.usuario.telefono)) {
								errors.telefono = 'El teléfono es obligatorio';
							}
							if(!values.usuario.email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.usuario.email)){
								errors.email = 'Debe introducir un email válido' 
							}
							if(!values.usuario.fechaNacimiento || !/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(values.usuario.fechaNacimiento)){
								errors.fechaNacimiento = 'Debe introducir una fecha con formato Año - mes - dia' 
							}
							if(!values.usuario.password || !/^[a-zA-Z0-9]{6,20}$/.test(values.usuario.password)){
								errors.password = 'La contraseña debe tener mínimo de 6 carácteres y pede contener letras y números' 
							}
							if (!values.dir.direccion) {
								errors.direccion = 'La dirección es obligatoria';
							}
							if (!values.dir.provincia) {
								errors.provincia = 'La provincia es obligatoria';
							}
							if (!values.dir.poblacion) {
								errors.poblacion = 'La población es obligatoria';
							}
							if (!values.dir.cpostal || !/[0-9]{5}/.test(values.dir.cpostal)) {
								errors.cpostal = 'El código postal es obligatorio y debe tener 5 dígitos';
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							values.usuario.cpostal = values.dir.cpostal
							values.usuario.suscripcion.id = document.getElementById('selectSuscripciones').value
							setTimeout(() => {
								fetch('../usuario/signUpAll', {
										headers: {
											"Content-Type": "application/json"
										},
										method:'POST',
										body:JSON.stringify(values, null, 1)
								}).then(response => response.json())
								  .then(data => {
									
									console.log(data)
									if (data.success) {
										console.log(data)
										localStorage.registroOK = 'Registrado correctamente, inicie sesión para empezar a comprar.'
										{this.handleRedirect();}
									  }
									else{
										this.state.errors = data.message
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
							<form onSubmit={handleSubmit}>
								
							<Card title="Datos del usuario" subTitle="Todos los datos son obligatorios" style={{margin: 20}}>
								<small className="error">{this.state.errors}</small>
								<div className="row">
									<span className="p-float-label" className="span">
										<label htmlFor="nomIn" className="label">Nombre: </label>
										<input
											className="input"
											type="text"
											name="usuario.nombre"
											id="nombreIn"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.usuario.nombre}
										/>
										<small className="error">{errors.usuario}</small>
									</span>
								</div>
								<div className="row">
									<span  className="p-float-label" className="span"> 
										<label className="label" htmlFor="apellidosIn">Apellidos: </label>
										<input
											className="input"
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
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="dniIn">DNI: </label>
										<input
											className="input"
											type="text"
											name="usuario.dni"
											id="dniIn"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.usuario.dni}
										/>
										<small className="error">{errors.dni}</small>
									</span>
								</div>
								<div className="row">
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="nacimientoIn">Fecha de nacimiento</label>
										<input
											className="input"
											type="text"
											name="usuario.fechaNacimiento"
											id="nacimientoIn"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.usuario.fechaNacimiento}
										/>
										<small className="error">{errors.fechaNacimiento}</small>
									</span>
								</div>
								<div className="row">
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="telefono" >Teléfono: </label>
										
										<input
											className="input"
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
									<span  className="p-float-label" className="span">
									<label className="label" >Tipo de suscripción: </label>
										<ListaSuscripciones>
					
										</ListaSuscripciones>
									</span>

								</div>
						
								<div className="row">
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="email" >Email </label>
										<input
											className="input"
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
								<div className="row">
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="passwordIn">Contraseña: </label>
										<input
											className="input"
											type="password"
											name="usuario.password"
											id="passwordIn"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.usuario.password}
										/>
										<small className="error">{errors.password}</small>
									</span>
								</div>

								
							</Card>

							<Card title="Dirección del usuario" subTitle="Todos los datos son obligatorios" style={{margin: 20}}> 
								<div className="row">
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="direccion">Dirección completa:</label>
										<input
											className="input"
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
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="poblacion" >Municipio: </label>
										<input
											className="input"
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
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="provincia"  >Provincia </label>
										<input
											className="input"
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
									<span  className="p-float-label" className="span">
										<label className="label" htmlFor="cpostal" >Código postal </label>
										<input
											className="input"
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

							
							<div className="row">
							<button type="submit" className="boton" disabled={isSubmitting}>
								Enviar
							</button>
							
							</div>
						</form>
						)}
					</Formik>
				</div>
			</div>
		)
 	}
}export default withRouter(RegistroUsuario);
import React  from 'react';
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
		this.state={ errors: "" };

	}

	handleRedirect=() => {
			this.props.history.push('/login');
	}

  	render(){
  		var today = new Date();
  		var year= today.getFullYear();
  		today.setFullYear(year-18);
		return (
			<div>	  
				<Header/>
				
				<div className="registro-container">
			
					{this.state.errors}
					<Formik validateOnChange={false} validateOnBlur={false}
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
							const errors={};
							if (!values.usuario.nombre) {
								errors.usuario='El usuario es obligatorio';
							}else if(values.usuario.nombre.includes("1")||
									values.usuario.nombre.includes("2")||
									values.usuario.nombre.includes("3")||
									values.usuario.nombre.includes("4")||
									values.usuario.nombre.includes("5")||
									values.usuario.nombre.includes("6")||
									values.usuario.nombre.includes("7")||
									values.usuario.nombre.includes("8")||
									values.usuario.nombre.includes("9")){
								errors.usuario='No se permiten números';
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
							if (!values.usuario.dni || !/[0-9]{8}[A-Z]{1}/.test(values.usuario.dni)|| values.usuario.dni.toString().length!==9) {
								errors.dni='El dni es obligatorio y tiene que respetar el formato 12345678A';
							}
							if (!values.usuario.telefono || !/[0-9]{9}/.test(values.usuario.telefono)) {
								errors.telefono='El teléfono es obligatorio';
								if(values.usuario.telefono.toString().length!==9){
									errors.telefono='Tiene que seguir el formato español sin incluir el prefijo (+34)';
								}
							}else if(values.usuario.telefono.toString().length!==9){
								errors.telefono='Tiene que seguir el formato español sin incluir el prefijo (+34)';
							}
							if(!values.usuario.email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.usuario.email)){
								errors.email='Debe introducir un email válido' 
							}
							if(!values.usuario.fechaNacimiento || !/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(values.usuario.fechaNacimiento)){
								errors.fechaNacimiento='Debe introducir una fecha con formato Año - mes - dia' 
							}else if(new Date(values.usuario.fechaNacimiento)>today){
								errors.fechaNacimiento='Tienes que ser mayor de edad';
							}
							if(!values.usuario.password || !/^[a-zA-Z0-9]{6,20}$/.test(values.usuario.password)){
								errors.password='La contraseña debe tener mínimo de 6 carácteres y puede contener letras y números' 
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
							values.usuario.cpostal = values.dir.cpostal
							values.usuario.suscripcion.id = document.getElementById('selectSuscripciones').value
							setTimeout(() => {
								fetch('https://youmarket-entrega2.herokuapp.com/usuario/signUpAll', {
										headers: {
											"Content-Type": "application/json"
										},
										method:'POST',
										body:JSON.stringify(values, null, 1)
								}).then(response => response.json())
								  .then(data => {
									
									if (data.success) {
										localStorage.registroOK='Registrado correctamente, inicie sesión para empezar a comprar.'
										this.handleRedirect();
									  }
									else{
										this.setState({errors:data.message});
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
									<span className="span">
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
									<span  className="span"> 
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
									<span  className="span">
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
									<span  className="span">
										<label className="label" htmlFor="nacimientoIn">Fecha de nacimiento</label>
										<input
											className="input"
											type="date"
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
									<span  className="span">
										<label className="label" htmlFor="telefono" >Teléfono: </label>
										
										<input
											className="input"
											type="number"
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
									<label className="label" >Tipo de suscripción: </label>
										<ListaSuscripciones>
					
										</ListaSuscripciones>
									</span>

								</div>
						
								<div className="row">
									<span  className="span">
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
									<span  className="span">
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
									<span  className="span">
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
									<span  className="span">
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
									<span  className="span">
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
									<span  className="span">
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
							
							
							<input
							id="terms"
							type="checkbox"
							onChange={handleChange}
							onBlur={handleBlur}
							text="Debe aceptar los terminos y condiciones"
							required
							/>
							<label htmlFor="terms"> He leido y acepto los <a href="/terminosycondiciones"> terminos y condiciones </a> </label>

							<br/><br/>
							
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
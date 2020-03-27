import React, { Component, useState } from 'react';
import './styles.css';
import Header from '../Header';
import {InputText} from 'primereact/inputtext';
import  {withFormik, Form, Field, ErrorMessage}  from 'formik';
import {Card} from 'primereact/card';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { render } from 'react-dom';


export default class RegistroUsuario extends React.Component{

	constructor (props){

		super(props);
		this.state = {
			nombre: '',
			apellidos: '',
			dni: '', 
			fechaNacimiento: '', 
			telefono: '',
			email: '',
			password: ''
		}

	}

	handleSubmit = (e) => {
	
		console.log(e.target)
		

	}

	handleChange = (e) => {
		this.setState({ inputTerms: e.target.checked })
		console.log(e.target.checked)
	}
	

  	render(){
		return (
			<div>	  
			<Header/>
			<div className="registro-container">
			
				<form onSubmit={this.handleSubmit}>
					<Card title="Datos del usuario">
							<div className="row">
								Nombre: 
								<input
									type="text"
									name="nombre"
									value={this.state.nombre}
									onChange={e => this.setState({ nombre: e.target.value })}
									required
								/>
							</div>
							<div className="row">
								<span className="p-float-label">
									<InputText 
										id="in"
										value={this.state.apellidos} 
										onChange={(e) => this.setState({apellidos: e.target.value})} 
										required
									/>
									<label htmlFor="in">Apellidos: </label>
								</span>
							</div>
							<div className="row">
								DNI: 
								<input
									type="text"
									name="dni"
									value={this.state.dni}
									onChange={this.handleChange}
									
								/>
							</div>
							<div className="row">
								Fecha de nacimiento: 
								<input
									type="text"
									name="fechaNacimiento"
									value={this.state.fechaNacimiento}
									onChange={this.handleChange}
									
								/>
							</div>
							<div className="row">
								Teléfono:
								<input
									type="text"
									name="telefono"
									value={this.state.telefono}
									onChange={this.handleChange}
									
								/>
							</div>


							<div className="row">
								Email:
								<input
									type="email"
									name="email"
									placeholder="Email"
									value={this.state.email}
									onChange={this.handleChange}
									
								/>
							</div>
							<div className="row">
								Password:
								<input
									type="password"
									name="password"
									placeholder="Password"
									value={this.state.password}
									onChange={this.handleChange}
									
								/>
							</div>

							
						</Card>

						<Card title="Método de pago" className="tarjeta">


						</Card>

						<div className="row">
							<button>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		)
 	}
}
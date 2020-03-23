package com.youmarket.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="nombre", length=100)
	private String nombre;
	
	@Column(name="apellidos", length=150)
	private String apellidos;
	
	@Column(name="dni", length=20)
	private String dni;
	
	@Column(name="fecha_nacimiento")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaNacimiento;
	
	@Column(name="subscripcion", length=20)
	private String subscripcion;
	
	@Column(name="c_postal", length = 5)
	private String cPostal;
	
	@Column(name="rol", length = 10)
	private String rol;
	
	private String email;
	
	private String password;
	
	@Column(name="telefono", length=20)
	private String telefono;
	
	
}

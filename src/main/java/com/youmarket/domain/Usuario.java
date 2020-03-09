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

@Entity
public class Usuario {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="nombre", length=100)
	private String name;
	
	@Column(name="apellidos", length=150)
	private String apellidos;
	
	@Column(name="dni", length=20)
	private String dni;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaNacimiento;
	
	@Column(name="subscripcion", length=20)
	private String subscripcion;
	
	@Column(name="c_postal", length = 5)
	private String cPostal;
	
	@Column(name="rol", length = 10)
	private String rol;
	
	@OneToMany
	@NotNull
	private List<Direccion> direcciones;
	
	@OneToMany
	private List<Pago> pagos;
	
	@OneToMany
	private List<Factura> facturas;
	
	public Usuario() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getSubscripcion() {
		return subscripcion;
	}

	public void setSubscripcion(String subscripcion) {
		this.subscripcion = subscripcion;
	}

	public String getcPostal() {
		return cPostal;
	}

	public void setcPostal(String cPostal) {
		this.cPostal = cPostal;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}
}

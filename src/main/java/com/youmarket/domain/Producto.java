package com.youmarket.domain;
import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Positive;


@Entity
public class Producto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="nombre", length=50)
	private String name;
	
	@Positive
	private double precio;
	
	@Positive
	private double precioIva;
	
	@Column(name="descripcion", length = 255)
	private String descripcion;
	
	@Positive
	private double peso;

	public Producto() {
		
	}
	
	

	public Producto(int id, String name, @Positive double precio) {
		super();
		this.id = id;
		this.name = name;
		this.precio = precio;
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

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}



	public double getPrecioIva() {
		return precioIva;
	}



	public void setPrecioIva(double precioIva) {
		this.precioIva = precioIva;
	}



	public String getDescripcion() {
		return descripcion;
	}



	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}



	public double getPeso() {
		return peso;
	}



	public void setPeso(double peso) {
		this.peso = peso;
	}
	
	
}

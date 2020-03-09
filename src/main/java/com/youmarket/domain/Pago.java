package com.youmarket.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pago {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="numero", length=20)
	private String numero;
	
	@Column(name="titular", length=150)
	private String titular;
	
	@Column(name="cvv", length=3)
	private String cvv;
	
	@Column(name="caducidad", length=10)
	private String caducidad;
	
	public Pago() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getTitular() {
		return titular;
	}

	public void setTitular(String titular) {
		this.titular = titular;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	public String getCaducidad() {
		return caducidad;
	}

	public void setCaducidad(String caducidad) {
		this.caducidad = caducidad;
	}
}

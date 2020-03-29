package com.youmarket.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;

import com.youmarket.domain.enums.TipoPago;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
	
	@Column(name="tipo")
	private TipoPago tipoPago;
	
	@Column(name="paypal")
	private String emailPaypal;

	@Column(nullable = false)
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean principal;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="usuario_id")
	private Usuario usuario;
	
}

package com.youmarket.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.CreditCardNumber;
import org.hibernate.validator.constraints.SafeHtml;

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
	
	@NotBlank
	@SafeHtml
	@CreditCardNumber
	@Column(name="numero", length=20)
	private String numero;
	
	@NotBlank
	@SafeHtml
	@Column(name="titular", length=150)
	private String titular;
	
	@NotBlank
	@SafeHtml
	@Pattern(regexp = "\\b\\d{3}\\b")
	@Column(name="cvv", length=3)
	private String cvv;
	
	@NotBlank
	@SafeHtml
	@Pattern(regexp = "(0[1-9]|1[0-2])\\/[0-9]{2}")
	@Column(name="caducidad", length=10)
	private String caducidad;

	
	@Column(nullable = false)
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean principal;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="usuario_id")
	private Usuario usuario;
	
}

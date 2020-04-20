package com.youmarket.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.SafeHtml;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Supermercado {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@NotBlank
	@SafeHtml
	@Column(name="nombre", length=50)
	private String nombre;
	
	@NotBlank
	@SafeHtml
	@Column(name="descripcion", length = 250)
	private String descripcion;
	
	@NotBlank
	@SafeHtml
	@Pattern(regexp ="\\b\\d{5}\\b")
	@Column(name="c_postal", length = 5)
	private String cPostal;
	
	@NotBlank
	@SafeHtml
	@Column(name="intolerancia", length = 250)
	private String intolerancia;

	
}

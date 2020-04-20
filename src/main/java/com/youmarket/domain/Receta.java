package com.youmarket.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Entity
public class Receta {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@URL
	@SafeHtml
	private String url_imagen;

	@NotBlank
	@SafeHtml
	private String nombre;

	@NotBlank
	@SafeHtml
	private String descripcion;

	@Positive
	@NotNull
	private Integer personas;

	@Positive
	@NotNull
	private Integer tiempo;
	
	@Positive
	@NotNull
	private Integer calorias;

}

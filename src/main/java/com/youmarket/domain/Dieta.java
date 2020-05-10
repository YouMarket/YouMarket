package com.youmarket.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Dieta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank
	@SafeHtml
	private String tipo;

	private Boolean activa;

	@URL
	@SafeHtml
	private String url_imagen;

	@NotBlank
	@SafeHtml
	private String descripcion;

	@NotBlank
	@SafeHtml
	private String nombre;

	@ManyToMany
	private List<Producto> productos;

	@ManyToMany
	private List<Receta> recetas;

}

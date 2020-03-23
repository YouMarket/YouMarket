package com.youmarket.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Entity
public class Dieta {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String tipo;
	
	private Boolean activa;
	
	private String url_imagen;
	
	private String descripcion;
	
	private String nombre;
	
	@ManyToMany
	private List<Producto> productos;
	
	@ManyToMany
	private List<Receta> recetas;
	
	
}

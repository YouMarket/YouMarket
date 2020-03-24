package com.youmarket.domain;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Producto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="nombre", length=50)
	private String nombre;
	
	@Positive
	private double precio;
	
	@Positive
	private double precioIva;
	
	@Column(name="descripcion", length = 255)
	private String descripcion;
	
	@Column(name="peso", columnDefinition="Decimal(10,2) default '0.00'")
	private double peso;
	
	@ManyToOne(optional= true)
	@JoinColumn(name="marca")
	private Marca marca;
	
	@ManyToOne(optional= true)
	@JoinColumn(name="departamento")
	private Departamento departamento;
	
	@ManyToMany
	private List<Etiqueta> etiqueta;
	
	@ManyToOne(optional= true)
	@JoinColumn(name="supermercado_id")
	private Supermercado supermercado;
	
	@Column(name="url_imagen")
	private String urlImagen;
	
	@JoinColumn(name="unidad")
	private String unidad;

	public Producto(int id, String name, double precio) {
		super();
		this.id = id;
		this.nombre = name;
		this.precio = precio;
	}



	
	
}

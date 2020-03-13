package com.youmarket.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
	
	@Column(name="nombre", length=50)
	private String name;
	
	@Column(name="descripcion", length = 250)
	private String descripcion;
	
	@Column(name="c_postal", length = 5)
	private String cPostal;
	
	@Column(name="intolerancia", length = 250)
	private String intolerancia;
	
	@OneToMany(mappedBy="supermercado")
	private List<Producto> productos;
	

	
	
}

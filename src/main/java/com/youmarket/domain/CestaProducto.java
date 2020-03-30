package com.youmarket.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CestaProducto {

	@EmbeddedId
	CestaProductoKey id;
	
	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "producto_id")
	Producto producto;
	
	@ManyToOne(optional = true)
	@MapsId("id")
	@JoinColumn(name = "cesta_id")
	Cesta cesta;
	
	int cantidad;

	public void setId(Producto producto, Cesta cesta){
		this.id = new CestaProductoKey(producto, cesta);
	}
}

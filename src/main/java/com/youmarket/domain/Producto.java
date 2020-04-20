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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;

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
	
	@NotBlank
	@SafeHtml
	@Column(name="nombre", length=50)
	private String nombre;
	
	@Positive
	private double precio;
	
	@Positive
	private double precioIva;
	
	@NotBlank
	@SafeHtml
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
	
	@URL
	@SafeHtml
	@Column(name="url_imagen")
	private String urlImagen;
	
	@NotBlank
	@SafeHtml
	@JoinColumn(name="unidad")
	private String unidad;

	public Producto(int id, String name, double precio) {
		super();
		this.id = id;
		this.nombre = name;
		this.precio = precio;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Producto other = (Producto) obj;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (id != other.id)
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (Double.doubleToLongBits(precio) != Double.doubleToLongBits(other.precio))
			return false;
		if (Double.doubleToLongBits(precioIva) != Double.doubleToLongBits(other.precioIva))
			return false;
		if (unidad == null) {
			if (other.unidad != null)
				return false;
		} else if (!unidad.equals(other.unidad))
			return false;
		if (urlImagen == null) {
			if (other.urlImagen != null)
				return false;
		} else if (!urlImagen.equals(other.urlImagen))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + id;
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		long temp;
		temp = Double.doubleToLongBits(precio);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(precioIva);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((unidad == null) ? 0 : unidad.hashCode());
		result = prime * result + ((urlImagen == null) ? 0 : urlImagen.hashCode());
		return result;
	}



	
	
}

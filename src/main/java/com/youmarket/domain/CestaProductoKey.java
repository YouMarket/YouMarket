package com.youmarket.domain;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
class CestaProductoKey implements Serializable {
 
    /**
	 * 
	 */
	private static final long serialVersionUID = -3275049524365314122L;
	@ManyToOne(optional = false)
	@JoinColumn(name = "producto_id")
    Producto producto;
 
	@ManyToOne(optional=false)
    @JoinColumn(name = "cesta_id")
    Cesta cesta;

    
    
    public CestaProductoKey(){
		super();
	}
    
	public CestaProductoKey(Producto producto, Cesta cesta) {
		super();
		this.producto = producto;
		this.cesta = cesta;
	}

	public Producto getProductoId() {
		return producto;
	}

	public void setProductoId(Producto producto) {
		this.producto = producto;
	}

	public Cesta getCesta() {
		return cesta;
	}

	public void setCestaId(Cesta cesta) {
		this.cesta = cesta;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cesta == null) ? 0 : cesta.hashCode());
		result = prime * result + ((producto == null) ? 0 : producto.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CestaProductoKey other = (CestaProductoKey) obj;
		if (cesta == null) {
			if (other.cesta != null)
				return false;
		} else if (!cesta.equals(other.cesta))
			return false;
		if (producto == null) {
			if (other.producto != null)
				return false;
		} else if (!producto.equals(other.producto))
			return false;
		return true;
	}

	// @Override
	// public int hashCode() {
	// 	final int prime = 31;
	// 	int result = 1;
	// 	result = prime * result + cestaId;
	// 	result = prime * result + productoId;
	// 	return result;
	// }

	// @Override
	// public boolean equals(Object obj) {
	// 	if (this == obj)
	// 		return true;
	// 	if (obj == null)
	// 		return false;
	// 	if (getClass() != obj.getClass())
	// 		return false;
	// 	CestaProductoKey other = (CestaProductoKey) obj;
	// 	if (cestaId != other.cestaId)
	// 		return false;
	// 	if (productoId != other.productoId)
	// 		return false;
	// 	return true;
	// }

	

	
 

}
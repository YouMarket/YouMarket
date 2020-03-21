package com.youmarket.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
class CestaProductoKey implements Serializable {
 
    /**
	 * 
	 */
	private static final long serialVersionUID = -3275049524365314122L;

	@Column(name = "producto_id")
    int productoId;
 
    @Column(name = "cesta_id")
    int cestaId;

    
    
    public CestaProductoKey(){
		super();
	}
    
	public CestaProductoKey(int productoId, int cestaId) {
		super();
		this.productoId = productoId;
		this.cestaId = cestaId;
	}

	public int getProductoId() {
		return productoId;
	}

	public void setProductoId(int productoId) {
		this.productoId = productoId;
	}

	public int getCestaId() {
		return cestaId;
	}

	public void setCestaId(int cestaId) {
		this.cestaId = cestaId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + cestaId;
		result = prime * result + productoId;
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
		if (cestaId != other.cestaId)
			return false;
		if (productoId != other.productoId)
			return false;
		return true;
	}

	
 

}
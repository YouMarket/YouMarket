package com.youmarket.domain.form;

public class FormCesta {

	private Integer usuario;
	private String name;
	private String productos;
	
	public FormCesta(Integer usuario, String name, String productos) {
		super();
		this.usuario = usuario;
		this.name = name;
		this.productos = productos;
	}
	public Integer getUsuario() {
		return usuario;
	}
	public void setUsuario(Integer usuario) {
		this.usuario = usuario;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getProductos() {
		return productos;
	}
	public void setProductos(String productos) {
		this.productos = productos;
	}
	public FormCesta() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

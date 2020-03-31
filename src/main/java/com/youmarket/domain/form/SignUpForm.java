package com.youmarket.domain.form;

import com.youmarket.domain.Direccion;
import com.youmarket.domain.Usuario;

public class SignUpForm {
	
	Usuario usuario;
	Direccion dir;
	
	public SignUpForm() {
		super();
	}
	
	public SignUpForm(Usuario usuario, Direccion dir) {
		super();
		this.usuario = usuario;
		this.dir = dir;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Direccion getDir() {
		return dir;
	}
	public void setDir(Direccion dir) {
		this.dir = dir;
	}

	
	

}

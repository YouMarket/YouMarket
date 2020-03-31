package com.youmarket.services;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Direccion;
import com.youmarket.domain.Factura;
import com.youmarket.domain.Usuario;
import com.youmarket.repositories.FacturaRepository;

@Service
public class FacturaService {
	
	@Autowired
	private FacturaRepository repo;

	public List<Factura> findByUser(Usuario usua){
		return repo.findByuser(usua);
	}
	
	public List<Factura> findAll() {
		return repo.findAll();
	}
	
	public Factura save(@Valid Factura dir) {
		return repo.save(dir);
	}
}
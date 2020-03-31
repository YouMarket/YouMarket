package com.youmarket.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Suscripcion;
import com.youmarket.repositories.SuscripcionRepository;

@Service
public class SuscripcionService {

	@Autowired
	private SuscripcionRepository repo;

	public List<Suscripcion> listaSuscripciones(){
		
		return repo.findAll(); 
	}
	
	public Suscripcion findById(int idProducto) {
		return repo.findById(idProducto).get();
	}
	
	public List<Suscripcion> getSuscripcionesDietista(){
		return repo.getSuscripcionesDietista();
	}
}

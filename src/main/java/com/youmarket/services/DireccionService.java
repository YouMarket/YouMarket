package com.youmarket.services;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Direccion;
import com.youmarket.domain.Usuario;
import com.youmarket.repositories.DireccionRepository;

@Service
public class DireccionService {
	
	@Autowired
	private DireccionRepository repo;

	public List<Direccion> findAllByUser(@Valid Usuario usuario) {
		return repo.findAllByUser(usuario);
	}
	
	public Direccion save(Direccion dir) {
		return repo.save(dir);
	}
}

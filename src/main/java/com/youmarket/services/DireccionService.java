package com.youmarket.services;

import java.util.List;

import javax.validation.Valid;

import com.youmarket.domain.Direccion;
import com.youmarket.domain.Usuario;
import com.youmarket.repositories.DireccionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DireccionService {

	@Autowired
	private DireccionRepository repo;

	public List<Direccion> findAllByUser(Usuario usuario) {
		return repo.findAllByUser(usuario);
	}

	public Direccion findPrincipalByUser(Usuario usuario) {
		return repo.findPrincipalByUser(usuario);
	}

	public List<Direccion> findAll() {
		return repo.findAll();
	}

	public Direccion save(@Valid Direccion dir) {
		return repo.save(dir);
	}

	public void delete(@Valid Direccion dir) {
		repo.delete(dir);
	}
}

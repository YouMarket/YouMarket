package com.youmarket.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Dieta;
import com.youmarket.repositories.DietaRepository;

@Service
public class DietaService {

	@Autowired
	private DietaRepository dietaRepository;
	
	
	public List<Dieta> findAll(){
		return this.dietaRepository.findAll();
	}

	public Dieta save(Dieta d) {
		return dietaRepository.save(d);
	}

	public void delete(Dieta d) {
		this.dietaRepository.delete(d);
	}

	public Dieta findById(int idDieta) {
		return dietaRepository.findById(idDieta).get();
	}


	public Dieta deleteById(int id) {
		this.dietaRepository.deleteById(id);
		return null;
	}
}

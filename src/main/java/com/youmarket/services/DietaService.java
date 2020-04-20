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


	public Dieta findById(int idDieta) {
		Optional<Dieta> dieta =  dietaRepository.findById(idDieta);
		if (dieta.isPresent()) {
			return dieta.get();
		} else {
			return null;
		}
	}


}

package com.youmarket.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Cesta;
import com.youmarket.domain.Dieta;
import com.youmarket.repositories.DietaRepository;

@Service
public class DietaService {
	
	@Autowired
	private DietaRepository repo;

	public List<Dieta> listaDietas(){
		
		return repo.findAll(); 
	}

	public Dieta save(Dieta d) {
		return repo.save(d);
	}

	public void delete() {
		// TODO Auto-generated method stub
		
	}

	public Cesta findById(int idDieta) {
		return repo.findById(idDieta).get();
	}
}

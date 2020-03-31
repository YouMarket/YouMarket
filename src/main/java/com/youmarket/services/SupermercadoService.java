package com.youmarket.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Supermercado;
import com.youmarket.repositories.SupermercadoRepository;

@Service
public class SupermercadoService {
	
	@Autowired
	private SupermercadoRepository repo;

	public List<Supermercado> listaSupermercados(){
		
		return repo.findAll(); 
	}

	public Supermercado showProduct(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public int save(Supermercado p) {
		// TODO Auto-generated method stub
		return 0;
	}

	public void delete() {
		// TODO Auto-generated method stub
		
	}
}

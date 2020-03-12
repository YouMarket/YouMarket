package com.youmarket.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Cesta;
import com.youmarket.domain.Producto;
import com.youmarket.repositories.CestaRepository;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class CestaService {
	
	@Autowired
	private CestaRepository cestaRepository;
	
	//Para dashboard
	public Integer totalCestasCreadas(){
		
		return cestaRepository.totalCestas(); 
	}
	
	public List<Cesta> cestasPorUsuario(int userId){
		
		return cestaRepository.cestaPorUsuario(userId);
	}

	public Optional<Cesta> muestraCesta(int id) {
		// TODO Auto-generated method stub
		return cestaRepository.findById(id);
	}

	public Cesta save(Cesta c) {
		
		cestaRepository.save(c);
		
		return c;
	}

	public void deleteById(Cesta c)	 {
		
		cestaRepository.deleteById(c.getId());
	}

	public Object findById(Integer id) {
		
		return cestaRepository.findById(id);
	}

}

package com.youmarket.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.CestaProducto;
import com.youmarket.repositories.CestaProductoRepository;

@Service
public class CestaProductoService {
	
	@Autowired
	private CestaProductoRepository cestaProductoRepository;

	public List<CestaProducto> listaProductosByDiet(int dietId){
		
		return cestaProductoRepository.findAll(); 
	}

}

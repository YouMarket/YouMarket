package com.youmarket.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Supermercado;
import com.youmarket.services.SupermercadoService;

@RestController
@RequestMapping("supermercado")
public class SupermercadoController {

	@Autowired
	private SupermercadoService supermercadoService;
	
	@RequestMapping("/list")
	public List<Supermercado> listSupermercados(Model model){
		List<Supermercado> supermercados=supermercadoService.listaSupermercados();
		
		return supermercados;
	}
}

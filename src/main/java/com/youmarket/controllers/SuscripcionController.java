package com.youmarket.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Suscripcion;
import com.youmarket.services.SuscripcionService;

@RestController
@RequestMapping("suscripcion")
public class SuscripcionController {
	
	@Autowired
	SuscripcionService suscripcionService;

	@GetMapping("/all")
	public List<Suscripcion> getAll(){
		return suscripcionService.listaSuscripciones();
	}
}

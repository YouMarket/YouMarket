package com.youmarket.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.youmarket.domain.Dieta;
import com.youmarket.services.DietaService;

@RestController
@RequestMapping("dieta")
public class DietaController {

	@Autowired
	private DietaService dietaService;
		
	@RequestMapping("/list")
	public List<Dieta> listDietas(Model model){
		List<Dieta> dietas=dietaService.findAll();
			
		return dietas;
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Object> dietaPorId(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(dietaService.findById(id));
    }

}

package com.youmarket.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.youmarket.domain.Cesta;
import com.youmarket.domain.Producto;
import com.youmarket.repositories.CestaRepository;
import com.youmarket.services.CestaService;
import com.youmarket.services.ProductoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/cesta")
public class CestaController {
	@Autowired
	private CestaService cestaService;
	
	@PostMapping
    public ResponseEntity<Cesta> create(@Valid @RequestBody Cesta c) {
		c=cestaService.save(c);
		
		URI location= ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(c.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
	
	@GetMapping("/user/{id}")
    public ResponseEntity<List<Cesta>> cestasPorUsuario(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(cestaService.cestasPorUsuario(id));
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Object> cestaPorId(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(cestaService.findById(id));
    }
	
	@PutMapping("/{id}")
	public ResponseEntity<Cesta> update(@PathVariable Integer id, @Valid @RequestBody Cesta c) {
		 
		 c.setId(id);
		 cestaService.save(c);

		 
		 
		 return ResponseEntity.noContent().build();
}	
	 
}

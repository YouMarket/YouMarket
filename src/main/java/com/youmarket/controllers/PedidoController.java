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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.youmarket.domain.Pedido;
import com.youmarket.services.PedidoService;

@RestController
@RequestMapping("pedido")
public class PedidoController {
	
	@Autowired
	private PedidoService pedidoService;
	
	@GetMapping("/{id}")
    public ResponseEntity<Object> pedidoPorId(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }
	
	@PostMapping
    public ResponseEntity<Pedido> create(@RequestBody Pedido p) {
		Pedido pedidoGuardado = pedidoService.save(p);
		
		URI location= ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(pedidoGuardado.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

}

package com.youmarket.controllers;

import java.util.List;

import javax.validation.Valid;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Dieta;
import com.youmarket.domain.Usuario;
import com.youmarket.services.DietaService;
import com.youmarket.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("dieta")
public class DietaController {

	@Autowired
	private DietaService dietaService;

	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping("/list")
	public List<Dieta> listDietas(Model model, @CurrentUser UserPrincipal logged) {
		Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		Assert.isTrue(user.getSuscripcion().isDietista());
		List<Dieta> dietas = dietaService.findAll();

		return dietas;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> dietaPorId(@Valid @PathVariable Integer id, @CurrentUser UserPrincipal logged) {
		Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		Assert.isTrue(user.getSuscripcion().isDietista());
		return ResponseEntity.ok(dietaService.findById(id));
	}

}

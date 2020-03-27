package com.youmarket.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Usuario;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping("/signIn")
	public Usuario login(@RequestBody Usuario usuario) {
		
		System.out.println(usuario.getEmail());
		System.out.println(usuario.getPassword());
		
		Optional<Usuario> logged = usuarioService.findUsuarioByLogin(usuario.getEmail(), usuario.getPassword()) ;
		
		if(logged.isPresent()) {
			logged.get().setPassword(null);
		}
		
		return logged.get();
	}


}

package com.youmarket.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Direccion;
import com.youmarket.domain.Usuario;
import com.youmarket.services.DireccionService;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("direccion")
public class DireccionController {
	
	@Autowired
	DireccionService direccionService;
	
	@Autowired
	UsuarioService usuarioService;

	@PostMapping("/save")
	public Direccion saveNewDir(@RequestBody Direccion dir) {
		return direccionService.save(dir);
	}
	
	@GetMapping("/dirs")
	public List<Direccion> listAllDirecciones(){
		return direccionService.findAll();
	}
	
	@GetMapping("/misDirecciones")
	public List<Direccion> misDirecciones(@CurrentUser UserPrincipal cu){
		Usuario usu = new Usuario();
		usu.setId(cu.getId());
		return direccionService.findAllByUser(usu);
	}
	
	@GetMapping("/principal")
	public Direccion getPrincipal(@CurrentUser UserPrincipal cu){
		
		Usuario usu = new Usuario();
		usu.setId(cu.getId());
		return direccionService.findPrincipalByUser(usu);
	}
	
	@PostMapping("/update")
	public Direccion updateDir(@CurrentUser UserPrincipal currentUser, @RequestBody Direccion dir) {
		
		//comprobar que la dir a modificar es del usuario logado
		Usuario usu = usuarioService.findById(currentUser.getId()).get();
		dir.setUsuario(usu);
		
		//Comprobamos si ha modificado la direccion principal
		Direccion principal = direccionService.findPrincipalByUser(usu);
		if(dir.isPrincipal() && principal.getId()!= dir.getId()) {
			principal.setPrincipal(false);
			direccionService.save(principal);
		}
		
		return direccionService.save(dir);
	}
	
}

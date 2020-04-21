package com.youmarket.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Role;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.services.BrechaService;
import com.youmarket.services.UsuarioService;

import io.jsonwebtoken.lang.Assert;

@RestController
@RequestMapping("/brecha")
public class BrechaController {
	
	@Autowired
	private BrechaService brechaService;

	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping("/alertar")
	public void activaDesactivaBrecha(@CurrentUser UserPrincipal logged){
		Usuario user = this.usuarioService.findById(logged.getId()).orElse(null);
		Set<Role> roleSet = user.getRoles();
		boolean isAdmin = roleSet.contains(new Role((long) 4, RoleName.ADMIN));
		Assert.isTrue(isAdmin);
		
		System.out.println("aaaaaaaaaa");
		brechaService.activaDesactivaBrecha();
	}
	
	@RequestMapping("/devuelveBrecha")
	public ResponseEntity<Boolean> devuelveBrecha(){
		
		return ResponseEntity.ok(this.brechaService.devuelveBrecha());
	}
	
	

}

package com.youmarket.controllers;

import java.util.Set;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Role;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.services.BrechaService;
import com.youmarket.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		//TODO: COMPROBAR QUE ES ADMIN
		Usuario user = this.usuarioService.findById(logged.getId()).orElse(null);
		Set<Role> roleSet = user.getRoles();
		boolean isAdmin = roleSet.contains(new Role((long) 4, RoleName.ADMIN));
		Assert.isTrue(isAdmin);
		//Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		//Assert.isTrue(user.getSuscripcion().isDietista());
		
		brechaService.activaDesactivaBrecha();
	}
	
	@RequestMapping("/devuelveBrecha")
	public Boolean devuelveBrecha(@CurrentUser UserPrincipal logged){
		//TODO: COMPROBAR QUE ES ADMIN
		//Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		//Assert.isTrue(user.getSuscripcion().isDietista());
		
		return this.brechaService.devuelveBrecha();
	}
	
	

}

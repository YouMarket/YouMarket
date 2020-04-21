package com.youmarket.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.services.BrechaService;

@RestController
@RequestMapping("/brecha")
public class BrechaController {
	
	@Autowired
	private BrechaService brechaService;

	@RequestMapping("/alertar")
	public void activaDesactivaBrecha(Model model, @CurrentUser UserPrincipal logged){
		//TODO: COMPROBAR QUE ES ADMIN
		//Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		//Assert.isTrue(user.getSuscripcion().isDietista());
		
		brechaService.activaDesactivaBrecha();
	}

}

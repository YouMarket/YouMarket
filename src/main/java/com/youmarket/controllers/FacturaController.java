package com.youmarket.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.response.ApiResponse;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Factura;
import com.youmarket.domain.Usuario;
import com.youmarket.services.FacturaService;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("factura")
public class FacturaController {

	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	FacturaService facturaService;
	
	
	@PostMapping("/create")
	public ResponseEntity<ApiResponse> guardaFactura(@CurrentUser UserPrincipal curr){
		
		ApiResponse respuesta = new ApiResponse();
		Usuario user = usuarioService.findById(curr.getId()).orElse(null);
		
		Factura fac = new Factura();
		fac.setUsuario(user);
		fac.setTotalIva(17.00);
		fac.setTotal(17.00);
		fac.setFechaFactura(new Date());
		
		facturaService.save(fac);
		
		
		return ResponseEntity.ok(respuesta); 
	}
	
	@GetMapping("/allUser")
	public List<Factura> getFacturasFromUser(@CurrentUser UserPrincipal user){
		Usuario usuario = usuarioService.findById(user.getId()).orElse(null);
		return facturaService.findByUser(usuario);
	}
	
	@GetMapping("/pedidosUser")
	public List<Factura> getFacturasPedidoFromUser(@CurrentUser UserPrincipal user){
		Usuario usuario = usuarioService.findById(user.getId()).orElse(null);
		return facturaService.findByUserFromPedido(usuario);
	}
	
	@GetMapping("/suscripcionesUser")
	public List<Factura> getFacturasSuscripcionFromUser(@CurrentUser UserPrincipal user){
		Usuario usuario = usuarioService.findById(user.getId()).orElse(null);
		return facturaService.findFromUser(usuario);
	}
}

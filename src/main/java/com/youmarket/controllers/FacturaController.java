package com.youmarket.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
		
		Factura res = facturaService.createAndSaveFactura(user, null, user.getSuscripcion().getPrecio(), new Date());
		if(res!= null) {
			respuesta.setSuccess(true);
			respuesta.setMessage("Pago realizado con éxito");
		}else {
			respuesta.setSuccess(false);
			respuesta.setMessage("Error al guardar la factura");
		}
		
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

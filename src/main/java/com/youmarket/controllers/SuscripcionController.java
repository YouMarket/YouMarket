package com.youmarket.controllers;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.response.ApiResponse;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Factura;
import com.youmarket.domain.Suscripcion;
import com.youmarket.domain.Usuario;
import com.youmarket.services.FacturaService;
import com.youmarket.services.SuscripcionService;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("suscripcion")
public class SuscripcionController {
	
	@Autowired
	SuscripcionService suscripcionService;
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	FacturaService facturaService;

	@GetMapping("/all")
	public List<Suscripcion> getAll(){
		return suscripcionService.listaSuscripciones();
	}
	
	@PostMapping("/update")
	public ResponseEntity<ApiResponse> update(@CurrentUser UserPrincipal usuario, @RequestBody Suscripcion sus){
		ApiResponse respuesta = new ApiResponse();
		
		Usuario user= usuarioService.findById(usuario.getId()).orElse(null);
		if(sus.getId() != user.getSuscripcion().getId()) {
			Suscripcion nueva = suscripcionService.findById(sus.getId());
			user.setSuscripcion(nueva);
			user = usuarioService.save(user);
			
			facturaService.createAndSaveFactura(user, null, nueva.getPrecio(), new Date());
			
			respuesta.setSuccess(true);
			respuesta.setMessage("Suscripción actualizada");
		}else {
			respuesta.setSuccess(false);
			respuesta.setMessage("Sigue con la misma suscripción");
		}
		
		return  ResponseEntity.ok(respuesta);
	}
	
	@PostMapping("/pago")
	public  ResponseEntity<ApiResponse> pagoSuscripcion(@CurrentUser UserPrincipal usuario){
		ApiResponse respuesta = new ApiResponse();
		
		Optional<Usuario> usu = usuarioService.findById(usuario.getId());
		Usuario user= usu.orElse(null);
		
		return  ResponseEntity.ok(respuesta);
	}
	
	@GetMapping("/pagada")
	public  ResponseEntity<ApiResponse> pagada(@CurrentUser UserPrincipal usuario){
		ApiResponse respuesta = new ApiResponse();
		Usuario user= usuarioService.findById(usuario.getId()).orElse(null);
		
		Factura last = facturaService.findLastSuscripcion(user);
		respuesta.setMessage("Factura no pagada"); 
		respuesta.setSuccess(false);
		if( last != null && last.getFechaFactura()!= null) {
			LocalDate fechaFactura = last.getFechaFactura().toInstant()
				      .atZone(ZoneId.systemDefault())
				      .toLocalDate();
			LocalDate fecha = LocalDate.now();
			
			if(fecha.getMonthValue() <= fechaFactura.getMonthValue()) {
				respuesta.setMessage( String.valueOf(fechaFactura.getMonthValue()-fecha.getMonthValue())); 
				respuesta.setSuccess(true);
			}
		}
		
		
		return  ResponseEntity.ok(respuesta);
	}
}

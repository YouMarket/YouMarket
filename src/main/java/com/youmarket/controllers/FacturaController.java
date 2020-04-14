package com.youmarket.controllers;

import java.io.ByteArrayInputStream;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.response.ApiResponse;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Factura;
import com.youmarket.domain.Suscripcion;
import com.youmarket.domain.Usuario;
import com.youmarket.pdf.PDFUtil;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.FacturaService;
import com.youmarket.services.SuscripcionService;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("factura")
public class FacturaController {

	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	FacturaService facturaService;
	
	@Autowired
	SuscripcionService suscripcionService;
	
	@Autowired
	CestaProductoService cpService;
	
	@PostMapping("/createSuscripcion")
	public ResponseEntity<ApiResponse> guardaFactura(@CurrentUser UserPrincipal curr){
		
		ApiResponse respuesta = new ApiResponse();
		Usuario user = usuarioService.findById(curr.getId()).orElse(null);
		user.setPedidosRestantes(user.getSuscripcion().getEnvios());
		usuarioService.save(user);
		
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
	
	@RequestMapping(value = "/pdf", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<InputStreamResource> descargaPDF(){
		
		
		ByteArrayInputStream bis = PDFUtil.suscripcionPDFGenerator(null, null);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=prueba.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
	}
	
	@RequestMapping(value = "/generateFactura", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<InputStreamResource> descargaPDF(@RequestBody Factura factura){

		ByteArrayInputStream bis = null;
		
		if(factura.getPedido()!= null) {
			System.out.println(factura.getPedido().getId());
			List<CestaProducto> productos = cpService.findProdsByCesta(factura.getPedido());
			bis = PDFUtil.pedidoPDFGenerator(factura, productos);
		}else {
			Suscripcion sus = suscripcionService.findSuscripcionByPrecio(factura.getTotalIva());
			System.out.println(factura.getTotalIva());
			System.out.println(sus);
			bis = PDFUtil.suscripcionPDFGenerator(factura, sus);
		}

        HttpHeaders headers = new HttpHeaders();
        String filename = factura.getPedido()!= null ? "factura_pedido": "factura_suscripcion";
        headers.add("Content-Disposition", "inline; filename="+filename+".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
	}
}

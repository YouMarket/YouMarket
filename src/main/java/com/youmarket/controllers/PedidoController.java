package com.youmarket.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Pedido;
import com.youmarket.domain.Usuario;
import com.youmarket.services.PedidoService;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("pedido")
public class PedidoController {
	
	@Autowired
	private PedidoService pedidoService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/{id}")
    public ResponseEntity<Object> pedidoPorId(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }
	
	@PostMapping("/create")
    public ResponseEntity<Pedido> create(@RequestBody Pedido p) throws URISyntaxException {
		
		Date fechaHoraEntrega = new Date();
		Date fechaHoraEnvio = new Date();
		Date fechaHoraPedido = new Date();
		
		p.setFechaHoraEntrega(fechaHoraEntrega);
		p.setFechaHoraPedido(fechaHoraPedido);
		p.setNombre("Pedido num. " + p.getId());
		p.setOrdenEntrega(1);
		p.setRetraso("No hubo retraso");

		//TODO: CAMBIAR POR USUARIO LOGEADO
		Usuario u = this.usuarioService.listaUsuarios().get(0);
		p.setUsuario(u);
		
		//TODO: COSTE DEL PEDIDO
		
		
		Pedido pedidoGuardado = pedidoService.save(p);
		
		
		
		return ResponseEntity.created(new URI ("/pedido/)" + pedidoGuardado.getId())).body(pedidoGuardado);
		
    }

}

package com.youmarket.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Pedido;
import com.youmarket.domain.Producto;
import com.youmarket.domain.Usuario;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.PedidoService;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("pedido")
public class PedidoController {
	
	@Autowired
	private PedidoService pedidoService;
	
	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private CestaProductoService cpService;
	
	@GetMapping("/{id}")
    public ResponseEntity<Object> pedidoPorId(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }
	
	@GetMapping("/getAll")
	public List<Pedido> getAll(@CurrentUser UserPrincipal principal){
		List<Pedido> pedidos = pedidoService.findAllByUser(principal.getId());
		return pedidos;
	}
	
	@PostMapping("/create")
    public ResponseEntity<Pedido> create(@RequestBody Pedido p, HttpSession session) throws URISyntaxException {
		
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
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		List<Producto> keys = new ArrayList<>(carrito.keySet());
		for(Producto prod : keys){
			CestaProducto cp = new CestaProducto();
			cp.setProducto(prod);
			cp.setCantidad(carrito.get(prod));
			cp.setCesta(pedidoGuardado);
			cp.setId(prod, pedidoGuardado);
			System.out.println(cp.getCesta().getId());
			this.cpService.save(cp);
		}
		
		session.setAttribute("SESSION_CARRITO", new HashMap<Producto, Integer>());

		return ResponseEntity.created(new URI ("/pedido/)" + pedidoGuardado.getId())).body(pedidoGuardado);
		
    }

}

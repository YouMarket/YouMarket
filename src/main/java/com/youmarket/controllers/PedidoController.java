package com.youmarket.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import com.youmarket.domain.form.FormPedidos;
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
	
	@PostMapping("/create2")
    public ResponseEntity<Pedido> create2(@RequestBody Pedido p, HttpSession session, @CurrentUser UserPrincipal currentUser) throws URISyntaxException {
		
		Date fechaHoraEntrega = new Date();
		Date fechaHoraEnvio = new Date();
		Date fechaHoraPedido = new Date();
		
		p.setFechaHoraEntrega(fechaHoraEntrega);
		p.setFechaHoraPedido(fechaHoraPedido);
		p.setNombre("Pedido num. " + p.getId());
		p.setOrdenEntrega(1);
		p.setRetraso("No hubo retraso");
		Optional<Usuario> user=this.usuarioService.findById(currentUser.getId());
		
		Usuario user2=null;
		if(user.isPresent()) {
			user2=user.get();
		}
		p.setUsuario(user2);
		
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

			this.cpService.save(cp);
		}
		
		session.setAttribute("SESSION_CARRITO", new HashMap<Producto, Integer>());

		return ResponseEntity.created(new URI ("/pedido/)" + pedidoGuardado.getId())).body(pedidoGuardado);
		
    }
	
	@PostMapping("/create")
    public ResponseEntity<Pedido> create(@RequestBody FormPedidos pedidos, HttpSession session, @CurrentUser UserPrincipal currentUser) throws URISyntaxException {
		
		
		Date fechaHoraEntrega = new Date();
		Date fechaHoraEnvio = new Date();
		Date fechaHoraPedido = new Date();
		
		Pedido p = new Pedido();
		p.setCpostal(pedidos.getCpostal1());
		p.setDireccion(pedidos.getDireccion1());
		p.setFechaEnvio(pedidos.getFechaEnvio1());
		p.setHoraEnvioFin(pedidos.getHoraEnvioFin1());
		p.setHoraEnvioIni(pedidos.getHoraEnvioIni1());
		p.setPoblacion(pedidos.getPoblacion1());
		p.setProvincia(pedidos.getProvincia1());
		
		p.setFechaHoraEntrega(fechaHoraEntrega);
		p.setFechaHoraPedido(fechaHoraPedido);
		p.setNombre("Pedido num. " + p.getId());
		p.setOrdenEntrega(1);
		p.setRetraso("No hubo retraso");
		Optional<Usuario> user=this.usuarioService.findById(currentUser.getId());
		
		Usuario user2=null;
		if(user.isPresent()) {
			user2=user.get();
		}
		p.setUsuario(user2);
		Pedido pedidoGuardado = this.pedidoService.save(p);
		
		Pedido p2 = new Pedido();
		p2.setCpostal(pedidos.getCpostal2());
		p2.setDireccion(pedidos.getDireccion2());
		p2.setFechaEnvio(pedidos.getFechaEnvio2());
		p2.setHoraEnvioFin(pedidos.getHoraEnvioFin2());
		p2.setHoraEnvioIni(pedidos.getHoraEnvioIni2());
		p2.setPoblacion(pedidos.getPoblacion2());
		p2.setProvincia(pedidos.getProvincia2());
		
		p2.setFechaHoraEntrega(fechaHoraEntrega);
		p2.setFechaHoraPedido(fechaHoraPedido);
		p2.setNombre("Pedido num. " + p.getId());
		p2.setOrdenEntrega(2);
		p2.setRetraso("No hubo retraso");
		p2.setUsuario(user2);
		this.pedidoService.save(p2);
		
		Pedido p3 = new Pedido();
		p3.setCpostal(pedidos.getCpostal3());
		p3.setDireccion(pedidos.getDireccion3());
		p3.setFechaEnvio(pedidos.getFechaEnvio3());
		p3.setHoraEnvioFin(pedidos.getHoraEnvioFin3());
		p3.setHoraEnvioIni(pedidos.getHoraEnvioIni3());
		p3.setPoblacion(pedidos.getPoblacion3());
		p3.setProvincia(pedidos.getProvincia3());
		
		p3.setFechaHoraEntrega(fechaHoraEntrega);
		p3.setFechaHoraPedido(fechaHoraPedido);
		p3.setNombre("Pedido num. " + p.getId());
		p3.setOrdenEntrega(3);
		p3.setRetraso("No hubo retraso");
		p3.setUsuario(user2);
		this.pedidoService.save(p3);
		
		Pedido p4 = new Pedido();
		p4.setCpostal(pedidos.getCpostal4());
		p4.setDireccion(pedidos.getDireccion4());
		p4.setFechaEnvio(pedidos.getFechaEnvio4());
		p4.setHoraEnvioFin(pedidos.getHoraEnvioFin4());
		p4.setHoraEnvioIni(pedidos.getHoraEnvioIni4());
		p4.setPoblacion(pedidos.getPoblacion4());
		p4.setProvincia(pedidos.getProvincia4());
		
		p4.setFechaHoraEntrega(fechaHoraEntrega);
		p4.setFechaHoraPedido(fechaHoraPedido);
		p4.setNombre("Pedido num. " + p.getId());
		p4.setOrdenEntrega(4);
		p4.setRetraso("No hubo retraso");
		p4.setUsuario(user2);
		this.pedidoService.save(p4);
		
		
		
		//TODO: COSTE DEL PEDIDO
		
		
		//Pedido pedidoGuardado = pedidoService.save(p);
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		List<Producto> keys = new ArrayList<>(carrito.keySet());
		for(Producto prod : keys){
			CestaProducto cp = new CestaProducto();
			cp.setProducto(prod);
			cp.setCantidad(carrito.get(prod));
			cp.setCesta(pedidoGuardado);
			cp.setId(prod, pedidoGuardado);

			this.cpService.save(cp);
		}
		
		
		session.setAttribute("SESSION_CARRITO", new HashMap<Producto, Integer>());
		
		return ResponseEntity.created(new URI ("/pedido/)" + pedidoGuardado.getId())).body(pedidoGuardado);
		
    }

}

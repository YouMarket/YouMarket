package com.youmarket.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Pedido;
import com.youmarket.domain.Producto;
import com.youmarket.domain.ProductoCarrito;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.form.FormPedidos;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.FacturaService;
import com.youmarket.services.PedidoService;
import com.youmarket.services.SuscripcionService;
import com.youmarket.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("pedido")
public class PedidoController {
	
	@Autowired
	private PedidoService pedidoService;
	
	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private CestaProductoService cpService;

	@Autowired
	private SuscripcionService susService;
	
	@Autowired
	private FacturaService facturaService;
	
	@GetMapping("/{id}")
    public ResponseEntity<Object> pedidoPorId(@Valid @PathVariable Integer id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }
	
	@GetMapping("/getAll")
	public List<Pedido> getAll(@CurrentUser UserPrincipal principal){
		List<Pedido> pedidos = pedidoService.findAllByUser(principal.getId());
		return pedidos;
	}
	
	// @PostMapping("/create2")
    // public ResponseEntity<Pedido> create2(@RequestBody Pedido p, HttpSession session, @CurrentUser UserPrincipal currentUser) throws URISyntaxException {
		
	// 	Date fechaHoraEntrega = new Date();
	// 	Date fechaHoraEnvio = new Date();
	// 	Date fechaHoraPedido = new Date();
		
	// 	p.setFechaHoraEntrega(fechaHoraEntrega);
	// 	p.setFechaHoraPedido(fechaHoraPedido);
	// 	p.setNombre("Pedido num. " + p.getId());
	// 	p.setOrdenEntrega(1);
	// 	p.setRetraso("No hubo retraso");
	// 	Optional<Usuario> user=this.usuarioService.findById(currentUser.getId());
		
	// 	Usuario user2=null;
	// 	if(user.isPresent()) {
	// 		user2=user.get();
	// 	}
	// 	p.setUsuario(user2);
		
	// 	//TODO: COSTE DEL PEDIDO
		
		
	// 	Pedido pedidoGuardado = pedidoService.save(p);
	// 	@SuppressWarnings("unchecked")
	// 	Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
	// 	List<Producto> keys = new ArrayList<>(carrito.keySet());
	// 	for(Producto prod : keys){
	// 		CestaProducto cp = new CestaProducto();
	// 		cp.setProducto(prod);
	// 		cp.setCantidad(carrito.get(prod));
	// 		cp.setCesta(pedidoGuardado);
	// 		cp.setId(prod, pedidoGuardado);

	// 		this.cpService.save(cp);
	// 	}
		
	// 	session.setAttribute("SESSION_CARRITO", new HashMap<Producto, Integer>());

	// 	return ResponseEntity.created(new URI ("/pedido/)" + pedidoGuardado.getId())).body(pedidoGuardado);
		
    // }
	
	// @PostMapping("/create3")
    // public ResponseEntity<Pedido> create(@RequestBody FormPedidos pedidos, HttpSession session, @CurrentUser UserPrincipal currentUser) throws URISyntaxException {
		
		
	// 	Date fechaHoraEntrega = new Date();
	// 	Date fechaHoraEnvio = new Date();
	// 	Date fechaHoraPedido = new Date();
		
	// 	Pedido p = new Pedido();
	// 	p.setCpostal(pedidos.getCpostal1());
	// 	p.setDireccion(pedidos.getDireccion1());
	// 	p.setFechaEnvio(pedidos.getFechaEnvio1());
	// 	p.setHoraEnvioFin(pedidos.getHoraEnvioFin1());
	// 	p.setHoraEnvioIni(pedidos.getHoraEnvioIni1());
	// 	p.setPoblacion(pedidos.getPoblacion1());
	// 	p.setProvincia(pedidos.getProvincia1());
		
	// 	p.setFechaHoraEntrega(fechaHoraEntrega);
	// 	p.setFechaHoraPedido(fechaHoraPedido);
	// 	p.setNombre("Pedido num. " + p.getId());
	// 	p.setOrdenEntrega(1);
	// 	p.setRetraso("No hubo retraso");
		
	// 	Optional<Usuario> user=this.usuarioService.findById(currentUser.getId());
		
	// 	Usuario user2=null;
	// 	if(user.isPresent()) {
	// 		user2=user.get();
	// 	}
	// 	p.setUsuario(user2);
	// 	Pedido pedidoGuardado = this.pedidoService.save(p);
		
	// 	Pedido p2 = new Pedido();
	// 	p2.setCpostal(pedidos.getCpostal2());
	// 	p2.setDireccion(pedidos.getDireccion2());
	// 	p2.setFechaEnvio(pedidos.getFechaEnvio2());
	// 	p2.setHoraEnvioFin(pedidos.getHoraEnvioFin2());
	// 	p2.setHoraEnvioIni(pedidos.getHoraEnvioIni2());
	// 	p2.setPoblacion(pedidos.getPoblacion2());
	// 	p2.setProvincia(pedidos.getProvincia2());
		
	// 	p2.setFechaHoraEntrega(fechaHoraEntrega);
	// 	p2.setFechaHoraPedido(fechaHoraPedido);
	// 	p2.setNombre("Pedido num. " + p.getId());
	// 	p2.setOrdenEntrega(2);
	// 	p2.setRetraso("No hubo retraso");
	// 	p2.setUsuario(user2);
	// 	this.pedidoService.save(p2);
		
	// 	Pedido p3 = new Pedido();
	// 	p3.setCpostal(pedidos.getCpostal3());
	// 	p3.setDireccion(pedidos.getDireccion3());
	// 	p3.setFechaEnvio(pedidos.getFechaEnvio3());
	// 	p3.setHoraEnvioFin(pedidos.getHoraEnvioFin3());
	// 	p3.setHoraEnvioIni(pedidos.getHoraEnvioIni3());
	// 	p3.setPoblacion(pedidos.getPoblacion3());
	// 	p3.setProvincia(pedidos.getProvincia3());
		
	// 	p3.setFechaHoraEntrega(fechaHoraEntrega);
	// 	p3.setFechaHoraPedido(fechaHoraPedido);
	// 	p3.setNombre("Pedido num. " + p.getId());
	// 	p3.setOrdenEntrega(3);
	// 	p3.setRetraso("No hubo retraso");
	// 	p3.setUsuario(user2);
	// 	this.pedidoService.save(p3);
		
	// 	Pedido p4 = new Pedido();
	// 	p4.setCpostal(pedidos.getCpostal4());
	// 	p4.setDireccion(pedidos.getDireccion4());
	// 	p4.setFechaEnvio(pedidos.getFechaEnvio4());
	// 	p4.setHoraEnvioFin(pedidos.getHoraEnvioFin4());
	// 	p4.setHoraEnvioIni(pedidos.getHoraEnvioIni4());
	// 	p4.setPoblacion(pedidos.getPoblacion4());
	// 	p4.setProvincia(pedidos.getProvincia4());
		
	// 	p4.setFechaHoraEntrega(fechaHoraEntrega);
	// 	p4.setFechaHoraPedido(fechaHoraPedido);
	// 	p4.setNombre("Pedido num. " + p.getId());
	// 	p4.setOrdenEntrega(4);
	// 	p4.setRetraso("No hubo retraso");
	// 	p4.setUsuario(user2);
	// 	this.pedidoService.save(p4);
		
		
		
	// 	//TODO: COSTE DEL PEDIDO
		
		
	// 	//Pedido pedidoGuardado = pedidoService.save(p);
	// 	@SuppressWarnings("unchecked")
	// 	Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
	// 	List<Producto> keys = new ArrayList<>(carrito.keySet());
	// 	for(Producto prod : keys){
	// 		CestaProducto cp = new CestaProducto();
	// 		cp.setProducto(prod);
	// 		cp.setCantidad(carrito.get(prod));
	// 		cp.setCesta(pedidoGuardado);
	// 		cp.setId(prod, pedidoGuardado);

	// 		this.cpService.save(cp);
	// 	}
		
		
	// 	session.setAttribute("SESSION_CARRITO", new HashMap<Producto, Integer>());
		
	// 	return ResponseEntity.created(new URI ("/pedido/)" + pedidoGuardado.getId())).body(pedidoGuardado);
		
	// }
	
	@PostMapping("/create")
	public ResponseEntity<List<Pedido>> createPedidos(@RequestBody List<ProductoCarrito> carrito, @RequestBody FormPedidos pedidos, @CurrentUser UserPrincipal currentUser) throws URISyntaxException {
		
		Usuario user = this.usuarioService.findById(currentUser.getId()).orElse(null);
		
		Date now = new Date();
		
		
		Pedido p1s = new Pedido();
		Pedido p2s = new Pedido();
		Pedido p3s = new Pedido();
		Pedido p4s = new Pedido();
		
		if(pedidos.getDireccion4() != null){
			user.setPedidosRestantes(user.getPedidosRestantes() - 4);
		} else if(pedidos.getDireccion3() != null){
			user.setPedidosRestantes(user.getPedidosRestantes() - 3);
		} else if(pedidos.getDireccion2() != null){
			user.setPedidosRestantes(user.getPedidosRestantes() - 2);
		} else if(pedidos.getDireccion1() != null){
			user.setPedidosRestantes(user.getPedidosRestantes() - 1);
		}
		this.usuarioService.save(user);

		if(pedidos.getDireccion1() != null){
			Pedido p1 = new Pedido();
			p1.setCpostal(pedidos.getCpostal1());
			p1.setDireccion(pedidos.getDireccion1());
			p1.setFechaEnvio(pedidos.getFechaEnvio1());
			p1.setHoraEnvioFin(pedidos.getHoraEnvioFin1());
			p1.setHoraEnvioIni(pedidos.getHoraEnvioIni1());
			p1.setPoblacion(pedidos.getPoblacion1());
			p1.setProvincia(pedidos.getProvincia1());
			
			p1.setFechaHoraPedido(now);
			p1.setNombre("Pedido num. " + p1.getId());
			p1.setOrdenEntrega(1);
			p1.setRetraso("No hubo retraso");
			p1.setUsuario(user);
			if (pedidos.getCestaId1() == null){
				p1s = this.meterCarrito(carrito, p1);
			} else {
				p1s = this.meterCesta(pedidos.getCestaId1(), p1);
			}
			facturaService.createAndSaveFactura(null, p1s, importeTotal(p1s), new Date());
		}

		if(pedidos.getDireccion2() != null){
			Pedido p2 = new Pedido();
			p2.setCpostal(pedidos.getCpostal2());
			p2.setDireccion(pedidos.getDireccion2());
			p2.setFechaEnvio(pedidos.getFechaEnvio2());
			p2.setHoraEnvioFin(pedidos.getHoraEnvioFin2());
			p2.setHoraEnvioIni(pedidos.getHoraEnvioIni2());
			p2.setPoblacion(pedidos.getPoblacion2());
			p2.setProvincia(pedidos.getProvincia2());
			
			p2.setFechaHoraPedido(now);
			p2.setNombre("Pedido num. " + p2.getId());
			p2.setOrdenEntrega(2);
			p2.setRetraso("No hubo retraso");
			p2.setUsuario(user);
			if (pedidos.getCestaId2() == null){
				p2s = this.meterCarrito(carrito, p2);
			} else {
				p2s = this.meterCesta(pedidos.getCestaId2(), p2);
			}
			facturaService.createAndSaveFactura(null, p2s, importeTotal(p2s), new Date());
		}

		if(pedidos.getDireccion3() != null){
			Pedido p3 = new Pedido();
			p3.setCpostal(pedidos.getCpostal3());
			p3.setDireccion(pedidos.getDireccion3());
			p3.setFechaEnvio(pedidos.getFechaEnvio3());
			p3.setHoraEnvioFin(pedidos.getHoraEnvioFin3());
			p3.setHoraEnvioIni(pedidos.getHoraEnvioIni3());
			p3.setPoblacion(pedidos.getPoblacion3());
			p3.setProvincia(pedidos.getProvincia3());
			
			p3.setFechaHoraPedido(now);
			p3.setNombre("Pedido num. " + p3.getId());
			p3.setOrdenEntrega(3);
			p3.setRetraso("No hubo retraso");
			p3.setUsuario(user);
			if (pedidos.getCestaId3() == null){
				p3s = this.meterCarrito(carrito, p3);
			} else {
				p3s = this.meterCesta(pedidos.getCestaId3(), p3);
			}
			facturaService.createAndSaveFactura(null, p3s, importeTotal(p3s), new Date());
		}

		if(pedidos.getDireccion4() != null){
			Pedido p4 = new Pedido();
			p4.setCpostal(pedidos.getCpostal4());
			p4.setDireccion(pedidos.getDireccion4());
			p4.setFechaEnvio(pedidos.getFechaEnvio4());
			p4.setHoraEnvioFin(pedidos.getHoraEnvioFin4());
			p4.setHoraEnvioIni(pedidos.getHoraEnvioIni4());
			p4.setPoblacion(pedidos.getPoblacion4());
			p4.setProvincia(pedidos.getProvincia4());
			
			p4.setFechaHoraPedido(now);
			p4.setNombre("Pedido num. " + p4.getId());
			p4.setOrdenEntrega(4);
			p4.setRetraso("No hubo retraso");
			p4.setUsuario(user);
			if (pedidos.getCestaId4() == null){
				p4s = this.meterCarrito(carrito, p4);
			} else {
				p4s = this.meterCesta(pedidos.getCestaId4(), p4);
			}
			facturaService.createAndSaveFactura(null, p4s, importeTotal(p4s), new Date());
		}
		List<Pedido> res = Arrays.asList(p1s,p2s,p3s,p4s);
		session.setAttribute("SESSION_CARRITO", new HashMap<Producto, Integer>());
		return ResponseEntity.ok(res);

	}

	private double importeTotal(Pedido pedido) {
		double total = 0.0;
		
		List<CestaProducto> lista = cpService.findProdsByCesta(pedido);
		for (CestaProducto prod : lista) {
			total += prod.getProducto().getPrecioIva() * prod.getCantidad();
		}
		
		return total;
	}
	
	public Pedido meterCarrito(Map<Producto, Integer> carrito, Pedido p){
		Pedido guardado = this.pedidoService.save(p);
		List<Producto> keys = new ArrayList<>(carrito.keySet());
		for(Producto prod : keys){
			CestaProducto cp = new CestaProducto();
			cp.setProducto(prod);
			cp.setCantidad(carrito.get(prod));
			cp.setCesta(guardado);
			cp.setId(prod, guardado);
			this.cpService.save(cp);
		}
		return guardado;
	}

	public Pedido meterCesta(int idCesta, Pedido p){
		Pedido guardado = this.pedidoService.save(p);
		List<CestaProducto> cpCesta = this.cpService.cpPorCesta(idCesta);
		for(CestaProducto cp : cpCesta){
			CestaProducto pedidoProducto = new CestaProducto();
			pedidoProducto.setProducto(cp.getProducto());
			pedidoProducto.setCantidad(cp.getCantidad());
			pedidoProducto.setCesta(guardado);
			pedidoProducto.setId(cp.getProducto(), guardado);
			this.cpService.save(pedidoProducto);
		}
		return guardado;
	}

}

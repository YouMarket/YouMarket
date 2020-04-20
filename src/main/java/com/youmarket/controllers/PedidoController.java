package com.youmarket.controllers;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.google.gson.Gson;
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
import com.youmarket.services.ProductoService;
import com.youmarket.services.SuscripcionService;
import com.youmarket.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	private ProductoService productoService;
	
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
	
	
	
	@PostMapping("/create")
	public ResponseEntity<List<Pedido>> createPedidos(@RequestBody Map<String, Object> frontdata, @CurrentUser UserPrincipal currentUser) throws URISyntaxException {

		List<LinkedHashMap> carrito = (List<LinkedHashMap>)frontdata.get("carrito");
		Usuario user = this.usuarioService.findById(currentUser.getId()).orElse(null);
		Date now = new Date();
		String s = frontdata.get("pedidoForm").toString();
		FormPedidos pedidos = new FormPedidos();
		s = s.replaceAll("[{]", "");
		s = s.replaceAll("[}]", "");
		Map<String, String> myMap = new HashMap<String, String>();
		String[] pairs = s.split(", ");
		for (int i=0;i<pairs.length;i++) {
		    String pair = pairs[i];
		    String[] keyValue = pair.split("=");
		    myMap.put(keyValue[0], keyValue[1]);
		}
		if(!myMap.get("poblacion1").equals("null")) {
			pedidos.setPoblacion1(myMap.get("poblacion1"));			
		}
		if(!myMap.get("poblacion2").equals("null")) {
			pedidos.setPoblacion2(myMap.get("poblacion2"));			
		}
		if(!myMap.get("poblacion3").equals("null")) {
			pedidos.setPoblacion3(myMap.get("poblacion3"));			
		}
		if(!myMap.get("poblacion4").equals("null")) {
			pedidos.setPoblacion4(myMap.get("poblacion4"));			
		}
		if(!myMap.get("direccion1").equals("null")) {
			pedidos.setDireccion1(myMap.get("direccion1"));			
		}
		if(!myMap.get("direccion2").equals("null")) {
			pedidos.setDireccion2(myMap.get("direccion2"));			
		}
		if(!myMap.get("direccion3").equals("null")) {
			pedidos.setDireccion3(myMap.get("direccion3"));			
		}
		if(!myMap.get("direccion4").equals("null")) {
			pedidos.setDireccion4(myMap.get("direccion4"));			
		}
		if(!myMap.get("cpostal1").equals("null")) {
			pedidos.setCpostal1(myMap.get("cpostal1"));			
		}
		if(!myMap.get("cpostal2").equals("null")) {
			pedidos.setCpostal2(myMap.get("cpostal2"));
		}
		if(!myMap.get("cpostal3").equals("null")) {
			pedidos.setCpostal3(myMap.get("cpostal3"));
		}
		if(!myMap.get("cpostal4").equals("null")) {
			pedidos.setCpostal4(myMap.get("cpostal4"));
		}
		if(!myMap.get("horaEnvioFin1").equals("null")) {
			pedidos.setHoraEnvioFin1(new Integer(myMap.get("horaEnvioFin1")));
		}
		if(!myMap.get("horaEnvioFin2").equals("null")) {
			pedidos.setHoraEnvioFin2(new Integer(myMap.get("horaEnvioFin2")));
		}
		if(!myMap.get("horaEnvioFin3").equals("null")) {
			pedidos.setHoraEnvioFin3(new Integer(myMap.get("horaEnvioFin3")));
		}
		if(!myMap.get("horaEnvioFin4").equals("null")) {
			pedidos.setHoraEnvioFin4(new Integer(myMap.get("horaEnvioFin4")));
		}
		if(!myMap.get("fechaEnvio1").equals("null")) {
			try {
				pedidos.setFechaEnvio1(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio1")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("fechaEnvio2").equals("null")) {
			try {
				pedidos.setFechaEnvio2(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio2")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("fechaEnvio3").equals("null")) {
			try {
				pedidos.setFechaEnvio3(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio3")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("fechaEnvio4").equals("null")) {
			try {
				pedidos.setFechaEnvio4(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio4")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("horaEnvioIni1").equals("null")) {
			pedidos.setHoraEnvioIni1(new Integer(myMap.get("horaEnvioIni1")));
		}
		if(!myMap.get("horaEnvioIni2").equals("null")) {
			pedidos.setHoraEnvioIni2(new Integer(myMap.get("horaEnvioIni2")));
		}
		if(!myMap.get("horaEnvioIni3").equals("null")) {
			pedidos.setHoraEnvioIni3(new Integer(myMap.get("horaEnvioIni3")));
		}
		if(!myMap.get("horaEnvioIni4").equals("null")) {
			pedidos.setHoraEnvioIni4(new Integer(myMap.get("horaEnvioIni4")));
		}
		if(!myMap.get("provincia1").equals("null")) {
			pedidos.setProvincia1(myMap.get("provincia1"));
		}
		if(!myMap.get("provincia2").equals("null")) {
			pedidos.setProvincia2(myMap.get("provincia2"));
		}
		if(!myMap.get("provincia3").equals("null")) {
			pedidos.setProvincia3(myMap.get("provincia3"));
		}
		if(!myMap.get("provincia4").equals("null")) {
			pedidos.setProvincia4(myMap.get("provincia4"));
		}
		
		
		
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
		return ResponseEntity.ok(res);

	}
	
	@PostMapping("/precio")
    public ResponseEntity<Double> precioTtal(@RequestBody Map<String, Object> putamierda) {
		Date now = new Date();
		List<LinkedHashMap> carrito = (List<LinkedHashMap>)putamierda.get("carrito");
		String s = putamierda.get("pedidoForm").toString();
		
		FormPedidos pedidos = new FormPedidos();
		try {
		s = s.replaceAll("[{]", "");
		s = s.replaceAll("[}]", "");
		Map<String, String> myMap = new HashMap<String, String>();
		String[] pairs = s.split(", ");
		for (int i=0;i<pairs.length;i++) {
		    String pair = pairs[i];
		    String[] keyValue = pair.split("=");
		    myMap.put(keyValue[0], keyValue[1]);
		}
		if(!myMap.get("poblacion1").equals("null")) {
			pedidos.setPoblacion1(myMap.get("poblacion1"));			
		}
		if(!myMap.get("poblacion2").equals("null")) {
			pedidos.setPoblacion2(myMap.get("poblacion2"));			
		}
		if(!myMap.get("poblacion3").equals("null")) {
			pedidos.setPoblacion3(myMap.get("poblacion3"));			
		}
		if(!myMap.get("poblacion4").equals("null")) {
			pedidos.setPoblacion4(myMap.get("poblacion4"));			
		}
		if(!myMap.get("direccion1").equals("null")) {
			pedidos.setDireccion1(myMap.get("direccion1"));			
		}
		if(!myMap.get("direccion2").equals("null")) {
			pedidos.setDireccion2(myMap.get("direccion2"));			
		}
		if(!myMap.get("direccion3").equals("null")) {
			pedidos.setDireccion3(myMap.get("direccion3"));			
		}
		if(!myMap.get("direccion4").equals("null")) {
			pedidos.setDireccion4(myMap.get("direccion4"));			
		}
		if(!myMap.get("cpostal1").equals("null")) {
			pedidos.setCpostal1(myMap.get("cpostal1"));			
		}
		if(!myMap.get("cpostal2").equals("null")) {
			pedidos.setCpostal2(myMap.get("cpostal2"));
		}
		if(!myMap.get("cpostal3").equals("null")) {
			pedidos.setCpostal3(myMap.get("cpostal3"));
		}
		if(!myMap.get("cpostal4").equals("null")) {
			pedidos.setCpostal4(myMap.get("cpostal4"));
		}
		if(!myMap.get("horaEnvioFin1").equals("null")) {
			pedidos.setHoraEnvioFin1(new Integer(myMap.get("horaEnvioFin1")));
		}
		if(!myMap.get("horaEnvioFin2").equals("null")) {
			pedidos.setHoraEnvioFin2(new Integer(myMap.get("horaEnvioFin2")));
		}
		if(!myMap.get("horaEnvioFin3").equals("null")) {
			pedidos.setHoraEnvioFin3(new Integer(myMap.get("horaEnvioFin3")));
		}
		if(!myMap.get("horaEnvioFin4").equals("null")) {
			pedidos.setHoraEnvioFin4(new Integer(myMap.get("horaEnvioFin4")));
		}
		if(!myMap.get("fechaEnvio1").equals("null")) {
			try {
				pedidos.setFechaEnvio1(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio1")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("fechaEnvio2").equals("null")) {
			try {
				pedidos.setFechaEnvio2(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio2")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("fechaEnvio3").equals("null")) {
			try {
				pedidos.setFechaEnvio3(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio3")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("fechaEnvio4").equals("null")) {
			try {
				pedidos.setFechaEnvio4(new SimpleDateFormat("yyyy-MM-dd").parse(myMap.get("fechaEnvio4")));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(!myMap.get("horaEnvioIni1").equals("null")) {
			pedidos.setHoraEnvioIni1(new Integer(myMap.get("horaEnvioIni1")));
		}
		if(!myMap.get("horaEnvioIni2").equals("null")) {
			pedidos.setHoraEnvioIni2(new Integer(myMap.get("horaEnvioIni2")));
		}
		if(!myMap.get("horaEnvioIni3").equals("null")) {
			pedidos.setHoraEnvioIni3(new Integer(myMap.get("horaEnvioIni3")));
		}
		if(!myMap.get("horaEnvioIni4").equals("null")) {
			pedidos.setHoraEnvioIni4(new Integer(myMap.get("horaEnvioIni4")));
		}
		if(!myMap.get("provincia1").equals("null")) {
			pedidos.setProvincia1(myMap.get("provincia1"));
		}
		if(!myMap.get("provincia2").equals("null")) {
			pedidos.setProvincia2(myMap.get("provincia2"));
		}
		if(!myMap.get("provincia3").equals("null")) {
			pedidos.setProvincia3(myMap.get("provincia3"));
		}
		if(!myMap.get("provincia4").equals("null")) {
			pedidos.setProvincia4(myMap.get("provincia4"));
		}
		
		if(myMap.containsKey("cestaId1")) {
			pedidos.setCestaId1(new Integer(myMap.get("cestaId1")));
		}
		if(myMap.containsKey("cestaId2")) {
			pedidos.setCestaId2(new Integer(myMap.get("cestaId2")));
		}
		if(myMap.containsKey("cestaId3")) {
			pedidos.setCestaId3(new Integer(myMap.get("cestaId3")));
		}
		if(myMap.containsKey("cestaId4")) {
			pedidos.setCestaId4(new Integer(myMap.get("cestaId4")));
		}
			
		}catch(Exception e) {
			ResponseEntity<Double> n = ResponseEntity.ok(0.0);
			return n;
		}
		
		Double res = 0.0;
		
		if(pedidos.getCestaId1() != null) {
			List<CestaProducto> cp = this.cpService.cpPorCesta(pedidos.getCestaId1());
			for(CestaProducto cestop : cp) {
				res = res + cestop.getCantidad() * cestop.getProducto().getPrecioIva();
			}
		}
		if(pedidos.getCestaId2() != null) {
			List<CestaProducto> cp2 = this.cpService.cpPorCesta(pedidos.getCestaId2());
			for(CestaProducto cestop2 : cp2) {
				res = res + cestop2.getCantidad() * cestop2.getProducto().getPrecioIva();
			}
		}
		if(pedidos.getCestaId3() != null) {
			List<CestaProducto> cp3 = this.cpService.cpPorCesta(pedidos.getCestaId3());
			for(CestaProducto cestop3 : cp3) {
				res = res + cestop3.getCantidad() * cestop3.getProducto().getPrecioIva();
			}
		}
		if(pedidos.getCestaId4() != null) {
			List<CestaProducto> cp4 = this.cpService.cpPorCesta(pedidos.getCestaId4());
			for(CestaProducto cestop4 : cp4) {
				res = res + cestop4.getCantidad() * cestop4.getProducto().getPrecioIva();
			}
		}
		
		Integer cuentaCarros = 0;
		
		if(pedidos.getFechaEnvio1() != null) {
			cuentaCarros++;
		}
		if(pedidos.getFechaEnvio2() != null) {
			cuentaCarros++;
		}
		if(pedidos.getFechaEnvio3() != null) {
			cuentaCarros++;
		}
		if(pedidos.getFechaEnvio4() != null) {
			cuentaCarros++;
		}
		
		if(pedidos.getCestaId1() != null && pedidos.getCestaId1() != 0) {
			cuentaCarros--;
		}
		if(pedidos.getCestaId2() != null && pedidos.getCestaId2() != 0) {
			cuentaCarros--;
		}
		if(pedidos.getCestaId3() != null && pedidos.getCestaId3() != 0) {
			cuentaCarros--;
		}
		if(pedidos.getCestaId4() != null && pedidos.getCestaId4() != 0) {
			cuentaCarros--;
		}
		
		Double precioCarros = 0.0;
		for(LinkedHashMap cosa : carrito) {
			Producto pr = new Producto();
			Integer cantidad = (Integer) cosa.get("cantidad");
			LinkedHashMap produs = (LinkedHashMap)cosa.get("producto");
			Integer id = new Integer((int) produs.get("id"));
			pr = this.productoService.findById(id);
			precioCarros = precioCarros + (pr.getPrecioIva() * cantidad);
		}
		
		res = res + precioCarros * cuentaCarros;
		res = PedidoController.redondearDecimales(res, 2);
		return ResponseEntity.ok(res);
    }

	 public static double redondearDecimales(double valorInicial, int numeroDecimales) {
	        double parteEntera, resultado;
	        resultado = valorInicial;
	        parteEntera = Math.floor(resultado);
	        resultado=(resultado-parteEntera)*Math.pow(10, numeroDecimales);
	        resultado=Math.round(resultado);
	        resultado=(resultado/Math.pow(10, numeroDecimales))+parteEntera;
	        return resultado;
	    }
//	@GetMapping("/{id}")
//    public ResponseEntity<Object> pedidoPorId(@Valid @PathVariable Integer id) {
//        return ResponseEntity.ok(pedidoService.findById(id));
//    }

	private double importeTotal(Pedido pedido) {
		double total = 0.0;
		
		List<CestaProducto> lista = cpService.findProdsByCesta(pedido);
		for (CestaProducto prod : lista) {
			total += prod.getProducto().getPrecioIva() * prod.getCantidad();
		}
		
		return total;
	}
	
	// public Pedido meterCarrito(Map<Producto, Integer> carrito, Pedido p){
	// 	Pedido guardado = this.pedidoService.save(p);
	// 	List<Producto> keys = new ArrayList<>(carrito.keySet());
	// 	for(Producto prod : keys){
	// 		CestaProducto cp = new CestaProducto();
	// 		cp.setProducto(prod);
	// 		cp.setCantidad(carrito.get(prod));
	// 		cp.setCesta(guardado);
	// 		cp.setId(prod, guardado);
	// 		this.cpService.save(cp);
	// 	}
	// 	return guardado;
	// }

	public Pedido meterCarrito(List<LinkedHashMap> carrito, Pedido p){
		Pedido guardado = this.pedidoService.save(p);
		List<ProductoCarrito> carritoReal = new ArrayList<ProductoCarrito>();
		for(LinkedHashMap cosa : carrito) {
			Producto pr = new Producto();
			Integer cantidad = (Integer) cosa.get("cantidad");
			LinkedHashMap produs = (LinkedHashMap)cosa.get("producto");
			Integer id = new Integer((int) produs.get("id"));
			pr = this.productoService.findById(id);
			ProductoCarrito x = new ProductoCarrito();
			x.setProducto(pr);
			x.setCantidad(cantidad);
			carritoReal.add(x);
		}
		for(ProductoCarrito prod : carritoReal){
			CestaProducto cp = new CestaProducto();
			cp.setProducto(prod.getProducto());
			cp.setCantidad(prod.getCantidad());
			cp.setCesta(guardado);
			cp.setId(prod.getProducto(), guardado);
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

package com.youmarket.controllers;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Producto;
import com.youmarket.domain.ProductoCarrito;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.CestaService;
import com.youmarket.services.ProductoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class CarritoSessionController {

	@Autowired
	ProductoService productoService;

	@Autowired
	CestaProductoService cpService;

	@Autowired
	CestaService cestaService;

	public List<ProductoCarrito> listCarrito(Map<Producto, Integer> m){
        List<ProductoCarrito> res = new ArrayList<>();
        for(Producto p: m.keySet()){
            ProductoCarrito pc = new ProductoCarrito(p, m.get(p));
            res.add(pc);
        }
        return res;
    }

	@GetMapping("/carrito")
	public ResponseEntity<List<ProductoCarrito>> carritoGet(HttpSession session){
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		if(carrito == null){
			carrito = new HashMap<>();
		}
		return ResponseEntity.ok(this.listCarrito(carrito));
	}

	@PostMapping("/carrito")
	public List<ProductoCarrito> carritoPost(@RequestBody Map<String,Integer> postProducto, HttpServletRequest request, HttpSession session){
		Producto p = this.productoService.findById(postProducto.get("postId"));
		int cantidad = postProducto.get("postCantidad");
		if(cantidad == 0){
			return null;
		}
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		if(carrito == null){
			carrito = new HashMap<>();
		}
		if (carrito.keySet().contains(p)){
			carrito.put(p, carrito.get(p) + cantidad);
		} else {
			carrito.put(p, cantidad);
		}
		request.getSession().setAttribute("SESSION_CARRITO", carrito);
		return this.listCarrito(carrito);
	}

	@PostMapping("/eliminarProducto")
	public List<ProductoCarrito> eliminarProducto(@RequestBody Map<String, Integer> postProducto, HttpServletRequest request, HttpSession session){
		Producto p = this.productoService.findById(postProducto.get("postId"));
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		if (carrito.keySet().contains(p)){
			carrito.remove(p);
		} else {
			return null;
		}
		request.getSession().setAttribute("SESSION_CARRITO", carrito);
		return this.listCarrito(carrito);
	}

	@PostMapping("/carritoDestroy")
	public String destroySession(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/";
	}

	@PostMapping("/cestaACarrito")
	public List<ProductoCarrito> cestaACarrito(@RequestBody Map<String,String> postCesta, HttpServletRequest request, HttpSession session){
		List<CestaProducto> productos = this.cpService.cpPorCesta(Integer.valueOf(postCesta.get("id")));
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carritoSession = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		if(carritoSession == null){
			carritoSession = new HashMap<>();
		}
		for(CestaProducto cp : productos){
			Producto p = cp.getProducto();
			int cantidad = cp.getCantidad();
			if (carritoSession.keySet().contains(p)){
				carritoSession.put(p, carritoSession.get(p) + cantidad);
			} else {
				carritoSession.put(p, cantidad);
			}
		}
		request.getSession().setAttribute("SESSION_CARRITO", carritoSession);
		return this.listCarrito(carritoSession);
	}

	@PostMapping("/carritoACesta")
	public Cesta carritoACesta(@RequestBody Map<String,String> postCesta, HttpServletRequest request, HttpSession session, @CurrentUser UserPrincipal currentUser){
		Cesta c = (Cesta)this.cestaService.findById(Integer.valueOf(postCesta.get("id")), currentUser);
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		List<Producto> keys = new ArrayList<>(carrito.keySet());
		for(Producto prod : keys){
			CestaProducto cp = new CestaProducto();
			cp.setProducto(prod);
			cp.setCantidad(carrito.get(prod));
			cp.setCesta(c);
			cp.setId(prod, c);
			System.out.println(cp.getCesta().getId());
			this.cpService.save(cp);
			
		}
		request.getSession().setAttribute("SESSION_CARRITO", carrito);
		return c;
	}

	@GetMapping("/precioTotalCarrito")
	public Double precioTotal(HttpServletRequest request, HttpSession session){
		Double precio = 0.0;
		@SuppressWarnings("unchecked")
		Map<Producto, Integer> carrito = (Map<Producto, Integer>)session.getAttribute("SESSION_CARRITO");
		List<Producto> productos = new ArrayList<>(carrito.keySet());
		for(Producto p: productos){
			precio+= p.getPrecio() * carrito.get(p);
		}
		
		BigDecimal importeIVA =  new BigDecimal(precio);
		return importeIVA.setScale(2, RoundingMode.HALF_UP).doubleValue();
	}
	

}


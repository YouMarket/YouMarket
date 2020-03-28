package com.youmarket.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.youmarket.domain.Producto;
import com.youmarket.domain.ProductoCarrito;
import com.youmarket.services.ProductoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class CarritoSessionController {

	// @Autowired
	// CestaProductoService service;

    // @GetMapping("/carrito")
    // public ResponseEntity<List<CestaProducto>> carritoGet(HttpSession session) {
	// 	@SuppressWarnings("unchecked")
    //     List<CestaProducto> carrito = (List<CestaProducto>)session.getAttribute("MY_SESSION_CARRITO");
		
    //     if(carrito == null){
    //         carrito = new ArrayList<>();
	// 	}
	// 	carrito.addAll(service.findAll());
	// 	System.out.println(carrito);
	// 	return ResponseEntity.ok(carrito);
		
    // }

    // @PostMapping("/carrito")
	// public List<CestaProducto> carritoPost(@RequestBody List<CestaProducto> productos,
	// 		HttpServletRequest request) {
	// 	@SuppressWarnings("unchecked")
	// 	List<CestaProducto> carrito = new ArrayList<>(productos);
	// 	request.getSession().setAttribute("MY_SESSION_CARRITO", carrito);
	// 	return carrito;
    // }

	@Autowired
	ProductoService productoService;

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
	public List<ProductoCarrito> carritoPost(@RequestBody List<Integer> postProducto, HttpServletRequest request, HttpSession session){
		Producto p = this.productoService.findById(postProducto.get(0));
		int cantidad = postProducto.get(1);
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
		if(carrito != null){
			List<Producto> keys = new ArrayList<>(carrito.keySet());
		}
		request.getSession().setAttribute("SESSION_CARRITO", carrito);
		return this.listCarrito(carrito);
	}

	@PostMapping("/carritoDestroy")
	public String destroySession(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/";
	}

	@GetMapping("/prueba")
	public Map<Producto, Integer> prueba(){
		Map<Producto, Integer> res = new HashMap<>();
		Producto producto1 = new Producto(1,"droga", 23.0);
		Producto producto2 = new Producto(1,"beber", 21.0);
		Producto producto3 = new Producto(1,"juanla", 27.0);
;		res.put(producto1, 4);
		res.put(producto2, 6);
		res.put(producto3, 12);
		return res;
	}
}


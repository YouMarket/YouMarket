package com.youmarket.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.youmarket.domain.CestaProducto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class CarritoSessionController {

    @GetMapping("/carrito")
    public ResponseEntity<List<CestaProducto>> carritoGet(HttpSession session) {
		@SuppressWarnings("unchecked")
        List<CestaProducto> carrito = (List<CestaProducto>)session.getAttribute("MY_SESSION_CARRITO");

        if(carrito == null){
            carrito = new ArrayList<>();
		}
		System.out.println(carrito);
		return ResponseEntity.ok(carrito);
		
    }

    @PostMapping("/carrito")
	public List<CestaProducto> carritoPost(@RequestBody List<CestaProducto> productos,
			HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		List<CestaProducto> carrito = new ArrayList<>(productos);
		request.getSession().setAttribute("MY_SESSION_CARRITO", carrito);
		return carrito;
    }
    
    @PostMapping("/carritoDestroy")
	public String destroySession(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/";
	}
}


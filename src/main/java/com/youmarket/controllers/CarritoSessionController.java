package com.youmarket.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.youmarket.domain.CestaProducto;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CarritoSessionController {

    @GetMapping("/")
    public String process(Model model, HttpSession session){
        @SuppressWarnings("unchecked")
        List<CestaProducto> carrito = (List<CestaProducto>)session.getAttribute("MY_SESSION_CARRITO");

        if(carrito == null){
            carrito = new ArrayList<>();
        }
        model.addAttribute("carrito", carrito);
        return "index";
    }

    @PostMapping("/carritoSession")
	public String carritoSession(@RequestParam("productos") List<CestaProducto> productos, HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		List<CestaProducto> carrito = (List<CestaProducto>) request.getSession().getAttribute("MY_SESSION_CARRITO");
		if (carrito == null) {
			carrito = new ArrayList<>();
			request.getSession().setAttribute("MY_SESSION_CARRITO", carrito);
		}
		carrito.addAll(productos);
		request.getSession().setAttribute("MY_SESSION_CARRITO", carrito);
		return "redirect:/";
    }
    
    @PostMapping("/carritoDestroy")
	public String destroySession(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/";
	}

}


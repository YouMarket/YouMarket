package com.youmarket.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.youmarket.domain.Producto;

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
        List<Producto> productos = (List<Producto>)session.getAttribute("MY_SESSION_PRODUCTOS");

        if(productos == null){
            productos = new ArrayList<>();
        }
        model.addAttribute("productos", productos);
        return "index";
    }

    @PostMapping("/carritoSession")
	public String carritoSession(@RequestParam("productos") List<Producto> productos, HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		List<Producto> productSession = (List<Producto>) request.getSession().getAttribute("MY_SESSION_PRODUCTOS");
		if (productSession == null) {
			productSession = new ArrayList<>();
			request.getSession().setAttribute("MY_SESSION_PRODUCTOS", productSession);
		}
		productSession.addAll(productos);
		request.getSession().setAttribute("MY_SESSION_PRODUCTOS", productSession);
		return "redirect:/";
    }
    
    @PostMapping("/carritoDestroy")
	public String destroySession(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/";
	}

}


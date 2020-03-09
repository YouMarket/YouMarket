
package com.youmarket.controllers;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Producto;
import com.youmarket.services.ProductoService;

@RestController
@RequestMapping("producto")
public class ProductoController {

	@Autowired
	private ProductoService productService;
	
	@RequestMapping("/list")
	public List<Producto> listProductos(Model model){
		List<Producto> productos=productService.listaProductos();
		
		return productos;
	}
	
//	@RequestMapping("/new")
//	public String listProductos(Model model){
//		List<Producto> productos=productService.listaProductos();
//		model.addAttribute("productos", productos);
//		
//		return "listaProductos";
//	}
}

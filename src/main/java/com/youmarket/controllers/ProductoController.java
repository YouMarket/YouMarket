package com.youmarket.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Dieta;
import com.youmarket.domain.Marca;
import com.youmarket.domain.Producto;
import com.youmarket.domain.Supermercado;
import com.youmarket.services.DietaService;
import com.youmarket.services.ProductoService;

@RestController
@RequestMapping("producto")
public class ProductoController {

	@Autowired
	private ProductoService productoService;

	@Autowired
	private DietaService dietaService;

	@RequestMapping("/list")
	public List<Producto> listProductos(Model model) {
		List<Producto> productos = productoService.listaProductos();

		return productos;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> productoPorId(@Valid @PathVariable Integer id) {
		return ResponseEntity.ok(productoService.findById(id));
	}

	@RequestMapping("/dieta/list/{id}")
	public List<Producto> listProductosByDiet(@PathVariable Integer id) {
		Dieta di = this.dietaService.findById(id);
		List<Producto> productos = di.getProductos();
		return productos;
	}

	@RequestMapping("/marcas")
	public List<Marca> listMarcas(Model model) {
		return productoService.getMarcas();
	}

	@RequestMapping("/supermercados")
	public List<Supermercado> listSupermercados(Model model) {
		return productoService.getSupermercados();
	}

}

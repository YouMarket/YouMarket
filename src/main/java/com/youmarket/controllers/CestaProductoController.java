package com.youmarket.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Producto;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.CestaService;


@RestController
@RequestMapping("/cesta")
public class CestaProductoController {

	@Autowired
	private CestaService cestaService;

	@Autowired
	private CestaProductoService cestaProductoService;

	@PostMapping("/new")
	public ResponseEntity<Cesta> createCesta(@Valid @RequestBody Cesta c) throws URISyntaxException{
		Cesta res = cestaService.save(c);
		return ResponseEntity.created(new URI ("/cesta/)" + res.getId())).body(res);
	}

	@PutMapping("/cesta/{id}")
	public ResponseEntity<Cesta> updateCesta(@Valid @RequestBody Cesta c, List<Producto> productos){
		Cesta res = cestaService.saveProductos(c, productos);
		return ResponseEntity.ok().body(res);
	}

	@GetMapping("/productos/{id}")
    public ResponseEntity<Object> cestaProductoPorId(@Valid @PathVariable Integer id, @CurrentUser UserPrincipal currentUser) {
        return ResponseEntity.ok(cestaProductoService.CestasProductoPorCestaId(id, currentUser));
    }

	@GetMapping("/productos/total/{id}")
    public ResponseEntity<Double> totalPorId(@Valid @PathVariable Integer id, @CurrentUser UserPrincipal currentUser) {
        return ResponseEntity.ok(cestaProductoService.totalPorCestaId(id, currentUser));
    }
	@RequestMapping("/productos/dieta/list/{id}")
	public List<CestaProducto> listProductosByDiet(@PathVariable Integer id){
		List<CestaProducto> cestaProductos=cestaProductoService.listaProductosByDiet(id);

		return cestaProductos;
	}

}

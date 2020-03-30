package com.youmarket.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.Producto;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.form.FormCesta;
import com.youmarket.repositories.CestaRepository;
import com.youmarket.services.CestaService;
import com.youmarket.services.ProductoService;
import com.youmarket.services.UsuarioService;

import ch.qos.logback.classic.Logger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/cesta")
public class CestaController {
	@Autowired
	private CestaService cestaService;

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping
    public ResponseEntity<Cesta> create(@RequestBody FormCesta c, @CurrentUser UserPrincipal currentUser) {
		Cesta nc =cestaService.creaCesta(c, currentUser);
		nc=cestaService.save(nc);

		URI location= ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(nc.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

	@GetMapping("/user")
    public ResponseEntity<List<Cesta>> cestasPorUsuario(@CurrentUser UserPrincipal currentUser) {
		Integer id=currentUser.getId();
        return ResponseEntity.ok(cestaService.cestasPorUsuario(id));
    }

	@GetMapping("/{id}")
    public ResponseEntity<Object> cestaPorId(@Valid @PathVariable Integer id, @CurrentUser UserPrincipal currentUser) {
        return ResponseEntity.ok(cestaService.findById(id, currentUser));
    }

	@PutMapping("/{id}")
	public ResponseEntity<Cesta> update(@PathVariable Integer id, @Valid @RequestBody Cesta c) {

		 c.setId(id);
		 cestaService.save(c);



		 return ResponseEntity.noContent().build();
}

	@DeleteMapping("/{id}")
    public void borrarCestaPorId(@PathVariable Integer id, @CurrentUser UserPrincipal currentUser) {
       cestaService.borrarPorIdSeguro(id, currentUser);
    }

}

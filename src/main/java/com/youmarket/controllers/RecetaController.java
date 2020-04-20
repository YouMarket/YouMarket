package com.youmarket.controllers;

import java.util.List;

import javax.validation.Valid;

import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Receta;
import com.youmarket.domain.Usuario;
import com.youmarket.services.RecetaService;
import com.youmarket.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("receta")
public class RecetaController{

    @Autowired
    private RecetaService recetaService;

    @Autowired
    private UsuarioService usuarioService;
    
    @RequestMapping(value = "/list/{id}", method = RequestMethod.GET)
    public List<Receta> listaRecetas(@PathVariable Integer id, @CurrentUser UserPrincipal logged){
        Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		Assert.isTrue(user.getSuscripcion().isDietista());
        List<Receta> recetas = recetaService.findByDietaId(id);
        return recetas;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> recetaDetalle(@Valid @PathVariable Integer id, @CurrentUser UserPrincipal logged){
        Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		Assert.isTrue(user.getSuscripcion().isDietista());
        return ResponseEntity.ok(recetaService.findById(id));
    }

}
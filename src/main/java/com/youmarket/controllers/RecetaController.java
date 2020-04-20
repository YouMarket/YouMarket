package com.youmarket.controllers;

import java.util.List;

import javax.validation.Valid;

import com.youmarket.domain.Receta;
import com.youmarket.services.RecetaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("receta")
public class RecetaController{

    @Autowired
    private RecetaService recetaService;
    
    @RequestMapping(value = "/list/{id}", method = RequestMethod.GET)
    public List<Receta> listaRecetas(@Valid @PathVariable Integer id){
        List<Receta> recetas = recetaService.findByDietaId(id);
        return recetas;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> recetaDetalle(@Valid @PathVariable Integer id){
        return ResponseEntity.ok(recetaService.findById(id));
    }

}
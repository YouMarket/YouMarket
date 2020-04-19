package com.youmarket.controllers;

import java.util.List;

import javax.validation.Valid;

import com.youmarket.domain.Receta;
import com.youmarket.services.RecetaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("receta")
public class RecetaController{

    @Autowired
    private RecetaService recetaService;
    
    @RequestMapping("/list")
    public List<Receta> listaRecetas(@RequestParam ("id")int dietaId){
        List<Receta> recetas = recetaService.findByDietaId(dietaId);
        return recetas;
    }

    @RequestMapping("/{id}")
    public ResponseEntity<Object> recetaDetalle(@Valid @PathVariable Integer id){
        return ResponseEntity.ok(recetaService.findById(id));
    }

}
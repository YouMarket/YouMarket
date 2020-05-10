package com.youmarket.services;

import java.util.List;

import javax.validation.Valid;

import com.youmarket.domain.Receta;
import com.youmarket.repositories.RecetaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecetaService {

    @Autowired
    private RecetaRepository recetaRepository;

    public List<Receta> findAll() {
        return this.recetaRepository.findAll();
    }

    public Receta findById(int id) {
        return this.recetaRepository.findById(id).orElse(null);
    }

    public List<Receta> findByDietaId(int dietaId) {
        return this.recetaRepository.recetasDeDietaId(dietaId);
    }

    public Receta save(@Valid Receta r) {
        return this.recetaRepository.save(r);
    }

    public void delete(Receta r) {
        this.recetaRepository.delete(r);
    }
}
package com.youmarket.repositories;

import java.util.List;

import com.youmarket.domain.Receta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecetaRepository extends JpaRepository<Receta, Integer> {

    @Query("select d.recetas from Dieta d where d.id = ?1")
    List<Receta> recetasDeDietaId(int dietaId);
}
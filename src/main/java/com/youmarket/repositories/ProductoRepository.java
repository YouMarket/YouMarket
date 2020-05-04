package com.youmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.youmarket.domain.Marca;
import com.youmarket.domain.Producto;
import com.youmarket.domain.Supermercado;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer>{

    @Query("select distinct p.marca from Producto p")
    public List<Marca> getMarcas();

    @Query("select distinct p.supermercado from Producto p")
    public List<Supermercado> getSupermercados();
}

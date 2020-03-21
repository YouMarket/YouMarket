package com.youmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youmarket.domain.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer>{

}

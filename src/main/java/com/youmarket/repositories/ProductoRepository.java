package com.youmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.youmarket.domain.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer>{

}

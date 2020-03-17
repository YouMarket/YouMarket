package com.youmarket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer>{

	@Query("select p from Producto p where p.supermercado.id = ?1")
	List<Producto> findAllBySupermercado(int id);

}

package com.youmarket.repositories;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Producto;

public interface CestaProductoRepository extends JpaRepository<CestaProducto, Integer>{

	@Query("select c from CestaProducto c where c.cesta.id=?1")
	List<CestaProducto> findByCestaId(int id);


}

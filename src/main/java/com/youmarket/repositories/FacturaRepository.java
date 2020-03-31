package com.youmarket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.Factura;
import com.youmarket.domain.Usuario;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {

	@Query("select factu from Factura factu where factu.usuario = ?1")
	List<Factura> findByuser(Usuario usua);

}

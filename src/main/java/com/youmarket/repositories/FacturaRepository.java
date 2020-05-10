package com.youmarket.repositories;

import java.util.List;

import com.youmarket.domain.Factura;
import com.youmarket.domain.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {

	@Query("select factu from Factura factu where factu.usuario = ?1 order by factu.fechaFactura desc")
	List<Factura> findByuser(Usuario usua);

	@Query("select factu from Factura factu where factu.pedido.usuario = ?1 order by factu.fechaFactura desc")
	List<Factura> findByUserFromPedido(Usuario usuario);

}

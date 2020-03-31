package com.youmarket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>{

	
	@Query("select pedido from Pedido pedido where pedido.usuario.id = ?1 order by pedido.fechaHoraPedido desc")
	public List<Pedido> findPedidoUsuario(int usuairo);
}

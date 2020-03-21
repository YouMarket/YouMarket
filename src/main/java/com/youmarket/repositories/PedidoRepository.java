package com.youmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youmarket.domain.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>{

}

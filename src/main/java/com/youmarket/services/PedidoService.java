package com.youmarket.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Pedido;
import com.youmarket.repositories.PedidoRepository;

@Service
public class PedidoService {
	
	@Autowired
	private PedidoRepository repo;

	public List<Pedido> listaPedidos(){
		
		return repo.findAll(); 
	}

	public Pedido save(Pedido p) {
		return repo.save(p);
	}

	public void delete() {
		// TODO Auto-generated method stub
		
	}

	public Pedido findById(int idPedido) {
		return repo.findById(idPedido).get();
	}
}

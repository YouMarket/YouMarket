package com.youmarket.services;

import java.util.List;
import java.util.Optional;

import com.youmarket.domain.Pedido;
import com.youmarket.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoService {

	@Autowired
	private PedidoRepository repo;

	public List<Pedido> listaPedidos() {

		return repo.findAll();
	}

	public List<Pedido> findAllByUser(int idUsuario) {
		return repo.findPedidoUsuario(idUsuario);
	}

	public Pedido save(Pedido p) {
		return repo.save(p);
	}

	public void delete() {
		// TODO Auto-generated method stub

	}

	public Pedido findById(int idPedido) {
		Optional<Pedido> pedido = repo.findById(idPedido);
		if (pedido.isPresent()) {
			return pedido.get();
		} else {
			return null;
		}

	}
}

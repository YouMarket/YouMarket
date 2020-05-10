package com.youmarket.services;

import java.util.List;

import com.youmarket.domain.Pago;
import com.youmarket.repositories.PagoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagoService {

	@Autowired
	private PagoRepository repo;

	public List<Pago> listaPagos() {
		return repo.findAll();
	}

	public Pago findById(int idProducto) {
		return repo.findById(idProducto).orElse(null);
	}

	public Pago save(Pago pago) {
		return repo.save(pago);
	}

	public void delete(Pago pago) {
		repo.delete(pago);
	}

}

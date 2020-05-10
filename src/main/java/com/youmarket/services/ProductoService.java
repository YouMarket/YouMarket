package com.youmarket.services;

import java.util.List;

import com.youmarket.domain.Marca;
import com.youmarket.domain.Producto;
import com.youmarket.domain.Supermercado;
import com.youmarket.repositories.ProductoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {

	@Autowired
	private ProductoRepository repo;

	public List<Producto> listaProductos() {

		return repo.findAll();
	}

	public Producto showProduct(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public int save(Producto p) {
		// TODO Auto-generated method stub
		return 0;
	}

	public void delete() {
		// TODO Auto-generated method stub

	}

	public Producto findById(int id) {
		return this.repo.findById(id).orElse(null);
	}

	public List<Marca> getMarcas() {
		return this.repo.getMarcas();
	}

	public List<Supermercado> getSupermercados() {
		return this.repo.getSupermercados();
	}
}

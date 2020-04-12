package com.youmarket.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Factura;
import com.youmarket.domain.Pedido;
import com.youmarket.domain.Usuario;
import com.youmarket.repositories.FacturaRepository;

@Service
public class FacturaService {
	
	@Autowired
	private FacturaRepository repo;

	public List<Factura> findByUser(Usuario usua){
		List<Factura> facts = repo.findByUserFromPedido(usua);
		facts.addAll(repo.findByuser(usua));
		
		return facts;
	}
	
	public Factura findLastSuscripcion(Usuario usuario) {
		List<Factura> facts = repo.findByuser(usuario);
		return facts.size()>0 ? facts.get(0) : null;
	}
	
	public List<Factura> findFromUser(Usuario usuario){
		return repo.findByuser(usuario);
	}
	
	public List<Factura> findByUserFromPedido(Usuario usuario){
		return repo.findByUserFromPedido(usuario);
	}
	
	public List<Factura> findAll() {
		return repo.findAll();
	}
	
	public Factura save(@Valid Factura dir) {
		return repo.save(dir);
	}
	
	public Factura createAndSaveFactura(Usuario user, Pedido p, double importe, Date fechaPago) {
		
		Factura f = new Factura();
		BigDecimal importeIVA =  new BigDecimal(importe);
		f.setTotalIva(importeIVA.setScale(2, RoundingMode.HALF_UP).doubleValue());
		BigDecimal importeSinIVA = new BigDecimal(importe*0.8);
		f.setTotal(importeSinIVA.setScale(2, RoundingMode.HALF_UP).doubleValue());
		f.setFechaFactura(fechaPago);
		f.setUsuario(user);
		f.setPedido(p);
		return repo.save(f);
	}
}
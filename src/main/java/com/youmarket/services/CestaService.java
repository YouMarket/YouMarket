package com.youmarket.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.form.FormCesta;
import com.youmarket.repositories.CestaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class CestaService {

	@Autowired
	private CestaRepository cestaRepository;

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private CestaProductoService cestaProductoService;

	//Para dashboard
	public Integer totalCestasCreadas(){

		return cestaRepository.totalCestas();
	}

	public List<Cesta> cestasPorUsuario(int userId){

		return cestaRepository.cestaPorUsuario(userId);
	}

	public Optional<Cesta> muestraCesta(int id) {
		// TODO Auto-generated method stub
		return cestaRepository.findById(id);
	}

	public Cesta save(Cesta c) {

		cestaRepository.save(c);

		return c;
	}

	public void deleteById(Cesta c)	 {

		cestaRepository.deleteById(c.getId());
	}

	public Cesta findById(Integer id, UserPrincipal currentUser) {
		Cesta res=null;
		Optional<Cesta> c=cestaRepository.findById(id);
		if(c.isPresent()) {
			Cesta c1=c.get();
			if(c1.getUsuario().getId()==currentUser.getId()) {
				res=c1;
			}
		}
		return res;
	}

	public Cesta creaCesta(FormCesta c, UserPrincipal cu) {
		Usuario User2=new Usuario();
		Optional<Usuario> user=usuarioService.findById(cu.getId());

		if(user.isPresent()) {
			User2=user.get();
		}

		Cesta nc=new Cesta();
		nc.setNombre(c.getName());
		nc.setUsuario(User2);
		return nc;

	}


	public void borrarPorIdSeguro(Integer id, UserPrincipal cu)	 {
		Optional<Cesta> c=this.cestaRepository.findById(id);
		Boolean hacked=false;

		if(c.isPresent()) {
			Cesta c1=c.get();
			if(c1.getUsuario().getId()!=cu.getId()) {
				hacked=true;
			}
		}
		if(hacked==false) {
			List<CestaProducto> cestasProductos=(List<CestaProducto>) cestaProductoService.CestasProductoPorCestaId(id, cu);
			if(cestasProductos.size()!=0) {
				cestaProductoService.deleteByCestaId(id);
			}
			cestasProductos=(List<CestaProducto>) cestaProductoService.CestasProductoPorCestaId(id, cu);
			if(cestasProductos.size()==0) {
				cestaRepository.deleteById(id);

		}}
	}

	public List<Cesta> cestasPorUsuarioLlenas(Integer id) {
		List<Cesta> res = cestaRepository.cestaPorUsuario(id);
		List<Cesta> res2 = new ArrayList<>();
		
		for(Cesta c:res) {
			if(this.cestaProductoService.cpPorCesta(c.getId()).size()!=0) {
				res2.add(c);
			}
		}
		return res2;
	}

}

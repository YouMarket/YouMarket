package com.youmarket.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Cesta;
import com.youmarket.domain.Producto;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.form.FormCesta;
import com.youmarket.repositories.CestaRepository;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class CestaService {
	
	@Autowired
	private CestaRepository cestaRepository;
	
	@Autowired
	private UsuarioService usuarioService;
	
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

	public Object findById(Integer id) {
		
		return cestaRepository.findById(id);
	}

	public Cesta creaCesta(FormCesta c) {
		Usuario User2=new Usuario();
		Optional<Usuario> user=usuarioService.userPorId(c.getUsuario());
		user.ifPresent(u -> {
		  User2.setApellidos(u.getApellidos());
		  User2.setPassword(u.getPassword());
		  User2.setCPostal(u.getCPostal());
		  User2.setDni(u.getDni());
		  User2.setFechaNacimiento(u.getFechaNacimiento());
		  User2.setId(u.getId());
		  User2.setNombre(u.getNombre());
		  User2.setTelefono(u.getTelefono());
		  User2.setEmail(u.getEmail());
		  User2.setRol(u.getRol());
		  User2.setSubscripcion(u.getSubscripcion());
		});
		
		Cesta nc=new Cesta();
		nc.setNombre(c.getName());
		nc.setUsuario(User2);
		return nc;
		
	}

}

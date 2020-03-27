package com.youmarket.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Usuario;
import com.youmarket.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repo;

	public List<Usuario> listaUsuarios(){
		
		return repo.findAll(); 
	}
	
	public Optional<Usuario> findUsuarioByLogin(String email, String password){
		return repo.findUsuarioByLogin(email, password);
	}

	
	public Usuario showProduct(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public int save(Usuario p) {
		// TODO Auto-generated method stub
		return 0;
	}

	public void delete() {
		// TODO Auto-generated method stub
		
	}
}

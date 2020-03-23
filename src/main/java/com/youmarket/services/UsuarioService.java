package com.youmarket.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Usuario;
import com.youmarket.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Optional<Usuario> userPorId(int id) {
		return usuarioRepository.findById(id);
	}

}

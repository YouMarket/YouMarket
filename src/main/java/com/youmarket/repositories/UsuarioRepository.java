package com.youmarket.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

	
	@Query("select usuario from Usuario usuario where email = ?1 and password = ?2")
	Optional<Usuario> findUsuarioByLogin(String email, String password);

	Optional<Usuario> findByEmail(String email);

	Boolean existsByEmail(String email);
	
}


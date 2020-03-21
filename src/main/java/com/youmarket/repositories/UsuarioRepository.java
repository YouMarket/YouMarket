package com.youmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youmarket.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

}

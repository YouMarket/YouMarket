package com.youmarket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.Direccion;
import com.youmarket.domain.Usuario;

public interface DireccionRepository extends JpaRepository<Direccion, Integer>{

	@Query("select dir from Direccion dir where dir.usuario = ?1")
	public List<Direccion> findAllByUser(Usuario usuario);
}

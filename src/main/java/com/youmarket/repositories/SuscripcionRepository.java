package com.youmarket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.youmarket.domain.Suscripcion;

public interface SuscripcionRepository  extends JpaRepository<Suscripcion, Integer>{

	
	@Query("select sus from Suscripcion sus where sus.dietista = TRUE")
	public List<Suscripcion> getSuscripcionesDietista();
}

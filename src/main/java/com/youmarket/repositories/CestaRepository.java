package com.youmarket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.youmarket.domain.Cesta;

@Repository
public interface CestaRepository extends JpaRepository<Cesta, Integer> {
	
	@Query("select count(c) from Cesta c")
	Integer totalCestas();
	
	@Query("select c from Cesta c where c.usuario.id=?1 and c not in (select p from Pedido p where p.usuario.id=?1)")
	List<Cesta> cestaPorUsuario(int id);

}

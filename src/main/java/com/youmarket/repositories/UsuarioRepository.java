package com.youmarket.repositories;

import java.util.Optional;

import com.youmarket.domain.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	@Query("select usuario from Usuario usuario where email = ?1 and password = ?2")
	Optional<Usuario> findUsuarioByLogin(String email, String password);

	Optional<Usuario> findByEmail(String email);

	Boolean existsByEmail(String email);

	@Query("select u.suscripcion.envios from Usuario u where u.id=?1")
	Integer getEnvios(Integer id);

	@Query("select count(p) from Pedido p where p.id=?1")
	Integer getPedidosHechos(Integer id);

}

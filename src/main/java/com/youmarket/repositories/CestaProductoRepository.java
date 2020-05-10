
package com.youmarket.repositories;

import java.util.List;

import com.youmarket.domain.CestaProducto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CestaProductoRepository extends JpaRepository<CestaProducto, Integer> {

	@Query("select c from CestaProducto c where c.cesta.id=?1")
	List<CestaProducto> findByCestaId(int id);

	@Transactional
	@Modifying
	@Query("delete from CestaProducto c where c.cesta.id=?1")
	void deleteByCestaId(int id);

}

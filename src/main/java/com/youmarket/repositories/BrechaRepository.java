package com.youmarket.repositories;

import com.youmarket.domain.Brecha;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrechaRepository extends JpaRepository<Brecha, Integer> {

}

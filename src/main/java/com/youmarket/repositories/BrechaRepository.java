package com.youmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.youmarket.domain.Brecha;

@Repository
public interface BrechaRepository extends JpaRepository<Brecha, Integer> {

}

package com.youmarket.repositories;

import java.util.Optional;

import com.youmarket.domain.Role;
import com.youmarket.domain.enums.RoleName;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(RoleName roleName);
}

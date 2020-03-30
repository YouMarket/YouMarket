package com.youmarket.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Role;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.repositories.RoleRepository;

@Service
public class RoleService {

	
	@Autowired
	private RoleRepository repo;

	public Optional<Role> findByName(RoleName role) {
		return repo.findByName(role);
	}
	
	
	
	
}

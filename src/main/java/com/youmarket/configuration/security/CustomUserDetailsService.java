package com.youmarket.configuration.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.youmarket.domain.Usuario;
import com.youmarket.exception.ResourceNotFoundException;
import com.youmarket.repositories.UsuarioRepository;

/**
 * 
 * @author alvaroesteban To authenticate a User or perform various role-based
 *         checks, Spring security needs to load users details somehow.
 *
 *         For this purpose, It consists of an interface called
 *         UserDetailsService which has a single method that loads a user based
 *         on email
 *
 *         Loads a user’s data given its email
 *
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UsuarioRepository userRepository;

    /**
     * Is used by Spring security
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Let people login with either username or email
        Usuario user = userRepository.findByEmail(usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + usernameOrEmail));

        return UserPrincipal.create(user);
    }

    /**
     * This method will be used by JWTAuthenticationFilter
     * 
     * @param id
     * @return
     */
    @Transactional
    public UserDetails loadUserById(Long id) {

        Optional<Usuario> user = userRepository.findById(id.intValue());
        if (!user.isPresent())
            throw new ResourceNotFoundException("Usuario", "id", id);

        return UserPrincipal.create(user.get());
    }
}
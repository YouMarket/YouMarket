package com.youmarket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.configuration.SecurityConfiguration;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.JwtAuthenticationResponse;
import com.youmarket.configuration.security.JwtTokenProvider;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Direccion;
import com.youmarket.domain.Pago;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.repositories.RoleRepository;
import com.youmarket.services.UsuarioService;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private SecurityConfiguration sc;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;
	
	@Autowired
	DireccionController direccionController;

	@PostMapping("/signIn")
	public ResponseEntity<?> login(@RequestBody Usuario usuario) {

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));

	}
	
	@GetMapping("/user/me")
    public Usuario getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		currentUser.getId();
		Usuario userSummary = usuarioService.findById(currentUser.getId()).get();
        return userSummary;
    }

	@PostMapping("/signUp")
	public Usuario signUp(@RequestBody Usuario usuario) {
		
		System.out.println("User pass: "+usuario.getPassword());
//		if(usuario.getSubscripcion() == ) {
//			
//		}
			
//		usuario.setRoles(RoleName.CLIENTE);
		usuario.setPassword(sc.passwordEncoder().encode(usuario.getPassword()));
		Usuario signUpped = usuarioService.save(usuario);
		System.out.println("User encoded pass: "+usuario.getPassword());
		return signUpped;
	}

	@PostMapping("/signUpAll")
	public Usuario signUp(@RequestBody Usuario usuario, @RequestBody Direccion dir, @RequestBody Pago pago) {
		
		System.out.println("User pass: "+usuario.getPassword());

		usuario.setPassword(sc.passwordEncoder().encode(usuario.getPassword()));
		Usuario signUpped = usuarioService.save(usuario);
		
		dir.setUsuario(signUpped);
		direccionController.saveNewDir(dir);
		
		System.out.println("User encoded pass: "+usuario.getPassword());
		return signUpped;
	}

	@GetMapping("/getUser")
	public Usuario getUser(@CurrentUser UserPrincipal currentUser) {
		return usuarioService.findById(currentUser.getId()).get();
	}
}

package com.youmarket.controllers;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.util.Collections;

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
import com.youmarket.configuration.response.ApiResponse;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.JwtAuthenticationResponse;
import com.youmarket.configuration.security.JwtTokenProvider;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Role;
import com.youmarket.domain.Suscripcion;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.domain.form.SignUpForm;
import com.youmarket.repositories.RoleRepository;
import com.youmarket.services.PagoService;
import com.youmarket.services.RoleService;
import com.youmarket.services.SuscripcionService;
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
	RoleService roleService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;
	
	@Autowired
	DireccionController direccionController;

	@Autowired
	private SuscripcionService suscripcionService;

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
		userSummary.setId(0);
		userSummary.setPassword(null);
        return userSummary;
    }

//	@PostMapping("/signUp")
//	public Usuario signUp(@RequestBody Usuario usuario) {
//		
//		Suscripcion sus = suscripcionService.findById(usuario.getSuscripcion().getId());
//		usuario.setSuscripcion(sus);
//		if(sus.isDietista()) {
//			Role userRole = roleService.findByName(RoleName.CLIENTE_CON_DIETAS).orElse(null);
//			usuario.setRoles(Collections.singleton(userRole));
//		}else {
//			Role userRole = roleService.findByName(RoleName.CLIENTE).orElse(null);
//			usuario.setRoles(Collections.singleton(userRole));
//		}
//		
//		usuario.setPassword(sc.passwordEncoder().encode(usuario.getPassword()));
//		Usuario signUpped = usuarioService.save(usuario);
//		return signUpped;
//	}

	@PostMapping("/signUpAll")
	public ResponseEntity<ApiResponse> signUpAll(@RequestBody SignUpForm form) throws MalformedURLException, URISyntaxException {
		
		ApiResponse respuesta = new ApiResponse();
		if(usuarioService.checkUsuariAvailability(form.getUsuario().getEmail())) {
			Usuario usuario = form.getUsuario();
			
			Suscripcion sus = suscripcionService.findById(usuario.getSuscripcion().getId());
			usuario.setSuscripcion(sus);
			if(sus.isDietista()) {
				Role userRole = roleService.findByName(RoleName.CLIENTE_CON_DIETAS).orElse(null);
				usuario.setRoles(Collections.singleton(userRole));
			}else {
				Role userRole = roleService.findByName(RoleName.CLIENTE).orElse(null);
				usuario.setRoles(Collections.singleton(userRole));
			}
			
			usuario.setPassword(sc.passwordEncoder().encode(usuario.getPassword()));
			usuarioService.save(usuario);
			
			if(form.getDir() != null) {
				form.getDir().setUsuario(usuario);
				form.getDir().setPrincipal(true);
				direccionController.saveNewDir(form.getDir());
			}
			
			respuesta.setSuccess(true);
			respuesta.setMessage("logado");
		}else {
			respuesta.setSuccess(false);
			respuesta.setMessage("El usuario ya existe");
		}
			
		return ResponseEntity.ok(respuesta);
	}

	@GetMapping("/getUser")
	public Usuario getUser(@CurrentUser UserPrincipal currentUser) {
		return usuarioService.findById(currentUser.getId()).get();
	}

}

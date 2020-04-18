package com.youmarket.controllers;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.youmarket.configuration.SecurityConfiguration;
import com.youmarket.configuration.response.ApiResponse;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.JwtAuthenticationResponse;
import com.youmarket.configuration.security.JwtTokenProvider;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Direccion;
import com.youmarket.domain.Role;
import com.youmarket.domain.Suscripcion;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.domain.form.SignUpForm;
import com.youmarket.repositories.RoleRepository;
import com.youmarket.services.DireccionService;
import com.youmarket.services.RoleService;
import com.youmarket.services.SuscripcionService;
import com.youmarket.services.UsuarioService;

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
	DireccionService dirService;

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

	// @PostMapping("/signUp")
	// public Usuario signUp(@RequestBody Usuario usuario) {
	//
	// Suscripcion sus =
	// suscripcionService.findById(usuario.getSuscripcion().getId());
	// usuario.setSuscripcion(sus);
	// if(sus.isDietista()) {
	// Role userRole =
	// roleService.findByName(RoleName.CLIENTE_CON_DIETAS).orElse(null);
	// usuario.setRoles(Collections.singleton(userRole));
	// }else {
	// Role userRole = roleService.findByName(RoleName.CLIENTE).orElse(null);
	// usuario.setRoles(Collections.singleton(userRole));
	// }
	//
	// usuario.setPassword(sc.passwordEncoder().encode(usuario.getPassword()));
	// Usuario signUpped = usuarioService.save(usuario);
	// return signUpped;
	// }

	@PostMapping("/signUpAll")
	public ResponseEntity<ApiResponse> signUpAll(@RequestBody SignUpForm form)
			throws MalformedURLException, URISyntaxException {

		ApiResponse respuesta = new ApiResponse();
		if (usuarioService.checkUsuariAvailability(form.getUsuario().getEmail())) {
			Usuario usuario = form.getUsuario();
			usuario.setPedidosRestantes(0);
			Suscripcion sus = suscripcionService.findById(usuario.getSuscripcion().getId());
			usuario.setSuscripcion(sus);
			if (sus.isDietista()) {
				Role userRole = roleService.findByName(RoleName.CLIENTE_CON_DIETAS).orElse(null);
				usuario.setRoles(Collections.singleton(userRole));
			} else {
				Role userRole = roleService.findByName(RoleName.CLIENTE).orElse(null);
				usuario.setRoles(Collections.singleton(userRole));
			}

			usuario.setPassword(sc.passwordEncoder().encode(usuario.getPassword()));
			usuarioService.save(usuario);

			if (form.getDir() != null) {
				form.getDir().setUsuario(usuario);
				form.getDir().setPrincipal(true);
				direccionController.saveNewDir(form.getDir());
			}

			respuesta.setSuccess(true);
			respuesta.setMessage("logado");
		} else {
			respuesta.setSuccess(false);
			respuesta.setMessage("El usuario ya existe");
		}

		return ResponseEntity.ok(respuesta);
	}

	@GetMapping("/getUser")
	public Usuario getUser(@CurrentUser UserPrincipal currentUser) {
		return usuarioService.findById(currentUser.getId()).get();
	}

	@GetMapping("/getSuscripcion")
	public Suscripcion getUserSuscrip(@CurrentUser UserPrincipal currentUser) {
		return usuarioService.findById(currentUser.getId()).get().getSuscripcion();
	}

	@PostMapping("/updateUser")
	public ResponseEntity<ApiResponse> updateUser(@CurrentUser UserPrincipal curr, @RequestBody SignUpForm form) {
		ApiResponse respuesta = new ApiResponse();

		Usuario user = usuarioService.findById(curr.getId()).orElse(null);
		Direccion dir = dirService.findPrincipalByUser(user);

		user.setNombre(form.getUsuario().getNombre());
		user.setApellidos(form.getUsuario().getApellidos());
		user.setDni(form.getUsuario().getDni());
		user.setFechaNacimiento(form.getUsuario().getFechaNacimiento());
		user.setTelefono(form.getUsuario().getTelefono());
		user.setCPostal(form.getUsuario().getCPostal());

		dir.setDireccion(form.getDir().getDireccion());
		dir.setPoblacion(form.getDir().getPoblacion());
		dir.setProvincia(form.getDir().getProvincia());
		dir.setCpostal(form.getDir().getCpostal());

		usuarioService.save(user);
		dirService.save(dir);

		return ResponseEntity.ok(respuesta);
	}

	@PostMapping("/eliminarUsuario")
	public ResponseEntity<ApiResponse> eliminarUsuario(@CurrentUser UserPrincipal current)
			throws NoSuchAlgorithmException {
		ApiResponse respuesta = new ApiResponse();
		Usuario usuario = this.usuarioService.findById(current.getId()).orElse(null);
		List<Direccion> direcciones = this.dirService.findAllByUser(usuario);
		for(Direccion d : direcciones){
			this.dirService.delete(d);
		}
		usuario.setApellidos("Eliminado");
		usuario.setNombre("Usuario");
		usuario.setCPostal("00000");
		usuario.setDni("00000000X");
		usuario.setEmail(bytesToHex(stringDiggest(usuario.getEmail())) + "@anon.user");
		usuario.setFechaNacimiento(new Date());
		usuario.setTelefono("000000000");
		usuario.setPassword(bytesToHex(stringDiggest(usuario.getPassword())));
		this.usuarioService.save(usuario);
		return ResponseEntity.ok(respuesta);
	}

	@PostMapping("/updateSuscripcion")
	public ResponseEntity<ApiResponse> updateSuscripcion(@RequestBody Integer sus, @CurrentUser UserPrincipal curr) {
		ApiResponse respuesta = new ApiResponse();
		respuesta.setSuccess(true);
		Suscripcion susc = suscripcionService.findById(sus);
		Usuario user = usuarioService.findById(curr.getId()).orElse(null);
		user.setSuscripcion(susc);
		usuarioService.save(user);

		return ResponseEntity.ok(respuesta);
	}

	@GetMapping("/envios")
	public ResponseEntity<Integer> enviosRestantes(@CurrentUser UserPrincipal curr) {
		Integer envios = 0;
		Usuario usuario1 = null;

		Optional<Usuario> user = this.usuarioService.findById(curr.getId());

		if (user.isPresent()) {
			usuario1 = user.get();
		}

		return ResponseEntity.ok(this.usuarioService.enviosRestantes(usuario1));

	}

	private static String bytesToHex(byte[] hash) {
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1)
				hexString.append('0');
			hexString.append(hex);
		}
		return hexString.toString();
	}

	private static byte[] stringDiggest(String s) throws NoSuchAlgorithmException {
		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		byte[] encodedhash = digest.digest(s.getBytes(StandardCharsets.UTF_8));
		return encodedhash;
	}
	
	@GetMapping("/dietasCheck")
	public ResponseEntity<Integer> dietasCheck(@CurrentUser UserPrincipal curr){
		Boolean result=false;
		Integer res=0;
		Usuario usuario1=null;
		
		Optional<Usuario> user=this.usuarioService.findById(curr.getId());
		
		if(user.isPresent()) {
			usuario1 = user.get();
		}
		
		result=usuario1.getSuscripcion().isDietista();
		
		if(result==true) {
			res=1;
		}
		
		return ResponseEntity.ok(res);
		
	}
}

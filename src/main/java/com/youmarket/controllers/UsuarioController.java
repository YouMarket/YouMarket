package com.youmarket.controllers;

import java.io.ByteArrayInputStream;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.youmarket.configuration.SecurityConfiguration;
import com.youmarket.configuration.response.ApiResponse;
import com.youmarket.configuration.security.CurrentUser;
import com.youmarket.configuration.security.JwtAuthenticationResponse;
import com.youmarket.configuration.security.JwtTokenProvider;
import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Direccion;
import com.youmarket.domain.Factura;
import com.youmarket.domain.Pedido;
import com.youmarket.domain.Role;
import com.youmarket.domain.Suscripcion;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.enums.RoleName;
import com.youmarket.domain.form.SignUpForm;
import com.youmarket.pdf.PDFUtil;
import com.youmarket.repositories.RoleRepository;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.CestaService;
import com.youmarket.services.DireccionService;
import com.youmarket.services.FacturaService;
import com.youmarket.services.PedidoService;
import com.youmarket.services.RoleService;
import com.youmarket.services.SuscripcionService;
import com.youmarket.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	DireccionService direccionService;

	@Autowired
	DireccionService dirService;

	@Autowired
	FacturaService fService;

	@Autowired
	CestaService cestaService;

	@Autowired
	PedidoService pedidoService;

	@Autowired
	CestaProductoService cpService;

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

	@PutMapping("/updatePerfil")
	public ResponseEntity<ApiResponse> updateDatosPerfil(@RequestBody SignUpForm form, @CurrentUser UserPrincipal logged){
		ApiResponse respuesta = new ApiResponse();
		Usuario user = usuarioService.findById(logged.getId()).orElse(null);
		Direccion direccionActual = dirService.findPrincipalByUser(user);
		Usuario usuarioForm = form.getUsuario();
		Direccion direccionForm = form.getDir();

		if(usuarioForm.getEmail().equals(user.getEmail())){
			user.setNombre(usuarioForm.getNombre());
			user.setApellidos(usuarioForm.getApellidos());
			user.setTelefono(usuarioForm.getTelefono());

			direccionActual.setDireccion(direccionForm.getDireccion());
			direccionActual.setCpostal(direccionForm.getCpostal());
			direccionActual.setPoblacion(direccionForm.getPoblacion());
			direccionActual.setProvincia(direccionForm.getProvincia());

			usuarioService.save(user);
			dirService.save(direccionActual);

			respuesta.setSuccess(true);
			respuesta.setMessage("Datos actualizados con éxito");
		} else {
			if (!usuarioService.checkUsuariAvailability(form.getUsuario().getEmail())) {
				respuesta.setSuccess(false);
				respuesta.setMessage("El email ya está en uso.");
			} else {
				user.setNombre(usuarioForm.getNombre());
				user.setApellidos(usuarioForm.getApellidos());
				user.setTelefono(usuarioForm.getTelefono());
				user.setEmail(usuarioForm.getEmail());

				direccionActual.setDireccion(direccionForm.getDireccion());
				direccionActual.setCpostal(direccionForm.getCpostal());
				direccionActual.setPoblacion(direccionForm.getPoblacion());
				direccionActual.setProvincia(direccionForm.getProvincia());

				usuarioService.save(user);
				dirService.save(direccionActual);

				respuesta.setSuccess(true);
				respuesta.setMessage("Datos actualizados con éxito");
			}
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
		respuesta.setSuccess(false);
		Suscripcion susc = suscripcionService.findById(sus);
		if(susc != null) {
			respuesta.setSuccess(true);
			Usuario user = usuarioService.findById(curr.getId()).orElse(null);
			user.setSuscripcion(susc);
			usuarioService.save(user);
		}
		
		return ResponseEntity.ok(respuesta);
	}


	@GetMapping("/alertaPago")
	public ResponseEntity<ApiResponse> alertaPago(@CurrentUser UserPrincipal curr){
		ApiResponse respuesta = new ApiResponse();
		Usuario user = usuarioService.findById(curr.getId()).orElse(null);
		Factura last = fService.findLastSuscripcion(user);

		respuesta.setSuccess(true);
		respuesta.setMessage("OK");
		if(last == null) {
			respuesta.setMessage("Para poder realizar su primer pedido, tiene primero que abonar la suscripción.");
			respuesta.setSuccess(false);
		}else if( last.getFechaFactura()!= null) {
			LocalDate fechaFactura = last.getFechaFactura().toInstant()
				      .atZone(ZoneId.systemDefault())
				      .toLocalDate();
			LocalDate fecha = LocalDate.now();

			if(fecha.getMonthValue() > fechaFactura.getMonthValue() && user.getPedidosRestantes() == 0) {
				respuesta.setMessage("Aún no ha pagado la suscripción de este mes y no le quedan pedidos.");
				respuesta.setSuccess(false);
			}
		}

		return ResponseEntity.ok(respuesta);
	}

	@RequestMapping(value = "/exportPDF", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<InputStreamResource> exportPDF (@CurrentUser UserPrincipal userr){
		if(userr == null)
			return null;
		Usuario user = usuarioService.findById(userr.getId()).orElse(null);

		//incluye facturas de usuario y de pedido
		List<Factura> facturas = fService.findByUser(user);
		List<Direccion> direcciones = dirService.findAllByUser(user);
		List<Cesta> cestas = cestaService.cestasPorUsuario(user.getId());
		List<Pedido> pedidos = pedidoService.findAllByUser(user.getId());
		List<List<CestaProducto>> productosCestas = new ArrayList<>();
		List<List<CestaProducto>> productosPedidos = new ArrayList<>();
		for (Cesta c : cestas) {
			List<CestaProducto> prods = cpService.findProdsByCesta(c);
			productosCestas.add(prods);
		}
		for (Pedido c : pedidos) {
			List<CestaProducto> prods = cpService.findProdsByCesta(c);
			productosPedidos.add(prods);
		}


		ByteArrayInputStream bis = PDFUtil.usuarioPDFGenerator(user, direcciones, productosCestas, productosPedidos, facturas);

        HttpHeaders headers = new HttpHeaders();
        String filename = "export_usuario_"+user.getEmail();
        headers.add("Content-Disposition", "attachment; filename="+filename+".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
	}

	@GetMapping("/envios")
	public ResponseEntity<Integer> enviosRestantes(@CurrentUser UserPrincipal curr) {
		Integer envios = 0;
		Usuario usuario1 = null;

		Optional<Usuario> user=this.usuarioService.findById(curr.getId());

		if(user.isPresent()) {
			envios = user.get().getPedidosRestantes();
		}

		return ResponseEntity.ok(envios);

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
	
	@GetMapping("/cestasCheck")
	public ResponseEntity<Integer> cestasCheck(@CurrentUser UserPrincipal curr){
		Boolean result=false;
		Integer res=0;
		Usuario usuario1=null;

		Optional<Usuario> user=this.usuarioService.findById(curr.getId());

		if(user.isPresent()) {
			usuario1 = user.get();
		}

		List<Cesta> cestas=this.cestaService.cestasPorUsuario(usuario1.getId());
		
		if(cestas.size() > 0) {
			res=1;
		}

		return ResponseEntity.ok(res);

	}

		@GetMapping("/userPerfil")
		public ResponseEntity<Usuario> userPerfil(@CurrentUser UserPrincipal curr){
			Usuario usuario1=null;

			Optional<Usuario> user=this.usuarioService.findById(curr.getId());

			if(user.isPresent()) {
				usuario1 = user.get();
			}

			return ResponseEntity.ok(usuario1);

		}

		@GetMapping("/direccion")
		public ResponseEntity<Direccion> userDireccion(@CurrentUser UserPrincipal curr){
			Optional<Usuario> user=this.usuarioService.findById(curr.getId());
			Usuario usuario1=null;
			if(user.isPresent()) {
				usuario1=user.get();
			}

			usuario1.setPassword(null);

			List<Direccion> direcciones=this.direccionService.findAllByUser(usuario1);
			ResponseEntity<Direccion> res;
			if(direcciones.size()==0) {
				res= null;
			}else {

			res= ResponseEntity.ok(direcciones.get(0));
			}

			return res;

		}

		@GetMapping("/adminCheck")
		public ResponseEntity<Integer> adminCheck(@CurrentUser UserPrincipal curr){
			Integer res=0;
			Usuario user = this.usuarioService.findById(curr.getId()).orElse(null);
			Set<Role> roleSet = user.getRoles();
			if(roleSet.contains(new Role((long) 4, RoleName.ADMIN))){
				res = 1;
			}
			return ResponseEntity.ok(res);

		}
}

package com.youmarket.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.SafeHtml;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@NotBlank
	@SafeHtml
	@Column(name="nombre", length=100)
	private String nombre;

	@NotBlank
	@SafeHtml
	@Column(name="apellidos", length=150)
	private String apellidos;

	@NotBlank
	@SafeHtml
	@Pattern(regexp = "^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$")
	@Column(name="dni", length=9)
	private String dni;

	@Column(name="fecha_nacimiento")
	@Temporal(TemporalType.DATE)
	private Date fechaNacimiento;
	
	@ManyToOne(optional= true)
	@JoinColumn(name="suscripcion_id")
	private Suscripcion suscripcion;
	
	@NotBlank
	@SafeHtml
	@Pattern(regexp ="\\b\\d{5}\\b")
	@Column(name="c_postal", length = 5)
	private String cPostal;
	
	@Column(name="pedido_restante")
	@Range(min=0, max=5)
	private Integer pedidosRestantes;

	@NotBlank
	@SafeHtml
	@Email
	private String email;

	private String password;

	@SafeHtml
	@Column(name="telefono", length=20)
	private String telefono;

	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}

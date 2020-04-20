package com.youmarket.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Entity
public class Pedido extends Cesta{

	@NotBlank
	@SafeHtml
	private String 	direccion;

	@NotBlank
	@SafeHtml
	private String 	poblacion;
	
	@NotNull
	private int 	numero;

	@NotBlank
	@SafeHtml
	private String 	provincia;
	
	@NotBlank
	@SafeHtml
	@Pattern(regexp ="\\b\\d{5}\\b")
	private String 	cpostal;

	
	/**
	 * 
	 */
	@Column(name="fecha_hora_pedido")
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "dd/MM/yyyy hh:mm")
	private Date fechaHoraPedido;
	
	@Column(name="fecha_envio")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date fechaEnvio;
	
	@Column(name="hora_envio_ini")
	private int horaEnvioIni;
	
	@Column(name="hora_envio_fin")
	private int horaEnvioFin;
	
	
	
	/**
	 * 
	 */
	@Column(name="fecha_hora_entrega")
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "dd/MM/yyyy hh:mm")
	private Date fechaHoraEntrega;
	

	
	@Column(name="orden_entrega")
	private int ordenEntrega;
	
	
	private String retraso;
	
	@OneToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="factura_id")
	private Factura factura;

	
}

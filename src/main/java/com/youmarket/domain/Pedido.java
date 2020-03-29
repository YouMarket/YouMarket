package com.youmarket.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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

	
	private String direccion;
	

	
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

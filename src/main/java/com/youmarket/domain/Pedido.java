package com.youmarket.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	@Column(name="fecha_hora_envio")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaHoraEnvio;
	
	/**
	 * 
	 */
	@Column(name="fecha_hora_pedido")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaHoraPedido;
	
	/**
	 * 
	 */
	@Column(name="fecha_hora_entrega")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaHoraEntrega;
	
	@Column(name="orden_entrega")
	private int ordenEntrega;
	
	private String retraso;
	
	@OneToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="factura_id")
	private Factura factura;

	
}

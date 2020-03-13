package com.youmarket.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Factura {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Positive
	private Double total;
	
	@Column(name="total_iva")
	@Positive
	private Double totalIva;
	
	@Column(name="fecha_factura")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaFactura;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="usuario_id")
	private Usuario usuario;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="pedido_id")
//	private Pedido pedido;
	
}

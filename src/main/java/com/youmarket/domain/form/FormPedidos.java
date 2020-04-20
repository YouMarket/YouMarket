package com.youmarket.domain.form;

import java.util.Date;
import java.util.List;


public class FormPedidos {

	private String 		direccion1;	
	private String 		poblacion1;	
	private Integer 	numero1;	
	private String 		provincia1;	
	private String 		cpostal1;
	private Date 		fechaEnvio1;	
	private Integer 	horaEnvioIni1;
	private Integer 	horaEnvioFin1;
	private Integer 	cestaId1;
	
	private String 		direccion2;	
	private String 		poblacion2;	
	private Integer 	numero2;	
	private String 		provincia2;	
	private String 		cpostal2;
	private Date 		fechaEnvio2;	
	private Integer 	horaEnvioIni2;
	private Integer 	horaEnvioFin2;
	private Integer 	cestaId2;
	
	private String 		direccion3;	
	private String 		poblacion3;	
	private Integer 	numero3;	
	private String 		provincia3;	
	private String 		cpostal3;
	private Date 		fechaEnvio3;	
	private Integer 	horaEnvioIni3;
	private Integer 	horaEnvioFin3;
	private Integer 	cestaId3;
	
	private String 		direccion4;	
	private String 		poblacion4;	
	private Integer 	numero4;	
	private String 		provincia4;	
	private String 		cpostal4;
	private Date 		fechaEnvio4;	
	private Integer 	horaEnvioIni4;
	private Integer 	horaEnvioFin4;
	private Integer 	cestaId4;
	
	public FormPedidos() {
		super();
	}
	
	public FormPedidos(String direccion1, String poblacion1, Integer numero1, String provincia1, String cpostal1, Date fechaEnvio1,
			Integer horaEnvioIni1, Integer horaEnvioFin1, Integer cestaId1,
			String direccion2, String poblacion2, Integer numero2, String provincia2, String cpostal2, Date fechaEnvio2,
			Integer horaEnvioIni2, Integer horaEnvioFin2, Integer cestaId2,
			String direccion3, String poblacion3, Integer numero3, String provincia3, String cpostal3, Date fechaEnvio3,
			Integer horaEnvioIni3, Integer horaEnvioFin3, Integer cestaId3,
			String direccion4, String poblacion4, Integer numero4, String provincia4, String cpostal4, Date fechaEnvio4,
			Integer horaEnvioIni4, Integer horaEnvioFin4, Integer cestaId4
			) {
		
		super();
		this.direccion1 = direccion1;
		this.poblacion1 = poblacion1;
		this.numero1 = numero1;
		this.provincia1 = provincia1;
		this.cpostal1 = cpostal1;
		this.fechaEnvio1 = fechaEnvio1;
		this.horaEnvioFin1 = horaEnvioFin1;
		this.horaEnvioIni1 = horaEnvioIni1;	
		this.cestaId1 = cestaId1;	
		
		this.direccion2 = direccion2;
		this.poblacion2 = poblacion2;
		this.numero2 = numero2;
		this.provincia2 = provincia2;
		this.cpostal2 = cpostal2;
		this.fechaEnvio2 = fechaEnvio2;
		this.horaEnvioFin2 = horaEnvioFin2;
		this.horaEnvioIni2 = horaEnvioIni2;	
		this.horaEnvioIni1 = horaEnvioIni1;	
		this.cestaId2 = cestaId2;	
		
		this.direccion3 = direccion3;
		this.poblacion3 = poblacion3;
		this.numero3 = numero3;
		this.provincia3 = provincia3;
		this.cpostal3 = cpostal3;
		this.fechaEnvio3 = fechaEnvio3;
		this.horaEnvioFin3 = horaEnvioFin3;
		this.horaEnvioIni3 = horaEnvioIni3;	
		this.cestaId3=cestaId3;	
		
		this.direccion4 = direccion4;
		this.poblacion4 = poblacion4;
		this.numero4 = numero4;
		this.provincia4 = provincia4;
		this.cpostal4 = cpostal4;
		this.fechaEnvio4 = fechaEnvio4;
		this.horaEnvioFin4 = horaEnvioFin4;
		this.horaEnvioIni4 = horaEnvioIni4;		
		this.cestaId4 = cestaId4;	
	}

	public String getDireccion1() {
		return direccion1;
	}

	public void setDireccion1(String direccion1) {
		this.direccion1 = direccion1;
	}

	public String getPoblacion1() {
		return poblacion1;
	}

	public void setPoblacion1(String poblacion1) {
		this.poblacion1 = poblacion1;
	}

	public Integer getNumero1() {
		return numero1;
	}

	public void setNumero1(Integer numero1) {
		this.numero1 = numero1;
	}

	public String getProvincia1() {
		return provincia1;
	}

	public void setProvincia1(String provincia1) {
		this.provincia1 = provincia1;
	}

	public String getCpostal1() {
		return cpostal1;
	}

	public void setCpostal1(String cpostal1) {
		this.cpostal1 = cpostal1;
	}

	public Date getFechaEnvio1() {
		return fechaEnvio1;
	}

	public Integer getCestaId2() {
		return cestaId2;
	}

	public void setCestaId2(Integer cestaId2) {
		this.cestaId2 = cestaId2;
	}

	public Integer getCestaId3() {
		return cestaId3;
	}

	public void setCestaId3(Integer cestaId3) {
		this.cestaId3 = cestaId3;
	}

	public Integer getCestaId4() {
		return cestaId4;
	}

	public void setCestaId4(Integer cestaId4) {
		this.cestaId4 = cestaId4;
	}

	public Integer getCestaId1() {
		return cestaId1;
	}

	public void setFechaEnvio1(Date fechaEnvio1) {
		this.fechaEnvio1 = fechaEnvio1;
	}

	public Integer getHoraEnvioIni1() {
		return horaEnvioIni1;
	}

	public void setHoraEnvioIni1(Integer horaEnvioIni1) {
		this.horaEnvioIni1 = horaEnvioIni1;
	}

	public Integer getHoraEnvioFin1() {
		return horaEnvioFin1;
	}

	public void setHoraEnvioFin1(Integer horaEnvioFin1) {
		this.horaEnvioFin1 = horaEnvioFin1;
	}
	
	public void setCestaId1(Integer cestaId1) {
		this.cestaId1 = cestaId1;
	}

	public String getDireccion2() {
		return direccion2;
	}

	public void setDireccion2(String direccion2) {
		this.direccion2 = direccion2;
	}

	public String getPoblacion2() {
		return poblacion2;
	}

	public void setPoblacion2(String poblacion2) {
		this.poblacion2 = poblacion2;
	}

	public Integer getNumero2() {
		return numero2;
	}

	public void setNumero2(Integer numero2) {
		this.numero2 = numero2;
	}

	public String getProvincia2() {
		return provincia2;
	}

	public void setProvincia2(String provincia2) {
		this.provincia2 = provincia2;
	}

	public String getCpostal2() {
		return cpostal2;
	}

	public void setCpostal2(String cpostal2) {
		this.cpostal2 = cpostal2;
	}

	public Date getFechaEnvio2() {
		return fechaEnvio2;
	}

	public void setFechaEnvio2(Date fechaEnvio2) {
		this.fechaEnvio2 = fechaEnvio2;
	}

	public Integer getHoraEnvioIni2() {
		return horaEnvioIni2;
	}

	public void setHoraEnvioIni2(Integer horaEnvioIni2) {
		this.horaEnvioIni2 = horaEnvioIni2;
	}

	public Integer getHoraEnvioFin2() {
		return horaEnvioFin2;
	}

	public void setHoraEnvioFin2(Integer horaEnvioFin2) {
		this.horaEnvioFin2 = horaEnvioFin2;
	}

	public String getDireccion3() {
		return direccion3;
	}

	public void setDireccion3(String direccion3) {
		this.direccion3 = direccion3;
	}

	public String getPoblacion3() {
		return poblacion3;
	}

	public void setPoblacion3(String poblacion3) {
		this.poblacion3 = poblacion3;
	}

	public Integer getNumero3() {
		return numero3;
	}

	public void setNumero3(Integer numero3) {
		this.numero3 = numero3;
	}

	public String getProvincia3() {
		return provincia3;
	}

	public void setProvincia3(String provincia3) {
		this.provincia3 = provincia3;
	}

	public String getCpostal3() {
		return cpostal3;
	}

	public void setCpostal3(String cpostal3) {
		this.cpostal3 = cpostal3;
	}

	public Date getFechaEnvio3() {
		return fechaEnvio3;
	}

	public void setFechaEnvio3(Date fechaEnvio3) {
		this.fechaEnvio3 = fechaEnvio3;
	}

	public Integer getHoraEnvioIni3() {
		return horaEnvioIni3;
	}

	public void setHoraEnvioIni3(Integer horaEnvioIni3) {
		this.horaEnvioIni3 = horaEnvioIni3;
	}

	public Integer getHoraEnvioFin3() {
		return horaEnvioFin3;
	}

	public void setHoraEnvioFin3(Integer horaEnvioFin3) {
		this.horaEnvioFin3 = horaEnvioFin3;
	}

	public String getDireccion4() {
		return direccion4;
	}

	public void setDireccion4(String direccion4) {
		this.direccion4 = direccion4;
	}

	public String getPoblacion4() {
		return poblacion4;
	}

	public void setPoblacion4(String poblacion4) {
		this.poblacion4 = poblacion4;
	}

	public Integer getNumero4() {
		return numero4;
	}

	public void setNumero4(Integer numero4) {
		this.numero4 = numero4;
	}

	public String getProvincia4() {
		return provincia4;
	}

	public void setProvincia4(String provincia4) {
		this.provincia4 = provincia4;
	}

	public String getCpostal4() {
		return cpostal4;
	}

	public void setCpostal4(String cpostal4) {
		this.cpostal4 = cpostal4;
	}

	public Date getFechaEnvio4() {
		return fechaEnvio4;
	}

	public void setFechaEnvio4(Date fechaEnvio4) {
		this.fechaEnvio4 = fechaEnvio4;
	}

	public Integer getHoraEnvioIni4() {
		return horaEnvioIni4;
	}

	public void setHoraEnvioIni4(Integer horaEnvioIni4) {
		this.horaEnvioIni4 = horaEnvioIni4;
	}

	public Integer getHoraEnvioFin4() {
		return horaEnvioFin4;
	}

	public void setHoraEnvioFin4(Integer horaEnvioFin4) {
		this.horaEnvioFin4 = horaEnvioFin4;
	}
	
	
	
}

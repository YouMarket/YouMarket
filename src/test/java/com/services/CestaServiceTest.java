package com.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.youmarket.YouMarketApplication;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.Usuario;
import com.youmarket.domain.form.FormCesta;
import com.youmarket.services.CestaService;
import com.youmarket.services.UsuarioService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class CestaServiceTest {
	
	@Autowired
	private CestaService cestaService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	//5 de 8
	
	/*
	 * PU-8: totalCestasCreadas
	 * Se comprueba que hay alguna cesta en la BD
	 * Assert: el tamaño es superior a 1
	 */
	@Test
	public void totalCestasCreadasTest(){
		int numCestas  = this.cestaService.totalCestasCreadas();
        assertThat(numCestas).isGreaterThan(0);	
	}
	
	/*
	 * PU-9: cestasPorUsuario
	 * Se comprueba que no falla el método
	 * Assert: no es nulo
	 */
	@Test
	public void cestasPorUsuarioTest(){
		List<Cesta> cestas = this.cestaService.cestasPorUsuario(2);
		int numCestas  = cestas.size();
        assertThat(numCestas).isNotNull();	
	}
	
	/*
	 * PU-10: muestraCesta
	 * Se comprueba que no falla el método
	 * Assert: no es nulo
	 */
	@Test
	public void muestraCestaTest() {
		Optional<Cesta>  cesta = this.cestaService.muestraCesta(1);
		
		assertThat(cesta).isNotNull();
	}
	
	/*
	 * PU-11: save
	 * Se comprueba que no falla el método
	 * Assert: no es nulo
	 */
	@Test
	public void saveTest() {
		Cesta cesta2 = new Cesta();
		cesta2.setNombre("cesta2");
		Usuario usu1 = this.usuarioService.findById(1).get();
		cesta2.setUsuario(usu1);
		Cesta cestaGuardada = this.cestaService.save(cesta2);
		
		assertThat(cestaGuardada).isNotNull();
	}
	
	/*
	 * PU-12: deleteById
	 * Se comprueba que se borra correctamente
	 * Assert: el objeto es nulo
	 */
	@Test
	public void deleteTest() {
		Cesta cestaDel = new Cesta();
		cestaDel.setNombre("cesta2");
		Usuario usu1 = this.usuarioService.findById(1).get();
		cestaDel.setUsuario(usu1);
		Cesta cestaGuardada = this.cestaService.save(cestaDel);
		
		this.cestaService.deleteById(cestaGuardada);
		assertThat(this.cestaService.muestraCesta(cestaGuardada.getId())).isEmpty();
	}
	
	/*
	 * PU-13: creaCesta
	 * Se comprueba que se crea correctamente
	 * Assert: no es nulo
	 */
	@Test
	public void creaCestaTest() {
		Usuario usu1 = this.usuarioService.findById(1).get();
		FormCesta formC = new FormCesta();
		formC.setName("formTest");
		formC.setUsuario(1);
		//Cesta creada = this.cestaService.creaCesta(formC, usu1);
		//TODO
	}

	
}

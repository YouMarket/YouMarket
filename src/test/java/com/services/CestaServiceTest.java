package com.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.youmarket.YouMarketApplication;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.Producto;
import com.youmarket.services.CestaService;
import com.youmarket.services.ProductoService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class CestaServiceTest {

	@Autowired(required=true)
	private CestaService cestaService;
	
	@Autowired(required=true)
	private	ProductoService productoService;
	
	/*
	 * PU-1: totalCestas
	 * Se comprueba que hay alguna cesta en la BD
	 * Assert: el tamaño es superior a 1
	 */
	
	@Test
    public void totalCestasTest() {

		List<Cesta> cestas = this.cestaService.listaCestas();
		
		int numCestas = cestas.size();
		
        assertThat(numCestas).isGreaterThan(0);
    }
	
	
	/*
	 * PU-2: save
	 * Se comprueba que se guardan cestas en la BD
	 * Assert: la cesta guardada no es nula
	 */
	
	@Test
    public void saveTest() {

		Cesta cestaTest = new Cesta();
		
		cestaTest.setId(1234);
		cestaTest.setName("Cesta de prueba 1");
		
		Cesta cestaGuardada = this.cestaService.save(cestaTest);
		
        assertThat(cestaGuardada).isNotNull();
    }
	
	/*
	 * PU-3: delete
	 * Se elimina una cesta de la BD
	 * Assert: al buscar por el id, la cesta no existe
	 */
	
	@Test
    public void deleteTest() {

		Cesta cesta = this.cestaService.listaCestas().get(0);
		
		int id = cesta.getId();
		
		this.cestaService.delete(cesta);
		
		assertThat(this.cestaService.findCesta(id)).isNull();
        //assertThat(cesta).isNull();
    }
	
	/*
	 * PU-4: saveProductos
	 * Se añaden unos productos a una cesta
	 * Asserts: la cesta guardada no es nula y tiene productos
	 */
	
	@Test
    public void saveProductosTest() {

		Cesta cesta = this.cestaService.listaCestas().get(0);
		
		List<Producto> productos = this.productoService.listaProductos().subList(0, 3);

		Cesta cestaGuardada = this.cestaService.saveProductos(cesta, productos);
		
		assertThat(cestaGuardada).isNotNull();
		assertThat(cestaGuardada.getProductos()).isNotEmpty();
    }
	
	
	
		
	
		
	
}

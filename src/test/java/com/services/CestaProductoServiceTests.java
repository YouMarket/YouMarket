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
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Producto;
import com.youmarket.services.CestaProductoService;
import com.youmarket.services.CestaService;
import com.youmarket.services.ProductoService;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class CestaProductoServiceTests {

	@Autowired
	private CestaProductoService 	cestaProductoService;
	
	@Autowired
	private CestaService			cestaService;
	
	@Autowired
	private ProductoService			productoService;
	
	// Hechos 2 de 7
	
	/*
	 * PU-1: findAll
	 * Se comprueba que hay algún cestaproducto en la BD
	 * Assert: el tamaño es superior a 1
	 */
	@Test
    public void findAllTest() {

		List<CestaProducto> cestaProductos = this.cestaProductoService.findAll();
		
		int numCestaProductos = cestaProductos.size();
		
        assertThat(numCestaProductos).isGreaterThan(0);
    }
	
	/*
	 * PU-2: findProducts
	 * Se comprueba que devuelve algún cestaProducto
	 * Assert: el tamaño es superior a 1
	 */
	
	@Test
    public void findProductsTest() {

		List<CestaProducto> cestaProductos = this.cestaProductoService.findProducts();
		
		int numCestaProductos = cestaProductos.size();
		
        assertThat(numCestaProductos).isGreaterThan(0);
    }
	
	/*
	 * PU-3: CestasProductoPorCestaId
	 * Se comprueba que el cálculo no da ningún problema
	 * Assert: el número es válido
	 */
	
	@Test
    public void CestasProductoPorCestaIdTest() {

		//TODO: USUARIO
    }
	
	/*
	 * PU-4: findProducts
	 * Se comprueba que el cálculo no da ningún problema
	 * Assert: el número es válido
	 */
	
	@Test
    public void totalPorCestaIdTest() {

		//TODO: USUARIO
    }
	
	/*
	 * PU-5: cpPorCesta
	 * Se comprueba que se obtienen cestaproductos de una cesta
	 * Assert: el número es válido
	 */
	
	@Test
    public void cpPorCestaTest() {
		
		//TODO
		
    }
	
	
	/*
	 * PU-6: save
	 * Se comprueba que se guarda correctamente
	 * Assert: el objeto guardado no es nulo
	 */
	
	@Test
	public void saveTest() {
		/*
		CestaProducto cestaProducto = new CestaProducto();
		cestaProducto.setCantidad(2);
		
		Cesta cesta1 = new Cesta();
		cesta1.setNombre("Cesta de prueba");
		cesta1.setUsuario(null);
		
		Producto producto1 = new Producto();
		
		cestaProducto.setCesta(cesta1);
		cestaProducto.setProducto(this.productoService.findById(1));

		CestaProducto guardada = this.cestaProductoService.save(cestaProducto);
		System.out.println(guardada);
		assertThat(guardada).isNotNull();
		*/
		//TODO
	}
	
	/*
	 * PU-7: deleteByCestaId
	 * Se comprueba que se elimina correctamente
	 * Assert: el objeto desaparece de la BD
	 */
	@Test
	public void deleteByCestaIdTest() {
		//TODO
	}
	
	
	
}

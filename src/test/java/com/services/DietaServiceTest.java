package com.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.youmarket.YouMarketApplication;
import com.youmarket.domain.Dieta;
import com.youmarket.repositories.DietaRepository;
import com.youmarket.services.DietaService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class DietaServiceTest {

	@Autowired
	private DietaService dietaService;
	
	//5 de 5
	
	
	/*
	 * PU-14: findAll
	 * Se comprueba que se devuelve alguna dieta
	 * Assert: tamaño superior a 1
	 */
	@Test
    public void findAllTest() {

		List<Dieta> dietas = this.dietaService.findAll();
		
		int numDietas = dietas.size();
		
        assertThat(numDietas).isGreaterThan(0);
    }
	
	/*
	 * PU-15: save
	 * Se comprueba que se guarda correctamente
	 * Assert: objeto no nulo
	 */
	@Test
	public void saveTest() {
		Dieta dietTest = new Dieta();
		dietTest.setActiva(false);
		dietTest.setDescripcion("descripcionTest");
		dietTest.setNombre("nombreTest");
		dietTest.setTipo("Dieta de test");
		dietTest.setId(666);
		Dieta guardada = this.dietaService.save(dietTest);
		
		assertThat(guardada).isNotNull();
		
		this.dietaService.delete(guardada);
	}
	
	/*
	 * PU-16: delete
	 * Se comprueba que se elimina correctamente
	 * Assert: desaparece de la BD
	 */
	@Test
	public void deleteTest() {
		Dieta dietTest2 = new Dieta();
		dietTest2.setActiva(false);
		dietTest2.setDescripcion("descripcionTest22");
		dietTest2.setNombre("nombreTest2");
		dietTest2.setTipo("Dieta de test2");
		dietTest2.setId(666);
		Dieta guardada = this.dietaService.save(dietTest2);
		
		this.dietaService.delete(guardada);
	}
	
	/*
	 * PU-17: findById
	 * Se comprueba que se recupera correctamente
	 * Assert: no es nulo
	 */
	@Test
	public void findByIdTest() {
		Dieta recu = this.dietaService.findAll().get(0);
		int id = recu.getId();
		
		recu = this.dietaService.findById(id);
		
		assertThat(recu).isNotNull();
	}
	

	/*
	 * PU-18: deleteById
	 * Se comprueba que se elimina correctamente
	 * Assert: se borra de la BD
	 */
	@Test
	public void deleteByIdTest() {
		Dieta dietTest2 = new Dieta();
		dietTest2.setActiva(false);
		dietTest2.setDescripcion("descripcionTest22");
		dietTest2.setNombre("nombreTest2");
		dietTest2.setTipo("Dieta de test2");
		dietTest2.setId(666);
		Dieta guardada = this.dietaService.save(dietTest2);
		
		this.dietaService.deleteById(guardada.getId());
		
	}
	
}

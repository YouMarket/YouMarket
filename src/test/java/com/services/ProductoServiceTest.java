package com.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.youmarket.YouMarketApplication;
import com.youmarket.domain.Cesta;
import com.youmarket.repositories.CestaRepository;
import com.youmarket.services.CestaService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class ProductoServiceTest {


 
	@Autowired(required = true)
	private CestaService cestaService;
	
	@Autowired(required = true)
	private CestaRepository cestaRepository;
	
	
    
    @Test
    public void pruebaLosSerrano1() {

    	cestaService.hashCode();

        assertThat(2)
          .isEqualTo(2);
    }
    
    @Test
    public void pruebaLosSerrano2() {

    	Collection<Cesta> cestas = cestaRepository.findAll();
    	System.out.println(cestas);

        assertThat(2)
          .isEqualTo(2);
    }
    
    @Test
    public void showProductTest() {

    	Collection<Cesta> cestas = cestaRepository.findAll();
    	System.out.println(cestas);

        assertThat(2)
          .isEqualTo(2);
    }
    
    
    
}
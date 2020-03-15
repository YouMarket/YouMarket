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
import com.youmarket.services.CestaService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class CestaServiceTest {

	@Autowired(required=true)
	private CestaService cestaService;
	
	
	@Test
    public void totalCestasTest() {

		int numCestas = this.cestaService.totalCestasCreadas();
		
        assertThat(numCestas).isGreaterThan(0);
    }
	
}

package com.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.youmarket.YouMarketApplication;
import com.youmarket.domain.Dieta;
import com.youmarket.domain.Pedido;
import com.youmarket.domain.Usuario;
import com.youmarket.services.PedidoService;
import com.youmarket.services.UsuarioService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YouMarketApplication.class)
public class PedidoServiceTest {
	
	@Autowired
	private PedidoService pedidoService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	//3 de 3
	
	/*
	 * PU-19: findAll
	 * Se comprueba que se devuelve alguna pedido
	 * Assert: tamaño superior a 1
	 */
	@Test
    public void findAllTest() {

		List<Pedido> pedidos = this.pedidoService.listaPedidos();
		
		int numPedidos = pedidos.size();
		
        assertThat(numPedidos).isGreaterThan(0);
    }
	
	/*
	 * PU-20: save
	 * Se comprueba que se guarda correctamente
	 * Assert: objeto no nulo
	 */
	@Test
	public void saveTest() {
		Usuario usu1 = this.usuarioService.findById(1).get();
		Pedido pedidoTest = new Pedido();
		pedidoTest.setUsuario(usu1);
		Date ahora = new Date();
		pedidoTest.setNombre("nombreTest");
		pedidoTest.setDireccion("direccionTest");
		pedidoTest.setFechaEnvio(ahora);
		pedidoTest.setFechaHoraEntrega(ahora);
		pedidoTest.setFechaHoraPedido(ahora);
		pedidoTest.setHoraEnvioIni(10);
		pedidoTest.setHoraEnvioFin(15);
		
		Pedido guardada = this.pedidoService.save(pedidoTest);
		
		assertThat(guardada).isNotNull();
		
	}
	
	/*
	 * PU-21: findById
	 * Se comprueba que se recupera correctamente
	 * Assert: no es nulo
	 */
	@Test
	public void findByIdTest() {
		Pedido pedido = this.pedidoService.listaPedidos().get(0);
		Pedido recu = this.pedidoService.findById(pedido.getId());
		assertThat(recu).isNotNull();
	}
	
	
}

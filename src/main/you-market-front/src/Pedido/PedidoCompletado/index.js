import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import Header from '../Header';

function PedidoCompletado() {
	const [pedido, setPedido] = useState([]);

	const fetchPedido = useCallback(() => {
	    return fetch('pedido/${id}')
	      .then(res => res.json())
	      .then(pedido => {
	        setPedido(pedido);
	        console.log(pedido);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchPedido();
	  }, [fetchPedido]);
	
	
  return(
	<div>	  
	  <Header/>
	  <div className="pedido-container">
	  	<div className="grid">
	  		{pedido.map(pedido => (
	  			<Pedido 
	  				id={pedido.id}  
	  				direccion={pedido.direccion} 
	  				factura={pedido.factura} 
	  				fechaHoraEntrega={pedido.fechaHoraEntrega} 
	  				fechaHoraEnvio={pedido.fechaHoraEnvio} 
	  				fechaHoraPedido={pedido.fechaHoraPedido}
	  				ordenEntrega={pedido.ordenEntrega}
	  				retraso={pedido.retraso}
	  				key={pedido.id}
	  			/>
	  		))}
	  	</div>
	  </div>
	</div>
 );
}
export default PedidoCompletado;
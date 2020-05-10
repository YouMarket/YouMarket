import React from 'react';
import './styles.css';

interface Props {
	fechaHoraPedido: string,
	fechaHoraEnvio: string,
	fechaHoraEntrega: string,
	retraso: string,
}

function Pedido() {
  return(
	<div>
		<h2>Pedido realizado el 30/02/19</h2>
		<p>Estado:</p>
	</div>
 );
}
export default Pedido;ƒ
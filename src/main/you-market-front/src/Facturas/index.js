import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Factura from '../Factura';
import Header from '../Header';

function Facturas() {
	
const [facturas, setFacturas] = useState([]);

	const fetchFacturas = useCallback(() => {
	    return fetch('')
	      .then(res => res.json())
	      .then(facturas => {
			setFacturas(facturas);
	        console.log(facturas);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchFacturas();
	  }, [fetchFacturas]);	
  
    return(
        <div>	  
            <div className="facturas-container">
                <div className="grid">
                    {facturas.map(factura => (
                        <Factura 
                            id={factura.id}  
                            total={factura.total}
                            totalIva={factura.totalIva}
                            fechaFactura={factura.fechaFactura}
                            pedido={factura.pedido.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Facturas;
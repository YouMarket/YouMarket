
package com.youmarket.services;

import java.util.ArrayList;
import java.util.List;

import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Producto;
import com.youmarket.repositories.CestaProductoRepository;
import com.youmarket.repositories.ProductoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CestaProductoService{
    
    @Autowired
    private CestaProductoRepository cprepo;

    @Autowired
    private ProductoRepository productoRepository;

    public List<CestaProducto> findProducts(){
        List<CestaProducto> res = new ArrayList<>();
        List<Producto> productos = this.productoRepository.findAll();
        for (Producto p : productos){
            CestaProducto cp = new CestaProducto();
            cp.setCantidad(0);
            cp.setProducto(p);
            res.add(cp);
        }
        return res;
    }

    public List<CestaProducto> findAll(){
        return this.cprepo.findAll();
    }

  	public List<CestaProducto> listaProductosByDiet(int dietId){
		
		return this.cprepo.findAll(); 
	}
    
}

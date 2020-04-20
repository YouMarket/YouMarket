
package com.youmarket.services;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Cesta;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Producto;
import com.youmarket.repositories.CestaProductoRepository;
import com.youmarket.repositories.ProductoRepository;

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

	public Object CestasProductoPorCestaId(@Valid Integer id, UserPrincipal currentUser) {
		List<CestaProducto> cps = this.cprepo.findByCestaId(id);
		Boolean noHayHack=true;
		for(CestaProducto p:cps) {
			if(p.getCesta().getUsuario().getId()!=currentUser.getId()) {
				noHayHack=false;


			}
		}
		if(noHayHack==false) {
			cps=null;
		}
		return cps;
	}

	public Double totalPorCestaId(@Valid Integer id, UserPrincipal currentUser) {
		List<CestaProducto> cps = this.cprepo.findByCestaId(id);
		Boolean noHayHack=true;
		Double total=0.0;
		for(CestaProducto p:cps) {
			total= total +p.getCantidad()*p.getProducto().getPrecioIva();
			if(p.getCesta().getUsuario().getId()!=currentUser.getId()) {
				noHayHack=false;


			}
		}
		if(noHayHack==false) {
			cps=null;
		}
		return total;
	}



	public List<CestaProducto> listaProductosByDiet(int dietId){

		return this.cprepo.findAll();

	}

	public List<CestaProducto> cpPorCesta(int id){
		return this.cprepo.findByCestaId(id);
	}


	public void deleteByCestaId(int id){
		this.cprepo.deleteByCestaId(id);
	}


    public CestaProducto save(CestaProducto cp){
        return this.cprepo.save(cp);
    }

    public List<CestaProducto> findProdsByCesta(Cesta idCesta) {
    	return this.cprepo.findByCestaId(idCesta.getId());
    }

}

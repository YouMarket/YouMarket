package com.youmarket.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.youmarket.services.ProductoService;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoCarrito {
    Producto producto;
    int cantidad;

    public ProductoCarrito(CestaProducto cp){
        this.producto = cp.producto;
        this.cantidad = cp.cantidad;
    }
    
}
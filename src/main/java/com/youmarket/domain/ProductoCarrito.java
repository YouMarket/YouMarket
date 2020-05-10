package com.youmarket.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoCarrito {
    Producto producto;
    int cantidad;

    public ProductoCarrito(CestaProducto cp) {
        this.producto = cp.producto;
        this.cantidad = cp.cantidad;
    }

}
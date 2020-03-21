insert into supermercado (id, nombre, descripcion, c_postal) values (1, 'Mercadona - Triana', 'Mercadona de calle Salado', '41010');
insert into supermercado (id, nombre, descripcion, c_postal) values (2, 'Mercadona - centro', 'Mercadona de calle Torneo', '41001');

insert into marca (id, nombre) values (1, 'Hacendado');
insert into marca (id, nombre) values (2, 'Danone');
insert into marca (id, nombre) values (3, 'Don simon');
insert into marca (id, nombre) values (4, 'Axe');
insert into marca (id, nombre) values (5, 'Nestle');

insert into departamento (id, nombre) values (1, 'Panadería');
insert into departamento (id, nombre) values (2, 'Lácteos');
insert into departamento (id, nombre) values (3, 'Vinos');
insert into departamento (id, nombre) values (4, 'Perfumería');

insert into suscripcion (id, nombre, precio, envios, dietista) values (1, 'Un envío sin dietista', 6, 1, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (2, 'Dos envío sin dietista', 10, 2, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (3, 'Tres envío sin dietista', 14, 3, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (4, 'Cuatro envío sin dietista', 17, 4, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (5, 'Cuatro envío con dietista', 20, 4, true);

insert into usuario (id, nombre, apellidos, dni, c_postal, rol, email, password, telefono, subscripcion) 
	values (1, 'Primer', 'Usuario', '00000000T', '41001', 'Cliente', 'cliente@cliente.es', '1234asdf', '666999888', 4);

insert into factura (id, total, total_iva, usuario_id) values (1, 13.43, 17, 1);

insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (1,'Pan de molde',0.79,1,'€','/src/main/resources/productos/p1.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (2,'Pan de molde sin corteza',1.57,1.99,'€','/src/main/resources/productos/p2.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (3,'Pan integral',1.41,1.79,'€','/src/main/resources/productos/p3.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (4,'Bollicao',0.94,1.2,'€','/src/main/resources/productos/p4.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (5,'Galletas tradicionales',1.73,2.19,'€','/src/main/resources/productos/p5.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (6,'Croissant',0.19,0.25,'€','/src/main/resources/productos/p6.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (7,'Napolitana chocolate',0.23,0.3,'€','/src/main/resources/productos/p7.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (8,'Caña de chocolate',0.23,0.3,'€','/src/main/resources/productos/p8.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (9,'Empanada pollo y champiñones',1.57,1.99,'€','/src/main/resources/productos/p9.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (10,'Palmera huevo',0.7,0.89,'€','/src/main/resources/productos/p10.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (11,'Yogour griego',0.9,1.15,'€','/src/main/resources/productos/p11.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (12,'Yogour griego trozos de fruta',1.22,1.55,'€','/src/main/resources/productos/p12.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (13,'Pack 6 yogoures fresa',0.94,1.19,'€','/src/main/resources/productos/p13.jpg',2,2,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (14,'Pack 6 yogoures Platano',0.94,1.19,'€','/src/main/resources/productos/p14.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (15,'Pack 6 yogoures macedonia',0.94,1.19,'€','/src/main/resources/productos/p15.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (16,'Batido de fresa',1.25,1.59,'€','/src/main/resources/productos/p16.jpg',2,2,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (17,'Batido chocolate',1.25,1.59,'€','/src/main/resources/productos/p17.jpg',2,2,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (18,'Batido vainilla',1.25,1.59,'€','/src/main/resources/productos/p18.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (19,'YoPro natural',1.57,1.99,'€','/src/main/resources/productos/p19.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (20,'Vino blanco de cocina',0.78,0.99,'€','/src/main/resources/productos/p20.jpg',3,2,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (21,'Vino tinto de cocina',0.78,0.99,'€','/src/main/resources/productos/p21.jpg',3,1,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (22,'Tinto de verano con limon',1.02,1.3,'€','/src/main/resources/productos/p22.jpg',3,1,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (23,'Tinto de verano con casera',1.02,1.3,'€','/src/main/resources/productos/p23.jpg',3,2,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (24,'Desodorante Dark',1.17,1.49,'€','/src/main/resources/productos/p24.jpg',4,2,4);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (25,'Desodorante Night',1.17,1.49,'€','/src/main/resources/productos/p25.jpg',4,1,4);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (26,'Chocolate con leche',0.78,0.99,'€','/src/main/resources/productos/p26.jpg',1,2,5);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (27,'Chocolate blanco',0.78,0.99,'€','/src/main/resources/productos/p27.jpg',1,2,5);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (28,'Chocolate negro 70%',0.94,1.2,'€','/src/main/resources/productos/p28.jpg',1,2,5);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (29,'Chocolate negro 85%',0.94,1.2,'€','/src/main/resources/productos/p29.jpg',1,2,5);
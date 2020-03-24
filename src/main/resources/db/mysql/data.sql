insert into supermercado (id, nombre, descripcion, c_postal) values (1, 'Mercadona', 'Mercadona de calle Salado', '41010');
insert into supermercado (id, nombre, descripcion, c_postal) values (2, 'Lidl', 'Lidl de calle Torneo', '41001');

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

insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (1,'Pan de molde',0.79,1,'€','https://www.recetasdepan.net/wp-content/uploads/2019/12/Receta-de-pan-de-molde.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (2,'Pan de molde sin corteza',1.57,1.99,'€','https://www.panflor.es/wp-content/uploads/2018/04/Blanco-sin-corteza.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (3,'Pan integral',1.41,1.79,'€','https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/f1ec1b78-4db1-45ac-9189-40619b7fad74/Derivates/2c238c6b-e380-486e-b9dc-39e41695a5ba.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (4,'Bollicao',0.94,1.2,'€','https://i.imgur.com/596qw.png',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (5,'Galletas tradicionales',1.73,2.19,'€','https://www.visitflanders.com/es/binaries/speculoos_banner_crop1400x560_tcm24-7339.JPG',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (6,'Croissant',0.19,0.25,'€','https://okdiario.com/img/2018/09/14/receta-de-croissant-de-hojaldre-655x368.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (7,'Napolitana chocolate',0.23,0.3,'€','https://www.chocolatenegro.info/contenidos/imagenes/receta-de-napolitanas-de-chocolate.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (8,'Caña de chocolate',0.23,0.3,'€','https://www.alcampo.es/media/hdc/h03/9355443339294.gif',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (9,'Empanada pollo y champiñones',1.57,1.99,'€','https://s1.eestatic.com/2015/03/17/cocinillas/Cocinillas_18758272_116119786_1706x960.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (10,'Palmera huevo',0.7,0.89,'€','https://lh3.googleusercontent.com/proxy/AokPmsrRdcI6tgnRnnt0qtYG_X7CzLyoTN6wuuQW-SjN7YJviOZiaJLiO68Gs35TMF7-Ye5ao9gm--cDceCZHguy',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (11,'Yogour griego',0.9,1.15,'€','https://a0.soysuper.com/8089a31fe976d9621e7a6dd767f446b6.1500.0.0.0.wmark.fcd3354a.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (12,'Yogour griego trozos de fruta',1.22,1.55,'€','https://unimarc.vteximg.com.br/arquivos/ids/184144-1000-1000/000000000802977001-UN-01-27955.jpg?v=636954333238170000',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (13,'Pack 6 yogures fresa',0.94,1.19,'€','https://s1.eestatic.com/2019/04/16/ciencia/nutricion/Yogur-OCU_Organizacion_de_Consumidores_y_Usuarios-Seguridad_alimentaria-Nutricion_391472797_120594008_1706x960.jpg',2,2,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (14,'Pack 4 yogures Platano',0.94,1.19,'€','https://cuantoazucar.com/sites/default/files/fichas/card/f0/g0213f0.png',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (15,'Pack 6 yogures macedonia',0.94,1.19,'€','https://a2.soysuper.com/91c5fdd89e6d463d21147f288126b225.1500.0.0.0.wmark.d154f7d6.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (16,'Batido de fresa',1.25,1.59,'€','https://a0.soysuper.com/ff35b9d169133ebfdf98607185ddd869.1500.0.0.0.wmark.5895f61c.jpg',2,2,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (17,'Batido chocolate',1.25,1.59,'€','https://a1.soysuper.com/edc234aa98fa3a6a5674704134a93a7c.1500.0.0.0.wmark.8ba69d28.jpg',2,2,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (18,'Batido vainilla',1.25,1.59,'€','https://www.cestaclick.es/279-thickbox_default/Puleva-Batido-de-Vainilla-1L-.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (19,'YoPro natural',1.57,1.99,'€','https://static.ulabox.com/media/125590/yogur-alto-en-proteinas-natural-yopro-2x160gr_fb2.jpg',2,1,2);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (20,'Vino blanco de cocina',0.78,0.99,'€','https://www.cristinaoria.com/159-large_default/VINO_BLANCO__HACIENDA_MONTECORTO_VERDEJO.jpg',3,2,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (21,'Vino tinto',0.78,0.99,'€','https://fuegoysal.com/306-large_default_2x/vino-tinto-entrechuelos-roble.jpg',3,1,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (22,'Tinto de verano con limon',1.02,1.3,'€','https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201902/12/00118628200356____5__600x600.jpg',3,1,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (23,'Tinto de verano con casera',1.02,1.3,'€','https://static.condisline.com/resize_395x416/images/catalog/large/603179.jpg',3,2,3);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (24,'Desodorante Dark',1.17,1.49,'€','https://www.perfumeriasana.com/documents/10180/10526/40664_G.jpg',4,2,4);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (25,'Desodorante Night',1.17,1.49,'€','https://www.pacoperfumerias.com/content/images/thumbs/0055973_desodorante-body-spray-black-night.jpeg',4,1,4);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (26,'Chocolate con leche',0.78,0.99,'€','https://a1.soysuper.com/a32808d129c8ba174beebec7ed681ef1.1500.0.0.0.wmark.11208d2a.jpg',1,2,5);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (27,'Chocolate blanco',0.78,0.99,'€','https://supercostablanca.es/4366-thickbox_default/milka-choco-weisse-schokolade-100g--chocolate-blanco.jpg',1,2,5);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (28,'Chocolate negro 70%',0.94,1.2,'€','https://www.valor.es/wp-content/uploads/2016/05/chocolate-70-negro-sin-azucar.png',1,2,5);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (29,'Chocolate negro 85%',0.94,1.2,'€','https://yourspanishcorner.com/4637-thickbox_default/chocolate-negro-85-sin-azucar-valor-.jpg',1,2,5);
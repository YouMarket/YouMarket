insert into supermercado (id, nombre, descripcion, c_postal) values (1, 'Mercadona', 'Mercadona de calle Salado', '41010');
insert into supermercado (id, nombre, descripcion, c_postal) values (2, 'Lidl', 'Lidl de calle Torneo', '41001');

insert into marca (id, nombre) values (1, 'Hacendado');
insert into marca (id, nombre) values (2, 'Danone');
insert into marca (id, nombre) values (3, 'Don simon');
insert into marca (id, nombre) values (4, 'Axe');
insert into marca (id, nombre) values (5, 'Nestle');
insert into marca (id, nombre) values (6, 'Apis'); 
insert into marca (id, nombre) values (7, 'Alsur'); 
insert into marca (id, nombre) values (8, 'Fresco');

insert into departamento (id, nombre) values (1, 'Panadería');
insert into departamento (id, nombre) values (2, 'Lácteos');
insert into departamento (id, nombre) values (3, 'Vinos');
insert into departamento (id, nombre) values (4, 'Perfumería');

insert into suscripcion (id, nombre, precio, envios, dietista) values (1, 'Un envío sin dietista', 6, 1, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (2, 'Un envío con dietista', 9, 1, true);
insert into suscripcion (id, nombre, precio, envios, dietista) values (3, 'Dos envíos sin dietista', 10, 2, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (4, 'Dos envíos con dietista', 13, 2, true);
insert into suscripcion (id, nombre, precio, envios, dietista) values (5, 'Tres envíos sin dietista', 14, 3, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (6, 'Tres envíos con dietista', 17, 3, true);
insert into suscripcion (id, nombre, precio, envios, dietista) values (7, 'Cuatro envíos sin dietista', 17, 4, false);
insert into suscripcion (id, nombre, precio, envios, dietista) values (8, 'Cuatro envíos con dietista', 20, 4, true);

insert into role(id, name) values (1, 'CLIENTE');
insert into role(id, name) values (2, 'CLIENTE_CON_DIETAS');
insert into role(id, name) values (3, 'DIETISTA');
insert into role(id, name) values (4, 'ADMIN');

insert into usuario (id, nombre, apellidos, dni, c_postal, email, password, telefono, suscripcion_id) 
	values (1, 'YouMarket', 'Administrador', '00000000T', '41001', 'admin@youmarket.es', '$2a$10$fX7k2syxD.Pjy5XK3gm0/Osok5QalZUhPbgR30DABexosc6kfsgdm', '6111111', 4);
insert into usuario (id, nombre, apellidos, dni, c_postal, email, password, telefono, suscripcion_id) 
	values (2, 'Juan', 'Alforja', '00000000T', '41001', 'alforja@gmail.com', '$10$sTLY/Atp7SE95SQVuRgmiuVYFVskeHzKNIi0vWz3OwmlrraT4OTue', '6111111', 8);
insert into usuario (id, nombre, apellidos, dni, c_postal, email, password, telefono, suscripcion_id) 
	values (3, 'María', 'Parra', '00000000T', '41001', 'mariaparra@gmail.com', '$10$GZDZoRArJC4Ds4EWzywMZuvt.dbBAVzACpUjS1XyCuFpfvSfKLWta', '6111111', 7);
insert into user_roles(user_id, role_id)
	values(1, 4);
insert into user_roles(user_id, role_id)
	values(2, 2);
insert into user_roles(user_id, role_id)
	values(3, 1);
    

insert into factura (id, total, total_iva, usuario_id, suscripcion_id) values (1, 13.43, 17, 1, 7);

insert into dieta (id, nombre, tipo, activa, url_imagen, descripcion) values (1, 'Vegetariana de invierno', 'Vegetariana', True, 'https://static1.abc.es/media/salud/2019/05/17/brocoli-kOoH--620x349@abc.jpg', 'Esto es una dieta sin carne ni pescado');
insert into dieta (id, nombre, tipo, activa, url_imagen, descripcion) values (2, 'Hiperproteica', 'Hiperproteica', True, 'https://www.aquiconfidencial.es/wp-content/uploads/2018/07/dieta-hiperproteica.jpg', 'Esto es una dieta alta en proteínas. Incluye grandes cantidades de legumbres, carne, pescado y huevo.');


insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (1,'Pan de molde',0.79,1,'€','https://www.recetasdepan.net/wp-content/uploads/2019/12/Receta-de-pan-de-molde.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (2,'Pan de molde sin corteza',1.57,1.99,'€','https://www.panflor.es/wp-content/uploads/2018/04/Blanco-sin-corteza.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (3,'Pan integral',1.41,1.79,'€','https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/f1ec1b78-4db1-45ac-9189-40619b7fad74/Derivates/2c238c6b-e380-486e-b9dc-39e41695a5ba.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (4,'Bollicao',0.94,1.2,'€','https://i.imgur.com/596qw.png',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (5,'Galletas tradicionales',1.73,2.19,'€','https://www.visitflanders.com/es/binaries/speculoos_banner_crop1400x560_tcm24-7339.JPG',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (6,'Croissant',0.19,0.25,'€','https://okdiario.com/img/2018/09/14/receta-de-croissant-de-hojaldre-655x368.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (7,'Napolitana chocolate',0.23,0.3,'€','https://www.chocolatenegro.info/contenidos/imagenes/receta-de-napolitanas-de-chocolate.jpg',1,2,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (8,'Caña de chocolate',0.23,0.3,'€','https://www.alcampo.es/media/hdc/h03/9355443339294.gif',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (9,'Empanada pollo y champiñones',1.57,1.99,'€','https://s1.eestatic.com/2015/03/17/cocinillas/Cocinillas_18758272_116119786_1706x960.jpg',1,1,1);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (10,'Palmera huevo',0.7,0.89,'€','https://hnaspuente.com/16/palmera-de-yema.jpg',1,2,1);
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
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (30,'Tomate natural triturado 800 g.',1.15,1.2,'€','https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA02/CONTENIDOS/201408/20/00118027500182____1__600x600.jpg',1,2,6);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (31,'Habas cocidas 425 g. escurrido',1.85,1.2,'€','https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201909/26/00118029902709____1__600x600.jpg',1,2,7);
insert into producto (id, nombre, precio, precio_iva, unidad, url_imagen, departamento, supermercado_id, marca) values (32,'Brócoli 500g.',0.99,1.2,'€','https://static1.abc.es/media/salud/2019/05/17/brocoli-kOoH--620x349@abc.jpg',1,2,8);

insert into dieta_productos (dieta_id, productos_id) values (1, 30);
insert into dieta_productos (dieta_id, productos_id) values (1, 31);
insert into dieta_productos (dieta_id, productos_id) values (1, 32);

insert into dieta_productos (dieta_id, productos_id) values (2, 31);
insert into dieta_productos (dieta_id, productos_id) values (2, 11);
insert into dieta_productos (dieta_id, productos_id) values (2, 19);

INSERT INTO receta (`id`,`calorias`, `descripcion`, `nombre`, `personas`, `tiempo`, `url_imagen`) values (1,2682, 'Precalentar el horno a 220º C y peparar dos bandejas o fuentes grandes con papel de hornear antiadherente. Enjuagar y escurrir bien las lentejas, con suavidad, tanto si se usan en conserva como si las hemos cocido en casa. Es mejor si las hemos dejado ligeramente firmes. Disponer en un recipiente, añadir el aceite de oliva, el vinagre, salpimentar y mezclar con las especias. Cortar en juliana fina las dos cebollas y combinar con las lentejas. Extender en las dos bandejas, repartiendo la mezcla de tal modo que no se apelotonen demasiado, dejando una sola capa.Hornear ambas bandejas a la vez, cambiando sus posiciones y girándolas pasados 15 minutos. Cuando lleven ya 20-25 minutos, vigilar que no se quemen y remover con una espátula. Continuar horneando hasta que estén muy crujientes y tostadas. Dejar enfriar fuera del horno y servir con ralladura de limón y cebollino o perejil picado, salpimentando al gusto. Aliñar con una vinagreta, si se desea.'
								, 'Ensalada de lentejas', 4, 40, 'https://i.blogs.es/2b1070/ensalada-lentejas1/1366_2000.jpg');
INSERT INTO receta (`id`,`calorias`, `descripcion`, `nombre`, `personas`, `tiempo`, `url_imagen`) values (2, 1482, 'Lavamos y troceamos la berenjena en dados de igual tamaño (o lo más similar posible). La colocamos por capas en un colador, sazonando entre capa y capa, y dejamos que suelte los jugos amargos durante 30 minutos. Mientras tanto preparamos el resto de las verduras y las mantenemos en recipientes separados. Pelamos la cebolla y la cortamos en tiras finas (o juliana), Lavamos el pimiento y troceamos el pimiento en trozos . Lavamos el calabacín y lo cortamos en rodajas gruesas primero y después en cuartos. Pelamos los tomates y troceamos. Calentamos un poco de aceite de oliva virgen extra en una sartén y rehogamos la cebolla durante 10 minutos a fuego medio-bajo. Añadimos el pimiento, los dientes de ajo y rehogamos durante unos 8-10 minutos más. Sazonamos y retiramos a una fuente. En la misma sartén rehogamos el calabacín y la berenjena, por separado, hasta que estén tiernos y añadiendo aceite si hiciera falta. Retiramos a la fuente con el resto de verduras. Incorporamos el tomate y sofreímos junto con las hierbas provenzales al tiempo que aplastamos para formar una salsa. Cuando el tomate esté bien cocido añadimos todas las verduras a la cazuela, removemos con cuidado y cocemos 20 minutos más para que los sabores se integren. Servimos inmediatamente.'
								, 'Pisto y caponata siciliana', 4, 60, 'https://i.blogs.es/47f4b5/ratatuille/1366_2000.jpg');
INSERT INTO receta (`id`,`calorias`, `descripcion`, `nombre`, `personas`, `tiempo`, `url_imagen`) values (3, 3082, 'Las verduras deben formar parte de tu dieta del mismo modo que las proteínas. Por ello, la mejor opción es que prepares platos que sean abundantes en vegetales y proteínas para saciar tu apetito al máximo. Para hacer esta ensalada para 2 personas necesitarás estos ingredientes: 200 gramos de espinacas frescas, 2 pechugas de pollo, 1 cebolla, 30 gramos de salsa de soja ,Nueces y cacahuetes tostados sin sal, Aceite de oliva ,Sal y pimienta. Lo primero que haremos será limpiar bien las espinacas para eliminar cualquier resto de suciedad. Ahora, lo que haremos será poner un chorrito de aceite en una sartén y picar la cebolla. La echaremos cuando el aceite esté caliente y, a continuación, añadiremos el pollo cortado en finas tiras. Salpimentamos y dejamos que se cocinen durante unos 8 minutos. Añadimos a la sartén los frutos secos y la salsa de soja y removemos para que todos los sabores se integren. Cuando esté todo listo, retiramos del fuego y dejamos que se enfríen ligeramente. En un bol aparte, prepararemos el resto de ingredientes en frío y lo mezclaremos todo para disfrutar de una sabrosa ensalada y muy nutritiva. '
								, 'Ensalada de espinaca con pollo y soja', 2, 3, 'https://i.blogs.es/3e113e/ensalada-espinacas-pollo/840_560.jpg');
INSERT INTO receta (`id`,`calorias`, `descripcion`, `nombre`, `personas`, `tiempo`, `url_imagen`) values (4, 1842, 'Y terminamos este apartado hablando de una receta que es perfecta para el desayuno o para la cena. Se trata de preparar unos ricos huevos con jamón serrano que tendrán un sabor muy intenso y delicioso. Para ello, tan solo necesitarás: 2 huevos, Jamón serrano a taquitos, Sal y pimienta, Aceite de oliva. Hay dos opciones para preparar este plato: por un lado, puedes romper los huevos y, así, hacer una especie de salteado con jamón. O, por otro lado, puedes preparar los huevos a la plancha, con poco aceite, y disfrutar de un plato sabroso y delicioso. '
								, 'Huevos con jamón serrano', 1, 15, 'http://i.ytimg.com/vi/kUnwEm6J2j4/maxresdefault.jpg');

INSERT INTO dieta_recetas(dieta_id, recetas_id) VALUES (1,1);
INSERT INTO dieta_recetas(dieta_id, recetas_id) VALUES (1,2);
INSERT INTO dieta_recetas(dieta_id, recetas_id) VALUES (2,3);
INSERT INTO dieta_recetas(dieta_id, recetas_id) VALUES (2,4);

insert into brecha (id, activada) values (2, 0);




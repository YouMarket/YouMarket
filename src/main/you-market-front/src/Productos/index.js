import React, {useState, useCallback, useEffect} from 'react';
import './styles.css';
import Producto from '../Producto';
import Header from '../Header';

function Productos() {
	
const [productos, setProductos] = useState([]);
const [marcas, setMarcas] = useState([]);
const [supermercados, setSupermercados] = useState([]);
const [displayedProducts, setDisplayedProducts] = useState([]);

	const fetchProductos = useCallback(() => {
	    return fetch('producto/list')
	      .then(res => res.json())
	      .then(productos => {
			setProductos(productos);
			setDisplayedProducts(productos);
	      });
	  }, []);
	
	useEffect(() => {
	    fetchProductos();
	  }, [fetchProductos]);

	const fetchMarcas = useCallback(() => {
	return fetch('producto/marcas')
		.then(res => res.json())
		.then(marcas => {
		setMarcas(marcas);
		console.log(marcas);
		});
	}, []);

	useEffect(() => {
		fetchMarcas();
	}, [fetchMarcas]);

	const fetchSupermercados = useCallback(() => {
		return fetch('producto/supermercados')
			.then(res => res.json())
			.then(supermercados => {
			setSupermercados(supermercados);
			console.log(supermercados);
			});
		}, []);
	
	useEffect(() => {
		fetchSupermercados();
	}, [fetchSupermercados]);
	
	function search(event){
		var searchQuery = event.target.value.toLowerCase();
		var displayedProducts = productos.filter(function(el){
			var serchVal = el.nombre.toLowerCase();
			return serchVal.indexOf(searchQuery)!==-1;
		});
		setDisplayedProducts(displayedProducts)
	};

	function filterMarcas(event){
		var searchQuery = event.target.value.toLowerCase();
		var productosFiltrados = displayedProducts.filter(function(el){
			var serchVal = el.marca.nombre.toLowerCase();
			return serchVal.indexOf(searchQuery)!==-1;
		});
		setDisplayedProducts(productosFiltrados) 
	}

	function filterSupermercados(event){
		var searchQuery = event.target.value.toLowerCase();
		var productosFiltrados = displayedProducts.filter(function(el){
			var serchVal = el.supermercado.nombre.toLowerCase();
			return serchVal.indexOf(searchQuery)!==-1;
		});
		setDisplayedProducts(productosFiltrados) 
	}

	function resetFilters(){
		setDisplayedProducts(productos)
		window.location.reload()
	}
	
  return(
	<div>	  
	  <Header/>
	  <div className="productos-page container">
		<h1 className="productos-title">Aquí tienes los productos disponibles 🤙</h1>
		<input className="productos-search" type="text" onChange={search} placeholder="Busca aquí tus productos favoritos..."/>
		<div className="productos-filtro filtroMarca">
			<p>Filtra por marca:</p>
			<select name="marcas" onChange={filterMarcas}>
				<option key="null" value="">------------</option>
				{marcas.map(marca => 
					<option key={marca.id} value={marca.nombre}>{marca.nombre}</option>
				)}
			</select>
		</div>

		<div className="productos-filtro filtroSuper">
			<p>Filtra por supermercado:</p>
			<select name="supermercados" onChange={filterSupermercados}>
				<option key="null" value="---">------------</option>
				{supermercados.map(supermercado => 
					<option key={supermercado.id} value={supermercado.nombre}>{supermercado.nombre}</option>
				)}
			</select>
		</div>

		<button className="button-finish" onClick={resetFilters}>Resetear filtros</button>
	  </div>
	  <div className="productos-container">
	  	<div className="grid">
	  		{displayedProducts.map(producto => (
	  			<Producto 
	  				id={producto.id}  
	  				urlImagen={producto.urlImagen} 
	  				nombre={producto.nombre} 
	  				supermercado={producto.supermercado.nombre} 
	  				precio={producto.precioIva} 
	  				unidad={producto.unidad}
	  				key={producto.id}
	  			/>
	  		))}
	  	</div>
	  </div>
	</div>
 );
}
export default Productos;
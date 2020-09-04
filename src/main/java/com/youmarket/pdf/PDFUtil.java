package com.youmarket.pdf;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.youmarket.domain.CestaProducto;
import com.youmarket.domain.Direccion;
import com.youmarket.domain.Factura;
import com.youmarket.domain.Pedido;
import com.youmarket.domain.Suscripcion;
import com.youmarket.domain.Usuario;
import com.youmarket.services.CestaProductoService;

public class PDFUtil {
	
	
	private static NumberFormat numFormatter = new DecimalFormat("#0.00"); 
	private static SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	
	@Autowired
	CestaProductoService cpService;
	
	public PDFUtil() {
		super();
	}

	private static Paragraph parrafoFactura(Factura factura, Usuario usuario) {
		Paragraph p = new Paragraph();
		p.add("\n \n");
		p.add("Importe: "+numFormatter.format(factura.getTotal()) + " €");
		p.add("\nImporte + I.V.A.: "+numFormatter.format(factura.getTotalIva()) + " €");
		p.add("\nCliente: "+usuario.getNombre()+" "+usuario.getApellidos());
		if(factura.getPedido()!= null) {
			p.add("\nDirección: "+factura.getPedido().getDireccion());
		}
		if(factura.getFechaFactura() != null)
			p.add("\nFecha de la factura: "+ dateFormatter.format(factura.getFechaFactura()));
		p.setAlignment(Element.ALIGN_JUSTIFIED);

		return p;
	}
	
	private static PdfPTable cabecera(String tipo) throws DocumentException, MalformedURLException, IOException {
		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(80);

		Image imagen = Image.getInstance(ClassLoader.getSystemResource("img/logo.png").getFile());
		imagen.scaleAbsolute(60, 60);

		PdfPCell hcell;
		hcell = new PdfPCell(imagen);
		hcell.setBorderWidth(0f);
		hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table.addCell(hcell);

		Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		headFont.setSize(18);
		hcell = new PdfPCell(new Phrase(tipo, headFont));
		hcell.setBorderWidth(0f);
		hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(hcell);

		headFont.setSize(12);
		hcell = new PdfPCell(new Phrase(dateFormatter.format(new Date()), headFont));
		hcell.setBorderWidth(0f);
		hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		hcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table.addCell(hcell);
		
		return table;
	}
	
	public static ByteArrayInputStream suscripcionPDFGenerator(Factura factura, Suscripcion suscripcion) {

		Document document = new Document();
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		try {

			PdfPTable table = cabecera("Factura de suscripción");
			Paragraph p = new Paragraph();
			p.add("\nSuscripción: "+suscripcion.getNombre());
			p.setAlignment(Element.ALIGN_JUSTIFIED);

			Paragraph pFactura = parrafoFactura(factura, factura.getUsuario());

			PdfWriter.getInstance(document, out);
			document.open();

			document.add(table);
			document.add(p);
			document.add(pFactura);

			document.close();

		} catch (DocumentException ex) {

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ByteArrayInputStream(out.toByteArray());
	}
	
	public static ByteArrayInputStream pedidoPDFGenerator(Factura factura, List<CestaProducto> lista) {

		Document document = new Document();
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		try {

			PdfPTable table = cabecera("Factura de pedido");
			Paragraph pFactura = parrafoFactura(factura, factura.getPedido().getUsuario());

			PdfPTable pedidos = tablaPedidos(factura, lista);
			
			PdfWriter.getInstance(document, out);
			document.open();

			document.add(table);
			document.add(new Paragraph("\n"));
			document.add(pedidos);
			document.add(pFactura);

			document.close();
		} catch (DocumentException ex) {

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ByteArrayInputStream(out.toByteArray());
	}

	private static PdfPTable tablaPedidos(Factura f ,List<CestaProducto> lista) throws DocumentException {
		
		PdfPTable table = new PdfPTable(4);

		Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		headFont.setSize(12);
        PdfPCell hcell;
        hcell = new PdfPCell(new Phrase("Producto", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Cantidad", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Precio", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Precio Total", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);
		
        for (CestaProducto prod : lista) {

            PdfPCell cell;

            cell = new PdfPCell(new Phrase(prod.getProducto().getNombre()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(String.valueOf(prod.getCantidad())));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(String.valueOf(numFormatter.format(prod.getProducto().getPrecioIva()))+ " €"));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
            
            cell = new PdfPCell(new Phrase(String.valueOf(numFormatter.format(prod.getProducto().getPrecioIva()* prod.getCantidad()))+ " €"));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
		}

        if(f != null) {
        	PdfPCell cell;
        	
	        cell = new PdfPCell(new Phrase("Total"));
	        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
	        cell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
	        table.addCell(cell);
	
	        cell = new PdfPCell(new Phrase(""));
	        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
	        cell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
	        table.addCell(cell);
	
	        cell = new PdfPCell(new Phrase(""));
	        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
	        cell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
	        table.addCell(cell);
        
        
        	cell = new PdfPCell(new Phrase(String.valueOf(numFormatter.format(f.getTotalIva()))+" €"));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
        }
        
        
        
		return table;
	}

	public static ByteArrayInputStream usuarioPDFGenerator(Usuario user, List<Direccion> direcciones,
			List<List<CestaProducto>> productosCestas, List<List<CestaProducto>> productosPedidos, List<Factura> facturas) {
		
		Document document = new Document();
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		try {

			PdfPTable table = cabecera("Datos del usuario");
			
			Paragraph pUsuario = datosUsuario(user);
			
			Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			Paragraph pd = new Paragraph();
			headFont.setSize(18);
			pd.add(new Phrase("\nDirección del usuario: ",headFont));
			List<Paragraph> dirs = parrafoDirecciones(direcciones);
			
			Paragraph pc = new Paragraph();
			pc.add(new Phrase("\nCestas del usuario: ",headFont));
			List<Paragraph> cs = parrafoCestas(productosCestas);
			
			Paragraph pp = new Paragraph();
			pp.add(new Phrase("\nPedidos realizados por el usuario: ",headFont));
			List<Paragraph> ps = parrafoPedidos(productosPedidos);
			
			Paragraph pf = new Paragraph();
			headFont.setSize(18);
			pf.add(new Phrase("\nFacturas del usuario: ",headFont));
			List<Paragraph> fs = parrafoFacturas(facturas);

			PdfWriter.getInstance(document, out);
			document.open();

			
			document.add(table);
			document.add(new Paragraph("\n"));
			document.add(pUsuario);
			document.add(pd);
			for (Paragraph paragraph : dirs) {
				document.add(paragraph);
			}
			document.add(pc);
			for (Paragraph paragraph : cs) {
				document.add(paragraph);
			}
			document.add(pp);
			for (Paragraph paragraph : ps) {
				document.add(paragraph);
			}
			document.add(pf);
			for (Paragraph paragraph : fs) {
				document.add(paragraph);
			}
			

			document.close();
		} catch (DocumentException ex) {

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ByteArrayInputStream(out.toByteArray());
	}
	
	private static Paragraph datosUsuario(Usuario usuario) {
		Paragraph p = new Paragraph();
		
		p.add("\n");
		Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		headFont.setSize(18);
		p.add(new Phrase("Datos del usuario: ",headFont));
		p.add("\nNombre y apellidos: "+usuario.getNombre() + " "+usuario.getApellidos());
		p.add("\nDNI: "+usuario.getDni());
		p.add("\nFecha de nacimiento: "+usuario.getFechaNacimiento());
		p.add("\nCódigo postal: "+usuario.getCPostal());
		p.add("\nSuscripción actual: "+usuario.getSuscripcion().getNombre());
		p.add("\nEmail: "+usuario.getEmail());
		p.add("\nTeléfono: "+usuario.getTelefono());
		p.add("\n\n");
		
		return p;
	}
	
	private static List<Paragraph> parrafoDirecciones(List<Direccion> dirs) {
		List<Paragraph> lista = new ArrayList<>();
		for (Direccion dir : dirs) {
			Paragraph p = new Paragraph();
			p.add("\nDirección completa: "+dir.getDireccion());
			p.add("\nPoblación: "+dir.getPoblacion());
			p.add("\nProvincia: "+dir.getProvincia());
			p.add("\nCódigo postal: "+dir.getCpostal());
			p.add("\n");
			lista.add(p);
		}
		
		return lista;
	}
	
	private static List<Paragraph> parrafoCestas(List<List<CestaProducto>> productosCestas) throws DocumentException {
		List<Paragraph> lista = new ArrayList<>();
		for (List<CestaProducto> cesta : productosCestas) {
			Paragraph p = new Paragraph();
			p.add("\n");
			Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			headFont.setSize(15);
			p.add(new Phrase("Cesta ID. "+cesta.get(0).getCesta().getId(),headFont));
			p.add("\nNombre: "+cesta.get(0).getCesta().getNombre());
			p.add("\n");
			p.add(tablaPedidos(null, cesta));
			p.add("\n");
			lista.add(p);
		}
		return lista;
	}
	
	private static List<Paragraph> parrafoPedidos(List<List<CestaProducto>> productosPedidos) throws DocumentException {
		List<Paragraph> lista = new ArrayList<>();
		for (List<CestaProducto> cesta : productosPedidos) {
			if(!cesta.isEmpty()) {
				Pedido pedido = (Pedido) cesta.get(0).getCesta(); 
				Paragraph p = new Paragraph();
				p.add("\n");
				Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
				headFont.setSize(15);
				p.add(new Phrase("Pedido ID. "+cesta.get(0).getCesta().getId(),headFont));
				p.add("\nDirección: "+pedido.getDireccion());
				p.add("\nPoblación: "+ pedido.getPoblacion());
				p.add("\nProvincia: "+ pedido.getProvincia());
				if(pedido.getFechaHoraPedido() != null)
					p.add("\nFecha pedido: "+dateFormatter.format(pedido.getFechaHoraPedido()));
				p.add("\nHora inicio recepción: "+pedido.getHoraEnvioIni());
				p.add("\nHora máxima recepción: "+pedido.getHoraEnvioFin());
				
				p.add("\n");
				p.add(tablaPedidos(pedido.getFactura(), cesta));
				p.add("\n");
				lista.add(p);
			}
		}
		return lista;
	}
	
	private static List<Paragraph> parrafoFacturas(List<Factura> facturas) {
		List<Paragraph> lista = new ArrayList<>();
		for (Factura f : facturas) {
			Paragraph p = new Paragraph();
			if(f.getPedido()!= null) {
				p.add("\nFactura del pedido ID. "+f.getPedido().getId());
			}else {
				p.add("\nFactura de suscripción.");
			}
			p.add("\nFecha de la factura: "+dateFormatter.format(f.getFechaFactura()));
			p.add("\nImporte total de la factura: "+f.getTotal()+" €");
			p.add("\nImporte total con IVA de la factura: "+f.getTotalIva()+" €");
			lista.add(p);
		}
		
		return lista;
	}
}

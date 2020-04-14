package com.youmarket.pdf;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
import com.youmarket.domain.Factura;
import com.youmarket.domain.Suscripcion;

public class PDFUtil {
	
	private static SimpleDateFormat formatDate() {
		return new SimpleDateFormat("dd/MM/yyyy HH:mm");
	}

	private static Paragraph parrafoFactura(Factura factura) {
		NumberFormat formatter = new DecimalFormat("#0.00");  
		Paragraph p = new Paragraph();
		p.add("\n \n");
		p.add("Importe: "+formatter.format(factura.getTotal()) + " €");
		p.add("\nImporte + I.V.A.: "+formatter.format(factura.getTotalIva()) + " €");
		if(factura.getFechaFactura() != null)
			p.add("\nFecha de la factura: "+ formatDate().format(factura.getFechaFactura()));
		p.setAlignment(Element.ALIGN_JUSTIFIED);

		return p;
	}
	
	private static PdfPTable cabecera(String tipo) throws DocumentException, MalformedURLException, IOException {
		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(80);

		Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		Image imagen = Image.getInstance(ClassLoader.getSystemResource("img/logo.png").getFile());
		imagen.scaleAbsolute(60, 60);

		PdfPCell hcell;
		hcell = new PdfPCell(imagen);
		hcell.setBorderWidth(0f);
		hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table.addCell(hcell);

		headFont.setSize(18);
		hcell = new PdfPCell(new Phrase(tipo, headFont));
		hcell.setBorderWidth(0f);
		hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(hcell);

		headFont.setSize(12);
		hcell = new PdfPCell(new Phrase(formatDate().format(new Date()), headFont));
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

			Paragraph pFactura = parrafoFactura(factura);

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
			Paragraph pFactura = parrafoFactura(factura);

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
        
        NumberFormat formatter = new DecimalFormat("#0.00");  
		
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

            cell = new PdfPCell(new Phrase(String.valueOf(formatter.format(prod.getProducto().getPrecioIva()))+ " €"));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
            
            cell = new PdfPCell(new Phrase(String.valueOf(formatter.format(prod.getProducto().getPrecioIva()* prod.getCantidad()))+ " €"));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
		}
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
        
        cell = new PdfPCell(new Phrase(String.valueOf(formatter.format(f.getTotalIva()))+" €"));
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(cell);
        
        
		return table;
	}
}

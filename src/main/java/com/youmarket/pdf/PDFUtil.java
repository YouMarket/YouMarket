package com.youmarket.pdf;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
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

	public static ByteArrayInputStream suscripcionPDFGenerator(Factura factura, Suscripcion suscripcion) {

		Document document = new Document();
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		try {

			PdfPTable table = new PdfPTable(3);
			table.setWidthPercentage(60);
			table.setWidths(new int[] { 1, 3, 3 });

			Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

			PdfPCell hcell;
			hcell = new PdfPCell(new Phrase("Id", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Name", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Population", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(hcell);

			Image imagen = Image.getInstance(ClassLoader.getSystemResource("img/logo.png").getFile());
			imagen.scaleAbsolute(60, 60);

			Paragraph paragraphHello = new Paragraph();
			paragraphHello.add("PDF de factura de Suscripción");
			paragraphHello.setAlignment(Element.ALIGN_JUSTIFIED);

			PdfWriter.getInstance(document, out);
			document.open();

			document.add(imagen);
			document.add(paragraphHello);

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

			PdfPTable table = new PdfPTable(3);
			table.setWidthPercentage(60);
			table.setWidths(new int[] { 1, 3, 3 });

			Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

			PdfPCell hcell;
			hcell = new PdfPCell(new Phrase("Id", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Name", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Population", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(hcell);

			Image imagen = Image.getInstance(ClassLoader.getSystemResource("img/logo.png").getFile());
			imagen.scaleAbsolute(60, 60);

			Paragraph paragraphHello = new Paragraph();
			paragraphHello.add("PDF de factura de un pedido");
			paragraphHello.setAlignment(Element.ALIGN_JUSTIFIED);

			PdfWriter.getInstance(document, out);
			document.open();

			document.add(imagen);
			document.add(paragraphHello);

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

}

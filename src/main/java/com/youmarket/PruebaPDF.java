package com.youmarket;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class PruebaPDF {

	public static void main(String[] args) {
		Document doc = new Document(PageSize.A4, 36, 36, 154, 54);
		
		
    	
        try {
        	String path = new File(".").getCanonicalPath();
        	String FILE_NAME = path + "/factura.pdf";
			
        	PdfWriter.getInstance(doc, new FileOutputStream(new File(FILE_NAME)));
			doc.open();
			
			Paragraph paragraphHello = new Paragraph();
            paragraphHello.add("Hello iText paragraph!");
            paragraphHello.setAlignment(Element.ALIGN_JUSTIFIED);
 
            doc.add(paragraphHello);
            doc.close();
			
			 
		} catch (FileNotFoundException | DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

       

	}

}

/**
	Extracts and returns all text from a PDF. Uses the built-in iText library, version 2.1.7.

	@param {byte[]} pdfBytes - The raw byte array for the PDF.
	@return {String} The extracted text.
*/
function extractTextFromPDF(pdfBytes) {
	var text = new java.lang.StringBuilder();
	var reader = new com.lowagie.text.pdf.PdfReader(pdfBytes);
	
	try {
		var extractor = new com.lowagie.text.pdf.parser.PdfTextExtractor(reader);
		var pages = reader.getNumberOfPages();
		
		for (var i = 1; i <= pages; i++) {
			text.append(extractor.getTextFromPage(i));
			if (i < pages) {
				text.append('\n\n');
			}
		}
	} finally {
		reader.close();
	}

	return text.toString();
}
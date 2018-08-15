/**
	Loads the raw PDF byte array into a PDFBox PDDocument object, then returns the number of pages in
	the PDF.
	
	See also:
	https://svn.apache.org/repos/asf/pdfbox/cmssite/trunk/content/docs/1.8.4/javadocs/org/apache/pdfbox/pdmodel/PDDocument.html

	@param {byte[]} pdfBytes - The raw PDF byte array.
	@return {Number} The number of pages in the PDF.
*/
function getNumPagesInPDF(pdfBytes) {
	var is = new java.io.ByteArrayInputStream(pdfBytes);
	var pdf = org.apache.pdfbox.pdmodel.PDDocument.load(is);
	return pdf.getNumberOfPages();
}
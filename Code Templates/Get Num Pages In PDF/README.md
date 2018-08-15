# Get Num Pages In PDF
Loads the raw PDF byte array into a PDFBox PDDocument object, then returns the number of pages in the PDF.

See also: https://svn.apache.org/repos/asf/pdfbox/cmssite/trunk/content/docs/1.8.4/javadocs/org/apache/pdfbox/pdmodel/PDDocument.html

### Parameters:

- **pdfBytes:** The raw PDF byte array.

### Examples
Get number of pages from a PDF message attachment (3.6 and later):

```javascript
var attachment = getAttachments(true).get(0);
var pdfBytes = attachment.getContent();
var numPages = getNumPagesInPDF(pdfBytes);
```

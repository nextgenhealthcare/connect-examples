# Extract Text From PDF
Extracts and returns all text from a PDF. Uses the built-in iText library, version 2.1.7.

### Parameters:

- **pdfBytes:** The raw byte array for the PDF.

### Examples
Extract text from a Base64-encoded PDF string:

```javascript
var pdfBytes = FileUtil.decode(pdfBase64String);
var pdfText = extractTextFromPDF(pdfBytes);
```

Extract text from a PDF message attachment (before 3.6):

```javascript
// Is a byte array containing Base64 ASCII bytes
var attachmentContent = getAttachments().get(0).getContent();
// Convert to a Base64 string
var attachmentBase64String = new java.lang.String(attachmentContent, 'US-ASCII');
// Convert to raw PDF bytes
var pdfBytes = FileUtil.decode(attachmentBase64String);
// Extract the text
var pdfText = extractTextFromPDF(pdfBytes);
```

Extract text from a PDF message attachment (3.6 and later):

```javascript
// Pass in true for base64Decode, then content is already raw PDF bytes
var pdfBytes = getAttachments(true).get(0).getContent();
// Extract the text
var pdfText = extractTextFromPDF(pdfBytes);
```

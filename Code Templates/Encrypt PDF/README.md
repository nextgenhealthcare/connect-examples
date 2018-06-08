# Encrypt PDF
Encrypts a PDF with a password. Either a Base64 string or by array can be passed in, and the output can be written to a file or returned as a Base64 string.

### Parameters:

- **pdfBase64OrBytes:** The PDF data to encrypt. May be a Base64 string, or a byte array.
- **password:** The password to use for encryption.
- **outputFilename:** (Optional) The filename to output the encrypted PDF to. If omitted, the data will be returned from the function as a Base64 string.


### Examples
Take a Base64 encoded PDF in OBX.5.5, encrypt it, and put it back into the OBX: 

```javascript
msg['OBX']['OBX.5']['OBX.5.5'] = encryptPDF(msg['OBX']['OBX.5']['OBX.5.5'].toString(), 'password');
```

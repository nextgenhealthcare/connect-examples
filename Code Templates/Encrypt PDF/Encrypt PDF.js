/**
	Encrypts a PDF with a password. Either a Base64 string or by array can be passed in, and the output
	can be written to a file or returned as a Base64 string.

	@param {String/byte[]} pdfBase64OrBytes - The PDF data to encrypt. May be a Base64 string, or a
		byte array.
	@param {String} password - The password to use for encryption.
	@param {String} outputFilename - (Optional) The filename to output the encrypted PDF to. If
		omitted, the data will be returned from the function as a Base64 string.
	@return {String} If outputFilename is not specified, returns the Base64 string.
*/
function encryptPDF(pdfBase64OrBytes, password, outputFilename) {
	var document;
	var fos;

	try {
		var pdfBytes;
		if (pdfBase64OrBytes instanceof Array) {
			pdfBytes = pdfBase64OrBytes;
		} else {
			pdfBytes = FileUtil.decode(pdfBase64OrBytes);
		}

		var inputStream = new java.io.ByteArrayInputStream(pdfBytes);
		document = org.apache.pdfbox.pdmodel.PDDocument.load(inputStream);

		var accessPermission = new org.apache.pdfbox.pdmodel.encryption.AccessPermission();
		accessPermission.setCanAssembleDocument(false);
		accessPermission.setCanExtractContent(true);
		accessPermission.setCanExtractForAccessibility(false);
		accessPermission.setCanFillInForm(false);
		accessPermission.setCanModify(false);
		accessPermission.setCanModifyAnnotations(false);
		accessPermission.setCanPrint(true);
		accessPermission.setCanPrintDegraded(true);

		var policy = new org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy(UUIDGenerator.getUUID(), password, accessPermission);
		policy.setEncryptionKeyLength(128);
		document.protect(policy);

		if (outputFilename) {
			fos = new java.io.FileOutputStream(new java.io.File(outputFilename));
			document.save(fos);
		} else {
			var baos = new java.io.ByteArrayOutputStream();
			document.save(baos);
			return FileUtil.encode(baos.toByteArray());
		}
	} finally {
		if (document) {
			document.close();
		}
		if (fos) {
			fos.close();
		}
	}
}
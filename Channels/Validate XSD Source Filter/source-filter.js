importPackage(javax.xml);
importPackage(javax.xml.transform.stream);
importPackage(javax.xml.validation);

// Create thread-safe Schema once and store in global channel map
var schema = $gc('schema');
if (schema == null) {
	var schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
	var xsd = new java.net.URL('http://www.hl7.org/fhir/patient.xsd');
	schema = schemaFactory.newSchema(xsd);
	$gc('schema', schema);
}

var errors = Lists.list();
var fatalErrors = Lists.list();
var warnings = Lists.list();
var handler = new JavaAdapter(org.xml.sax.ErrorHandler, {
	error: function(e) {
		errors.add(e);
	},
	fatalError: function (e) {
		fatalErrors.add(e);
	},
	warning: function (e) {
		warnings.add(e);
	}
});

var validator = schema.newValidator();
validator.setErrorHandler(handler);
var source = new StreamSource(new java.io.StringReader(msg));

try {
	validator.validate(source);
} catch (e) {
	if (e.javaException) {
		errors.add(e.javaException);
	} else {
		errors.add(e);
	}
}

if (!warnings.isEmpty()) {
	var builder = new java.lang.StringBuilder();
	builder.append(new java.lang.Integer(warnings.size()).toString()).append(' warnings while validating XML.');

	processErrors(warnings, builder, 'Warning');

	$r('validationWarnings', new Response(Status.ERROR, '', builder.toString()));
}

if (!errors.isEmpty() || !fatalErrors.isEmpty()) {
	var builder = new java.lang.StringBuilder('Error validating XML: ');
	builder.append(new java.lang.Integer(errors.size()).toString()).append(' errors and ').append(new java.lang.Integer(fatalErrors.size()).toString()).append(' fatal errors.');

	processErrors(errors, builder, 'Error');
	processErrors(fatalErrors, builder, 'FATAL Error');
	
	$r('validationErrors', new Response(Status.ERROR, '', builder.toString()));
	return false;
}

return true;

function processErrors(list, builder, prefix) {
	for (var i = 0; i < list.size(); i++) {
		builder.append('\n\n').append(prefix).append(' #').append(new java.lang.Integer(i+1).toString()).append(': ');
		
		var e = list.get(i);
		if (e instanceof java.lang.Exception) {
			builder.append(org.apache.commons.lang3.exception.ExceptionUtils.getStackTrace(e));
		} else {
			builder.append(e.toString());
		}
	}
}
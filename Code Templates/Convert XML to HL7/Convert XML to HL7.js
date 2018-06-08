/**
	Deserializes an E4X XML node into HL7 v2.x. The last four parameters are optional and default to the
	standard encoding characters.

	@param {XML} node - The E4X XML node to deserialize.
	@param {String} fieldSeparator - Defaults to '|' if not specified.
	@param {String} componentSeparator - Defaults to '^' if not specified.
	@param {String} repetitionMarker - Defaults to '~' if not specified.
	@param {String} subcomponentSeparator - Defaults to '&' if not specified.
	@return {String} The deserialized HL7 v2.x string.
*/
function xmlToHL7(node, fieldSeparator, componentSeparator, repetitionMarker, subcomponentSeparator) {
	// Data validation
	if (!node) {
		return '';
	}
	
	// This shouldn't really ever happen with E4X anyway, but just in case.
	String.prototype.replaceAmp = function() {return this.replace(/&amp;/g,'&');};
	
	// If we're just dealing with a simple node, then just return its contents.
	if (node.hasSimpleContent()) {
		return node.toString().replaceAmp();
	}
	
	// Used for StringUtils
	importPackage(org.apache.commons.lang3);
	
	// Defaults to standard HL7 encoding characters
	var fs = fieldSeparator || '|';
	var cs = componentSeparator || '^';
	var rm = repetitionMarker || '~';
	var ss = subcomponentSeparator || '&';
	var cr = '\x0D';

	// What will actually be returned
	var output = '';
	// Get the XML name of the node (in the case of an XMLList of repeating fields, the first one will be returned, since they all have the same name anyway)
	var qname = node[0].name().toString();
	// Use the HL7 dot notation to find what level we're at
	var level = StringUtils.countMatches(qname,'.');

	// If the name is HL7Message, we're at the root node
	if (qname == 'HL7Message') {
		// Recursively append serialization for each segment
		for each (segment in node.children()) {
			output += xmlToHL7(segment,fs,cs,rm,ss);
		}
	} else if (level == 0) { // If we're at the segment level
		// If the node is an XMLList of multiple segments
		if (node.length() > 1) {
			// Recursively append serialization for each segment
			for each (segment in node) {
				output += xmlToHL7(segment,fs,cs,rm,ss);
			}
		} else {
			// Add the segment name to the output
			output += qname;
			// Initialize name placeholder
			var prevName = '';
			
			// Iterate through each field in the segment
			for each (field in node.children()) {
				// Get the QName of the field
				var fieldName = field.name().toString();
				
				// If we're dealing with the special cases of MSH.1/2, then just add the field contents
				if (fieldName in {'MSH.1':1,'MSH.2':1}) {
					output += field.toString().replaceAmp();
				} else { // Otherwise add the recursive serialization of the field
					// If we're on a field repetition, then prepend a repetition marker, otherwise prepend a field separator
					output += (prevName==fieldName?rm:fs) + xmlToHL7(field,fs,cs,rm,ss);
				}
				
				// Update the field name placeholder
				prevName = fieldName;
			}
			
			// Add a carriage return to the end of the segment
			output += cr;
		}
	} else if (level == 1) { // If we're at the field level
		// If the node is an XMLList of multiple fields
		if (node.length() > 1) {
			// Recursively append serialization for each field
			for each (field in node) {
				output += xmlToHL7(field,fs,cs,rm,ss) + rm;
			}
			
			// Remove the final repetition marker
			output = StringUtils.chomp(output,rm);
		}
		else {
			// Recursively append serialization for each component
			for each (component in node.children()) {
				// Append a component separator to the end
				output += xmlToHL7(component,fs,cs,rm,ss) + cs;
			}
			
			// Remove the last component separator
			output = StringUtils.chomp(output,cs);
		}
	} else if (level == 2) { // If we're at the component level
		// Recursively append serialization for each subcomponent
		for each (subcomponent in node.children()) {
			// Append a subcomponent separator to the end
			output += xmlToHL7(subcomponent,fs,cs,rm,ss) + ss;
		}
		
		// Remove the last subcomponent separator
		output = StringUtils.chomp(output,ss);
	} else { // If we're at the subcomponent level
		// Just add the contents of the node
		output = node.toString().replaceAmp();
	}

	// Return the final output
	return output;
}
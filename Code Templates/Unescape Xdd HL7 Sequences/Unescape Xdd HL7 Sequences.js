/**
	Replaces any \Xdd..\ HL7 escape sequences with the corresponding character(s).

	@param {XML} node - The node to recursively iterate through.
	@param {String} charset - The character encoding set to use when converting bytes to Unicode code
		points. If not specified, US-ASCII will be used.
	@param {String} encodingCharacters - The HL7 encoding characters to exclude from the replacement.
*/
function unescapeXSequences(node, charset, encodingCharacters) {
	if (!charset) {
		charset = 'US-ASCII';
	}

	if (!encodingCharacters) {
		encodingCharacters = node.MSH['MSH.1'].toString().split('').concat(node.MSH['MSH.2'].toString().split(''));
		if (encodingCharacters.length == 0) {
			encodingCharacters = ['|', '^', '~', '\\', '&'];
		}
	}

	for each (child in node.children()) {
		if (child.hasComplexContent()) {
			unescapeXSequences(child, charset, encodingCharacters);
		} else if (!/MSH\.[12]/.test(child.name())) {
			var childString = child.toString();
			var matched = false;

			for each (match in childString.match(/\\X([\dA-F]{2})+\\/ig)) {
				matched = true;
				var hexString = match.substr(2, match.length-3);
				var buffer = java.nio.ByteBuffer.allocate(hexString.length / 2);

				while (hexString.length > 0) {
					var intValue = new java.lang.Integer((java.lang.Character.digit(hexString.substr(0,1), 16) << 4) + java.lang.Character.digit(hexString.substr(1,1), 16));
					buffer.put(intValue.byteValue());
					hexString = hexString.substr(2);
				}

				childString = childString.replace(match, new java.lang.String(buffer.array(), charset));
			}

			if (matched) {
				if (encodingCharacters.length > 3) {
					childString = childString.replace(encodingCharacters[3], '\\E\\');
				}
				if (encodingCharacters.length > 0) {
					childString = childString.replace(encodingCharacters[0], '\\F\\');
				}
				if (encodingCharacters.length > 1) {
					childString = childString.replace(encodingCharacters[1], '\\S\\');
				}
				if (encodingCharacters.length > 2) {
					childString = childString.replace(encodingCharacters[2], '\\R\\');
				}
				if (encodingCharacters.length > 4) {
					childString = childString.replace(encodingCharacters[4], '\\T\\');
				}

				node.children()[child.childIndex()] = <{child.name()}>{childString}</{child.name()}>;
			}
		}
	}
}
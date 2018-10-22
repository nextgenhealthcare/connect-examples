/**
	Returns the string representation of each child element of <b>xml</b> joined by
	<b>separator</b>. If <b>xml</b> contains no child elements, the string
	representation of <b>xml</b> will be returned instead.

	@copyright 2018 Tony Germano
	@license MPL-2.0

	@param {XML} xml - The e4x xml node representing a field component.
	@param {String} separator - Optional character used to join sub-components. Default: '&'.
	@return {String} 
*/
function joinSubcomponents(xml, separator)  {
	if (typeof separator == 'undefined') separator = '&';
	if (xml.hasComplexContent()) {
		var content = [];
		for each (var child in xml.children()) {
			content.push(child.toString());
		}
		xml = content.join(separator);
	} 
	return xml.toString();
}
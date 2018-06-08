/**
	Recursively iterates through all descendant nodes of an E4X XML object and makes a string
	replacement.

	@param {XML} parent - The E4X XML node to replace within.
	@param {RegExp} regexp - The regular expression to test against at each leaf (text) node.
	@param {String} replacement - The string with which to replace.
*/
function replaceAllInXML(parent, regexp, replacement) {
	for each (child in parent.children()) {
		if (child.hasComplexContent()) {
			replaceAllInXML(child, regexp, replacement);
		} else {
			parent.children()[child.childIndex()] = child.toString().replace(regexp, replacement);
		}
	}
}
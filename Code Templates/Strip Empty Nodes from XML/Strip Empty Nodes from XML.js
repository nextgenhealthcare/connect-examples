/**
	Recursively iterates through all descendant nodes of an E4X XML object and removes those that are
	empty (or those whose children are all empty).

	@param {XML} node - The node to iterate through. If node itself is empty, it will not be removed from its parent.
	@param {Boolean} stripWhitespaceNodes - If true, nodes that are not empty but only contain whitespace will also be removed.
	@param {Boolean} onlyDeleteTrailing - If true, only trailing nodes will actually be deleted.
*/
function stripEmptyNodes(node, stripWhitespaceNodes, onlyDeleteTrailing) {
	var nonEmptyFound = false;
	
	for (var childIndex = node.children().length()-1; childIndex >= 0; childIndex--) {
		var child = node.children()[childIndex];
		stripEmptyNodes(child, stripWhitespaceNodes, onlyDeleteTrailing);
		
		if (stripWhitespaceNodes && !child.toString().trim() || !stripWhitespaceNodes && !child.toString()) {
			if (!nonEmptyFound || !onlyDeleteTrailing) {
				delete node.children()[childIndex];
			} else {
				node.children()[childIndex] = new XML('<'+child.name().toString()+'/>');
			}
		} else {
			nonEmptyFound = true;
		}
	}
}
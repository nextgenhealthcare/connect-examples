/**
	Because out-of-order HL7 nodes can cause unexpected errors, this function will automatically fix
	that node order, using the HL7 numeric dot notation.

	@param {XML} node - The E4X XML node to fix.
	@return {XML} The fixed E4X XML node.
*/
function fixHL7NodeOrder(node) {
	// Create output node
	var newNode = new XML();
	
	// In case the node is an XMLList of multiple siblings, loop through each sibling
	for each (sibling in node) {
		// Create new sibling node
		var newSibling = new XML('<'+sibling.name().toString()+'/>');
		
		// Iterate through each child node
		for each (child in sibling.children()) {
			if (child.hasComplexContent()) {
				// If the child has its own children, then recursively fix the node order of the child
				newSibling.appendChild(fixHL7NodeOrder(child));
			} else {
				// If the child doesn't have its own children, then just add the child to the new sibling node
				newSibling.appendChild(child);
			}
		}
		
		// After recursively fixing all of the child nodes, now we'll fix the current node
		newNode += sortHL7Node(newSibling);
	}
	
	// Return the fixed node
	return newNode;
}

// Helper function for fixHL7NodeOrder
function sortHL7Node(node) {
	// If the node has no children, then there's nothing to sort
	if (node.hasSimpleContent()) {
		return node;
	}
	
	// Create new output node
	var newNode = new XML('<'+node.name().toString()+'/>');
	
	// Iterate through each child in the node
	for each (child in node.children()) {
		// If the child has a QName, then we can sort on it
		if (child.name()) {
			// Get the current "index" of the child. Id est, if the QName is PID.3.1, then the index is 1
			curChildIndex = parseInt(child.name().toString().substring(child.name().toString().lastIndexOf('.')+1),10);
			// Boolean placeholder
			var inserted = false;
			
			// Iterate through each child currently in the NEW node
			for (var i = 0; i <= newNode.children().length()-1; i++) {
				// Get the index of the child of the new node
				loopChildIndex = parseInt(newNode.child(i).name().toString().substring(newNode.child(i).name().toString().lastIndexOf('.')+1),10);
				
				/* 
					If the child we want to insert has a lower index then the 
					current child of the new node, then we're going to insert 
					the child right before the current newNode child
				*/
				if (curChildIndex < loopChildIndex) {
					// Insert the child
					newNode.insertChildBefore(newNode.children()[i],child);
					// Set our flag, indicating that an insertion was made
					inserted = true;
					// No need to continue iteration
					break;
				}
			}
			
			/*
				If no insertion was made, then the index of the child we want to 
				insert is greater than or equal to all of the indices of the 
				children that have already been inserted in newNode. So, we'll 
				just append the child to the end.
			*/
			if (!inserted) {
				newNode.appendChild(child);
			}
		}
	}
	
	// Return the sorted HL7 node
	return newNode;
}
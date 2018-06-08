/**
	Returns an array of segments with the specified name that come after a given segment in the message.

	@param {XML} root - The root HL7Message node of the message, or the parent of the segment node.
	@param {XML} startSeg - The segment AFTER which to start collecting segments.
	@param {String/RegExp} segName - The name (String or RegExp) of the segments you want to collect.
	@param {Boolean} consecutiveInd - If true, indicates that the segments are expected to come
		directly after startSeg. If false, segments are collected until another segment with the same name
		as startSeg is encountered. Defaults to false.
	@param {String[]} stopSegNames - An array of segment names that, when encountered, stop the
		collection of segments.
	@return {XML[]} The array of matching segments.
*/
function getSegmentsAfter(root, startSeg, segName, consecutiveInd, stopSegNames) {
	function test(str) {
		return segName instanceof RegExp ? segName.test(str) : segName === str;
	}

	// The index to start collection is the next one up from the starting segment
	var index = startSeg.childIndex()+1;
	// The return array
	var out = [];
	// Boolean placeholder to stop iteration
	var done = false;
	// Object that will contain all of the stopSegNames strings, bound to a truthy value (1)
	var stopNames = {};
	// Indicates whether we have any stop segments
	var stopNamesInd = false;

	if (stopSegNames !== undefined && stopSegNames !== null) {
		// Set our indicator to true
		stopNamesInd = true;
		// Add each string in the array to our object
		for each (name in stopSegNames) {
			stopNames[name] = 1;
		}
	}

	// Iterate through each child in the root, starting at the segment after startSeg, and
	// ending at the final segment, or when the done flag is set to true.
	while (index < root.children().length() && !done) {
		if (stopNamesInd && root.children()[index].name().toString() in stopNames) {
			// If a stop segment is encountered, stop iteration
			done = true;
		} else if (root.children()[index].name().toString() == startSeg.name().toString() && !consecutiveInd) {
			// If a segment with the same name as startSeg is encountered, stop iteration
			done = true;
		} else if (!test(root.children()[index].name().toString()) && consecutiveInd) {
			// If we're only collecting consecutive segments and we encounter a segment with a name other than segName, stop iteration
			done = true;
		} else if (test(root.children()[index].name().toString())) {
			// If all previous tests passed, and the current segment has a name of segName, then add it to our array
			out.push(root.children()[index]);
		}
		
		// Increment our index counter
		index++;
	}

	// Return the output array
	return out;
}
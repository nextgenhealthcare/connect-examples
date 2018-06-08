/**
	Creates a new segment with the given name and inserts it before the given segment.

	@param {String} insertSegmentName - The name of the new segment to insert.
	@param {XML} beforeThisSegment - The segment to insert just before.
	@return {XML} The newly created segment.
*/
function createSegmentBefore(insertSegmentName, beforeThisSegment) {
	var msgObj = beforeThisSegment;
	while (msgObj.parent() != undefined) {
		msgObj = msgObj.parent();
	}
	msgObj.insertChildBefore(beforeThisSegment[0], new XML('<' + insertSegmentName + '></' + insertSegmentName + '>'));
	return msgObj.child(beforeThisSegment[0].childIndex() - 1);
}
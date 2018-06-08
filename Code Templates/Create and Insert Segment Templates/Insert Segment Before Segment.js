/**
	Inserts a given segment before a particular segment.

	@param {XML} insertSegment - The segment to insert.
	@param {XML} beforeThisSegment - The segment before which to insert the new segment.
	@return {XML} The newly inserted segment.
*/
function insertSegmentBefore(insertSegment, beforeThisSegment) {
	var msgObj = beforeThisSegment;
	while (msgObj.parent() != undefined) {
		msgObj = msgObj.parent();
	}
	msgObj.insertChildBefore(beforeThisSegment[0], insertSegment);
	return msgObj.child(beforeThisSegment[0].childIndex() - 1);
}
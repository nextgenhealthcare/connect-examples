/**
	Inserts a given segment after a particular segment.

	@param {XML} insertSegment - The segment to insert.
	@param {XML} afterThisSegment - The segment after which to insert the new segment.
	@return {XML} The newly inserted segment.
*/
function insertSegmentAfter(insertSegment, afterThisSegment) {
	var msgObj = afterThisSegment;
	while (msgObj.parent() != undefined) {
		msgObj = msgObj.parent();
	}
	msgObj.insertChildAfter(afterThisSegment[0], insertSegment);
	return msgObj.child(afterThisSegment[0].childIndex() + 1);
}
/**
	Improved XMLList filter over built-in e4x filters.

        @copyright 2020 Tony Germano
        @license MPL-2.0

	@param {XMLList} xmlList - The XMLList to be filtered
	@param {Function} callback - Function is a predicate, to test each node of the XMLList. Return
		true to keep the element, false otherwise. It accepts 3 arguments - the node, the index of the node,
		and xmlList as passed into xFilter
	@param {Number} minLimit - (Optional) throw RangeError if at least this many nodes do not pass the
		filter
	@param {Number} maxReturned - (Optional) only return up to this many results
	@param {Boolean} enforceMax - (Optional) throw RangeError if more than maxReturned results will
		be returned
	@return {XMLList} new XMLList containing filtered results
*/
function xFilter(xmlList, callback, minLimit, maxReturned, enforceMax) {
    var ret = new XMLList();
    for (var i = 0; i < xmlList.length(); i++) {
        var node = xmlList[i];
        if (callback(node, i, xmlList)) {
            ret += node;
            if (enforceMax) {
                if (ret.length() > maxReturned) {
                    throw new RangeError('The number of filtered results is more than ' + maxReturned);
                }
            }
            else if (ret.length() == maxReturned) {
                break;
            }
        }
    }
    if (ret.length() < minLimit) {
        throw new RangeError('The number of filtered results is less than ' + minLimit);
    }
    return ret;
}

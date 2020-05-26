# Filter XMLLists

The xFilter() method creates a new XMLList with all elements that pass the test implemented by the provided function. This function has some advantages over native e4x filtering.
- It passes the actual node to be filtered to the filter function rather than operating on it in a *with* context.
- This allows calling methods on the node as well as referencing child elements that contain javascript operators (most notibly the . character, which is heavily used in hl7.)
- Additional parameters let you limit the number of results returned or throw exceptions if there is an unexpected number of filtered results.

## Syntax

```javascript
var filteredList = xFilter(xmlList, callback(node[, index[, list]])[, minLimit[, maxReturned[, enforceMax]]])
```

### Parameters:

- **xmlList** The XMLList to be filtered
- **callback** Function is a predicate, to test each node of the XMLList. Return `true` to keep the element, `false` otherwise. It accepts 3 arguments
  - **node** The current node being processed in the XMLList
  - **index** The index of the current node being processed in the XMLList
  - **list** The XMLList passed as the first parameter of xFilter()
- **minLimit** Optional. Throw a RangeError if the length of the xmlList to be returned is fewer than this number. Defaults to no lower limit.
- **maxReturned** Optional. Only return up to this many results. This can be used to short circuit the function if you do not need all of the results. Defaults to no upper limit.
- **enforceMax** Optional. Throw a RangeError if more than maxReturned results will be returned. Defaults to false.

### Return Value

A new XMLList with the nodes that pass the test (up to maxReturned.) If no nodes pass the test and minLimit is not set, an empty XMLList will be returned.


### Examples
Get the id that represents the NPI number from the repetition of OBR-16 where OBR-16.9 equals `NPI` or empty string if it doesn't exist. Stop looking after the first match if more than one repetition qualifies.

```javascript
var npiOrdering = xFilter(msg.OBR['OBR.16'], function(obr16) {return obr16['OBR.16.9']=='NPI'}, 0, 1);
var npiNumber = npiOrdering['OBR.16.1'].toString();
```

Compile the OBX-5 text of all OBX segments ignoring the first 5 OBX segments and any OBX segment where OBX-3.2 is not `Report`. Ensure at least one line is printed. Arrow functions can be used when ES6 mode is enabled.

```javascript
var clippedReport = new java.lang.StringBuilder();
try {
    for each (var obx in xFilter(msg.OBX, (obx,i) => (i>4 && obx['OBX.3']['OBX.3.2']=='Report'), 1)) {
        clippedReport.append(obx['OBX.5']['OBX.5.1']).append('\n');
    }
}
// let other exceptions go unchecked
catch(e if e instanceof RangeError) {
    // handle report that does not meet requirements
}
```



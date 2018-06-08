# Create and Insert Segment Templates
**createSegmentBefore:** Works similarly to createSegmentAfter; just creates a new segment with the given name and inserts it before the given segment.

**insertSegmentBefore:** Works like createSegmentBefore, except that you pass it the segment to insert, rather than having the function create a new segment.

**insertSegmentAfter:** Works like createSegmentAfter, except that you pass it the segment to insert, rather than having the function create a new segment.

### Examples
Create a new ORC segment before each OBR in the message and then modify it:

```javascript
for each (obr in msg.OBR) {
	var orc = createSegmentBefore('ORC',obr);
	orc['ORC.1']['ORC.1.1'] = '1';
	// Etc.
}
```

Insert a pre-modified ORC segment before each OBR in the message:

```javascript
for each (obr in msg.OBR) {
	var orc = <ORC/>;
	orc['ORC.1']['ORC.1.1'] = '1';
	// Etc.
	insertSegmentBefore(orc,obr);
}
```

Insert a pre-modified PV1 segment after the PID segment:

```javascript
var pv1 = <PV1/>;
pv1['PV1.1']['PV1.1.1'] = '1';
// Etc.
insertSegmentAfter(pv1,msg.PID);
```

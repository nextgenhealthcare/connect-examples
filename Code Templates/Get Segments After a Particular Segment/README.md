# Get Segments After a Particular Segment
Returns an array of segments with the specified name that come after a given segment in the message.

Say you have multiple OBR groups in your message. Sometimes you want to do something with only the OBXs that come after that particular OBR, and not necessarily all of the OBXs in the entire message. The same goes for NTEs after an OBX, etc. Assuming that you're not using the strict HAPI parser (most of us don't), this might be fairly tricky to do.

The getSegmentsAfter function does it for you. Given the root node (root), the segment you want to start at (startSeg), and the name of the segments you want to get (segName), this function will return an array of those segments.

There are two other optional parameters:

- **consecutiveInd:** If this is true, then the segments to be collected are expected to come directly after the starting segment. If any segment is encountered that doesn't have a name of segName, collection is immediately stopped. If this is false, then collection is stopped when another segment of the same name as startSeg is encountered. For example, say you have the following message:

  ```
  MSH...
  PID...
  OBR...
  OBX...
  OBX...
  NTE...
  OBX...
  OBR...
  OBX...
  ```
  
  If *startSeg* is the first OBR, segName is "OBX", and consecutiveInd is true, then getSegmentsAfter will return the first two OBXs in the message, but not the third one. If consecutiveInd is false, then it will return the first three OBXs, but not the fourth one.
  
- **stopSegNames:** This is an array of segment names that you want to act as an "emergency brake" to stop collection. If one of these segments is encountered, then iteration is stopped. This is useful when, for example, you have a message like this:

  ```
  MSH...
  PID...
  OBR...
  OBX...
  NTE...
  OBX...
  SPM...
  OBX...
  ```
  
  In HL7Land, the OBR segment contains two groups, the observation group (consisting of the first two OBXs) and the specimen group (consisting of the SPM and the third OBX). In this case you don't want to get consecutive OBXs because there may be NTEs/ZDSs in between, but on the other hand you don't want to include the OBX that is part of the specimen group. So if "SPM" is included in stopSegNames, then all will be good.

### Examples
Get all OBXs after the first OBR segment:

```javascript
getSegmentsAfter(msg,msg.OBR[0],'OBX')
```

Get all *consecutive* NTEs after the first OBX segment:

```javascript
getSegmentsAfter(msg,msg.OBX[0],'NTE',true)
```

Get all OBXs after the first OBR segment, but don't include any OBXs in the SPM or ZBP groups:

```javascript
getSegmentsAfter(msg,msg.OBR[0],'OBX',false,['SPM','ZBP'])
```

Add a new NTE segment to the first OBR group (at the order level rather than the observation level):

```javascript
var newNTE = <NTE/>;
newNTE['NTE.3']['NTE.3.1'] = 'whatever';
var nteGroup = getSegmentsAfter(msg,msg.OBR[0],'NTE',true);
if (nteGroup.length > 0)
     msg.children()[nteGroup[nteGroup.length-1].childIndex()] += newNTE;
else
     msg.OBR[0] += newNTE;
```

Reset all of the set IDs of the OBXs after every OBR in the message:

```javascript
for each (obr in msg.OBR) {
     var obxGroup = getSegmentsAfter(msg,obr,'OBX',false,['SPM','ZBP']);
     for (var i = 0; i <= obxGroup.length-1; i++)
          msg.children()[obxGroup[i].childIndex()]['OBX.1']['OBX.1.1'] = (i+1);
}
```

Get all Z-segments after each OBR segment:

```javascript
for each (obr in msg.OBR) {
	for each (zseg in getSegmentsAfter(msg,obr,/Z[A-Z\d]{2}/)) {
		// Do something
	}
}
```

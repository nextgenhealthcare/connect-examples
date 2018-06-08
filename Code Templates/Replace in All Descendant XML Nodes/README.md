# Replace in All Descendant XML Nodes
Recursively iterates through all descendant nodes of an E4X XML object and makes a string replacement.

This is useful if you want to make a global replacement in your message but only want to do it for a specific connector. Obviously you can do this in a preprocessor, but if you only want it to happen for a single destination, this function will allow you do to that easily.

### Parameters:

- **parent:** The node to recursively iterate through.
- **regexp:** The regular expression to test against at each leaf (text) node. This should be a RegExp object, like `new RegExp('foo','g')` or `/foo/g`.
- **replacement:** The string with which to replace.


### Examples
Replace all single quotes (') with two single quotes (''), e.g. to prepare for inserting into a database: 

```javascript
replaceAllInXML(msg, /'/g, "''");
```

If any dates occur in a PID or OBR segment that do not have the hour/minute/second defined (i.e. it's only yyyyMMdd, like "20130206"), then add on the HHmmss ("000000"). This might be used to send to a system that requires those date fields to be in the full yyyyMMddHHmmss format. Replace all single quotes (') with two single quotes (''), e.g. to prepare for inserting into a database: 

```javascript
for each (seg in msg.*.(function(){return/PID|OBR/.test((new XML(this)).name())}())) {
	replaceAllInXML(seg,/(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])(?!\d)/g,'$&000000');
}
```

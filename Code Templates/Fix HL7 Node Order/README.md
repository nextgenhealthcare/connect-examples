# Fix Node Order in HL7 v2.x Message
This takes in a single HL7 v2.x node (it can be the root HL7Message, or a single segment/field/component/etc.), and returns the same node, with all children sorted in ascending order as per the HL7 dot notation. So the following node:

```xml
<NTE>
	<NTE.1>
		<NTE.1.1>1</NTE.1.1>
	</NTE.1>
	<NTE.3>
		<NTE.3.1>comment</NTE.3.1>
	</NTE.3>
	<NTE.2>
		<NTE.2.1>TX</NTE.2.1>
	</NTE.2>
</NTE>
```

would be changed to:

```xml
<NTE>
	<NTE.1>
		<NTE.1.1>1</NTE.1.1>
	</NTE.1>
	<NTE.2>
		<NTE.2.1>TX</NTE.2.1>
	</NTE.2>
	<NTE.3>
		<NTE.3.1>comment</NTE.3.1>
	</NTE.3>
</NTE>
```

### Examples

```javascript
msg = fixHL7NodeOrder(msg);
```
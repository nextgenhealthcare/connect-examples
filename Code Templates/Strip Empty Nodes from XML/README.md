# Strip Empty Nodes from XML
Recursively iterates through all descendant nodes of an E4X XML object and removes those that are empty (or those whose children are all empty).

### Parameters:

- **node:** The node to iterate through. If node itself is empty, it will not be removed from its parent.
- **stripWhitespaceNodes:** If true, nodes that are not empty but only contain whitespace will also be removed.
- **onlyDeleteTrailing:** If true, only trailing nodes will actually be deleted. For example if a child set has five nodes at the end which are all empty, all five will be removed. However if the same five nodes are followed by a node which isn't empty, then those five nodes will not be removed. Instead, the nodes will simply have their inner text elements removed (if necessary).

### Examples
Get rid of all empty nodes in the inbound XML structure (msg): 

```javascript
stripEmptyNodes(msg);
```

Get rid of all blank (empty and whitespace-only) nodes in the inbound XML structure:

```javascript
stripEmptyNodes(msg, true);
```

Delete any trailing blank nodes, and replace any non-trailing whitespace-only nodes with empty nodes:

```javascript
stripEmptyNodes(msg, true, true);
```

# Thread-safe get or create from globalMap
For a given key, retrieve the value from the globalMap. If the globalMap does not contain the key or the object returned is null produce and store a new object in a thread-safe manner.

### Parameters:

- **globalMapkey:** Key under which this object is stored in the globalMap. Also used as the key for the synchronization object in the globalMap.
- **initializer:** Function which will be called when the value for globalMapKey is null. Returns the object to be stored as the value for globalMapKey.

### Examples
Get synchronized SortedSet stored in the globalMap with key `mySet` or create it if it doesn't exist.

```javascript
with (JavaImporter(java.util)) {
    var mySet = getInstance('mySet', function() {
        return Collections.synchronizedSortedSet(new TreeSet());
    });
}
```
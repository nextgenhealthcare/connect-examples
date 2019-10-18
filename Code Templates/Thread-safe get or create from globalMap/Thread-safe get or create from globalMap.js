/**
    For a given key, retrieve the value from the globalMap. If the globalMap does not contain the key or
    the object returned is null produce and store a new object in a thread-safe manner.

    @param {string} globalMapKey - Key under which this object is stored in the globalMap. Also used
        as the key for the synchronization object in the globalMap.
    @param {function():any} initializer - Function which will be called when the value for
        globalMapKey is null. Returns the object to be stored as the value for globalMapKey.
    @return {any} Object previously stored by globalMapKey or object created by initializer.

    @author Tony Germano
*/
function getInstance(globalMapKey, initializer) {
    var val = globalMap.get(globalMapKey);
    if (val == null)  {
        if (!globalMap.containsKeySync(globalMapKey)) {
            globalMap.putSync(globalMapKey,null);
        }
        try {
            globalMap.lock(globalMapKey);
            if ((val = globalMap.get(globalMapKey)) == null) {
                val = initializer();
                globalMap.put(globalMapKey, val);
            }
        }
        finally {
            globalMap.unlock(globalMapKey);
        }
    }
    return val;
};

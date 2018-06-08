# Execute Runtime Command
Executes a command or an array of the command and arguments using a local OS shell. Returns an object containing the exit value, output, and errors.

### Parameters:

- **args:** This can be either a string, or an array of strings. If you pass in a single string, it treats it as the entire command string, like `ls -l`. If you pass in an array, it treats the first element as the command, and each subsequent element as parameters for the command. The array method is preferred, because you don't have to worry about quoting parameters that have spaces in them.
- **charset:** (Optional) The charset encoding to use when reading the output from the command. If omitted, the JVM default charset will be used.


### Examples
Execute a single command string (in this case, tailing system messages on Linux), and outputs results:

```javascript
var result = executeRuntimeCommand('tail /var/log/messages');

logger.info('Exit value: ' + result.exitValue);
logger.info('Output: ' + result.stdout);
if (result.stderr != '') {
	logger.error('Errors: ' + result.stderr);
}
```

Same thing, but this time using an array:

```javascript
var result = executeRuntimeCommand(['tail', '/var/log/messages']);

logger.info('Exit value: ' + result.exitValue);
logger.info('Output: ' + result.stdout);
if (result.stderr != '') {
	logger.error('Errors: ' + result.stderr);
}
```

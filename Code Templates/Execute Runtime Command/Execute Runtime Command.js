/**
	Executes a command or array of command and arguments using a local OS shell. Returns an object
	containing the exit value, output, and errors.

	@param {String/Array} args - The command arguments, as either a string or an array.
	@param {String} charset - (Optional) The charset encoding to use when reading the output from the
		command. If omitted, the JVM default charset will be used.
	@return {Object} An Object with the properties exitValue, stdout, and stderr.
*/
function executeRuntimeCommand(args, charset) {
	var process = java.lang.Runtime.getRuntime().exec(args);
	var stdoutConsumer = new StreamConsumer(process.getInputStream(), charset);
	var stderrConsumer = new StreamConsumer(process.getErrorStream(), charset);
	return {
		exitValue : process.waitFor(),
		stdout : stdoutConsumer.getOutput(),
		stderr : stderrConsumer.getOutput()
	};
}

function StreamConsumer(is, charset) {
	var output = '';
	
	var thread = new java.lang.Thread({
		run: function() {
			if (typeof charset !== 'undefined') {
				output = org.apache.commons.io.IOUtils.toString(is, charset);
			} else {
				output = org.apache.commons.io.IOUtils.toString(is);
			}
		}
	});

	this.interrupt = function() {
		thread.interrupt();
	}

	this.getOutput = function() {
		thread.join();
		return output;
	};

	thread.start();
}
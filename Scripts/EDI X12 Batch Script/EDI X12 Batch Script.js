var segDelim = '~';
var elementDelim = '*';
var subelementDelim = ':';
var infer = true;
​
var message = new java.lang.StringBuilder();
var ch;
while ((ch = consume(1)) != null) {
	if (infer) {
		elementDelim = consume(3);
		subelementDelim = consume(101);
		segDelim = consume(1);
		consumeNewline();
		infer = false;
		continue;
	} else if (ch == segDelim) {
		consumeNewline();
		reader.mark(3);
		if (readChar() == 'I' && readChar() == 'N' && readChar() == 'S') {
			reader.reset();
			break;
		}
		reader.reset();
	}
}
​
return message.toString();
​
function readChar() {
	var c = reader.read();
	return c == -1 ? null : java.lang.Character.valueOf(c);
}
​
function consume(num) {
	var ch;
	for (var i = 1; i <= num; i++) {
		ch = readChar();
		if (ch != null) {
			message.append(ch);
		}
	}
	return ch;
}
​
function consumeNewline() {
	reader.mark(1);
	var ch = readChar();
	if (ch == '\r') {
		message.append(ch);
		reader.mark(1);
		if ((ch = readChar()) == '\n') {
			message.append(ch);
		} else {
			reader.reset();
		}
	} else if (ch == '\n') {
		message.append(ch);
	} else {
		reader.reset();
	}
}
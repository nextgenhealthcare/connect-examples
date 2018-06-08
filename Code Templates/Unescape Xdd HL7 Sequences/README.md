# Unescape \Xdd..\ HL7 Sequences
Recursively iterates through all descendant nodes of an E4X XML object and replaces any `\Xdd..\` escape sequences with the corresponding character(s). The given charset will be used for string conversion (US-ASCII if not specified). Any encoding characters (e.g. `|^~\&`) detected in the replacement will instead be replaced with the appropriate escape sequence (e.g. `\F\`).

### Parameters:

- **node:** The node to recursively iterate through.
- **charset:** The character encoding set to use when converting bytes to Unicode code points. If not specified, US-ASCII will be used.
- **encodingCharacters:** The HL7 encoding characters to exclude from the replacement. For example if the sequence `\X7C\` is encountered, then it will be replaced with `\F\` instead of a literal `|` character. If not specified, the function will attempt to infer the characters from the MSH.1 and MSH.2 fields, or default to `|^~\&`.


### Examples
Replace all X escape sequences, using the default charset and inferring encoding characters:

```javascript
unescapeXSequences(msg);
```

Replace all X escape sequences using a specific charset:

```javascript
unescapeXSequences(msg, 'UTF-8');
```

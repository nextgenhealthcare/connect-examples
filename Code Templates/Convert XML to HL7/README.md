# Convert XML to HL7
Deserializes an E4X XML node into HL7 v2.x. This allows you to pass **any** E4X node of a message and convert it into HL7 v2.x correctly.

The last four parameters are optional and default to the standard encoding characters.

### Examples
Deserialize the entire message:

```javascript
logger.info(xmlToHL7(msg));
```

Deserialize just the PID segment:

```javascript
logger.info(xmlToHL7(msg.PID));
```

Deserialize just the PID.3 segment (even if there are repetitions):

```javascript
logger.info(xmlToHL7(msg.PID['PID.3']));
```
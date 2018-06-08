# Rename HL7 Field
Returns a copy of the given HL7 field, changing all segment names to the given name.

It has two parameters, the field node you want to change, and the new segment name to give the node (and all of it's descendants).

### Examples
Copy PID.2 over to PID.3 without having to map over each individual component/subcomponent:

```javascript
msg.PID['PID.3'] = renameField(msg.PID['PID.2'],'PID.3');
```

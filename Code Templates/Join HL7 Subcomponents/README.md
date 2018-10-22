# Join HL7 Subcomponents
Takes one or two parameters. Returns the text of all subcomponents of the given HL7 component joined by the given separator or `&` if none is provided. Returns the text of the component if it contains no sub-components. Useful for fields where the subcomponent separator has not been escaped.

### Parameters:

- **xml:** The e4x xml node representing an HL7 field component.
- **separator:** Optional character used to join subcomponents. Default: `&`.

### Examples
The patient street address sometimes contains an ampersand and gets broken into subcomponents.

```javascript
msg['PID']['PID.11']['PID.11.1'] = joinSubcomponents(msg['PID']['PID.11']['PID.11.1']);
```
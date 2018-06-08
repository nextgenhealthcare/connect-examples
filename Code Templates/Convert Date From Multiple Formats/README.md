# Convert Date From Multiple Formats
Parses a date (String, Date, DateTime, or Number) into a string using an array of possible input patterns and the specified output pattern.

This is useful if you want to convert/standardize an incoming date, but you don't know how it will be formatted. The code comes with an array of possible patterns, and if there is a pattern you encounter that isn't handled, you can simply add it to the list.

### Parameters:

- **date:** The object to convert. The object may be a String, Date, DateTime, or Number (or really any object, as long as its string representation is some formatted date).
- **outpattern:** The pattern to use when converting the date to the output string.

### Examples
Standardize the message date/time to a specific pattern, no matter what pattern it comes in as:

```javascript
msg['MSH']['MSH.7']['MSH.7.1'] = convertDate(msg['MSH']['MSH.7']['MSH.7.1'].toString(), 'yyyyMMddHHmmss');
```

/**
	Parses a date (String, Date, DateTime, or Number) into a string using an array of possible input
	patterns and the specified output pattern.

	@param {Object} date - The String, Date, DateTime, or Number to convert.
	@param {String} outpattern - The pattern to use when converting the date to the output string.
	@return {String} The converted output date string.
*/
var patterns = [
	'yyyy-MM-dd HH:mm:ss:SSS',
	'yyyy-MM-dd HH:mm:ss.SSS',
	'yyyy-MM-dd HH:mm:ss',
	'yyyy-MM-dd HH:mm',
	'EEE MMM dd HH:mm:ss:SSS zzz yyyy',
	'EEE MMM dd HH:mm:ss.SSS zzz yyyy',
	'EEE MMM dd HH:mm:ss zzz yyyy',
	'EEE MMM dd zzz yyyy',
	'dd-MMM-yyyy HH:mm:ss:SSS',
	'dd-MMM-yyyy HH:mm:ss.SSS',
	'dd-MMM-yyyy HH:mm:ss',
	'yyyy-MM-dd',
	'yyyy MM dd',
	'yyyy.MM.dd',
	'MM-dd-yyyy',
	'MM dd yyyy',
	'MM.dd.yyyy',
	'HH:mm:ss:SSS',
	'HH:mm:ss.SSS',
	'HH:mm:ss',
	'yyyyMMddHHmmssSSS',
	'yyyyMMddHHmmss',
	'yyyyMMddHHmm',
	'hh:mm aa'];

var formatters = [];
for each (pattern in patterns) {
	formatters.push(org.joda.time.format.DateTimeFormat.forPattern(pattern));
}

function convertDate(date, outpattern) {
	var instant = 0;
	if (typeof date == 'number' || date instanceof java.lang.Number) {
		instant = new Number(date);
	} else if (date instanceof Date || date instanceof java.util.Date) {
		instant = date.getTime();
	} else if (date instanceof org.joda.time.ReadableInstant) {
		instant = date.getMillis();
	} else {
		for each (formatter in formatters) {
			try {
				instant = formatter.parseMillis(new String(date));
				break;
			} catch(e) {}
		}
	}

	return org.joda.time.format.DateTimeFormat.forPattern(outpattern).print(instant);
}
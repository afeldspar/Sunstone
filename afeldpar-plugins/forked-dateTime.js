/*\
title: $:/macros/skeeve/dateTime.js
type: application/javascript
module-type: macro

----
NOTE: This is not Skeeve's original macro!  It has been modified to make cases work that didn't originally!

The following changes were made:
getSecond => getSeconds
setSecond => setSeconds
getHour => getHours
setHour => setHours
getMinute => getMinutes
setMinute => setMinutes

afeldspar - 2015/10/18
----

<<dateTime format date add>>

Examples:
<<dateTime>>
<<dateTime "YYYY-0MM-0DD 0hh:0mm:0ss">>
<$macrocall $name="dateTime" ts={{!!created}} format="MMM DD. YY"/>

Format Strings:
Please find all format strings listed in the JavaScript code of function
formatDateString in $:/core/modules/utils/utils.js

Add String
The add string may contain a sequence of integer numbers followed by a time unit. These numbers are added to the given timestamp. Time units are:
"Y", "M", "D", "h", "m", "s" for year, month, day, hour, minute, second.
"+" and "-" before a number can be used to define whether to add (default) or subtract the number.
It's also possible to put a "=" between the number and its unit to set a certain value as a date component.

Examples
Tomorrow in one year = <<dateTime "" "" "1D 1Y">>
One month ago = <<dateTime "" "" "-1M">>
Christmas last year = <<dateTime "" "" "-1Y 12=M 24=D">>
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
This is a macro to get formatted date and time
*/

exports.name = "dateTime";

exports.params = [
	{ name: "format" },
	{ name: "ts" },
	{ name: "add" }
];

/*
Run the macro
*/
exports.run = function(format, ts, add) {
	if(!ts) {
		ts = new Date;
	}
	else {
		ts = $tw.utils.parseDate(ts);
	}
	while (add !== "") {
		var val= parseInt(add);
		if(isNaN(val)) break;
		add=add.replace(/^\s*([+\-]\s*)?\d+\s*/, "");
		var unit= add.charAt(0);
		var set= unit === "=";
		if( set) unit= add.charAt(1);
		add=add.replace(/^[^\d+\-]+/, "");
		switch(unit) {
			case 'Y': ts.setFullYear(val + (set ? 0 : ts.getFullYear())); break;
			case 'M': ts.setMonth(val + (set ? -1 : ts.getMonth())); break;
			case 'D': ts.setDate(val + (set ? 0 : ts.getDate())); break;
			case 'h': ts.setHours(val + (set ? 0 : ts.getHours())); break;
			case 'm': ts.setMinutes(val + (set ? 0 : ts.getMinutes())); break;
			case 's': ts.setSeconds(val + (set ? 0 : ts.getSeconds())); break;
			default: break;
		}
	}
	if(!format)
		format = "YYYY-0MM-0DD 0hh:0mm:0ss";
	return $tw.utils.formatDateString(ts, format); 
};

})();

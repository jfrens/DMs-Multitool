var rollCount = {
	"c": 0,
	"d2": 0,
	"d3": 0,
	"d4": 0,
	"d6": 0,
	"d8": 0,
	"d10": 0,
	"d12": 0,
	"d20": 0,
	"d100": 0	
}

function stringFromrollCount()
{
	var ret = "";
	for (var die in rollCount)
	{
		if (die != "c" && rollCount[die] != 0) {
			ret += "(" + rollCount[die] + die + ")";
			ret += "+";
		}
	}
	ret += rollCount["c"];
	return ret;
}

function clearrollCount()
{
	for (var die in rollCount)
	{
		rollCount[die] = 0;
	}
}

function countRoll(diceString) {
	if (diceString == undefined)
		return;
	var splitlist = diceString.split("+", 2);
	if (splitlist[1] != undefined) {
		countRoll(splitlist[1]);
	}
	console.log(splitlist);
	var diceSplit = splitlist[0].replace("(", "").replace(")", "").split("d", 2);
	if (diceSplit[1] == undefined) {
		console.log("constant");
		rollCount["c"] += parseInt(diceSplit[0]);
	} else {
		console.log(diceSplit[0] + "d" + diceSplit[1]);
		var a = parseInt(diceSplit[0]);
		console.log(a);
		if (isNaN(a)) a = 1;
		console.log(a);
		console.log(diceSplit[1]);
		rollCount["d"+parseInt(diceSplit[1])] += a;
	}

	return;
}

function computeRoll(diceString) {
	if (diceString == undefined)
		return;
	var splitlist = diceString.split("+", 2);
	var c = 0;
	if (splitlist[1] != undefined) {
		c += computeRoll(splitlist[1]);
	}
	var a = 0;
	var r = 0;
	var diceSplit = splitlist[0].replace("(", "").replace(")", "").split("d", 2);
	if (diceSplit[1] == undefined) {
		c += parseInt(diceSplit[0]);
	} else {
		var a = parseInt(diceSplit[0]);
		if (isNaN(a)) a = 1;
		var r = parseInt(diceSplit[1]);
		if (isNaN(r)) r = 0;

	}
	
	var rand = 0;
	for (i = 0; i < a; i++) {
		rand += Math.floor((Math.random() * r) + 1);
	}
	return (rand) + c;
}

$("button").click( function() {
	var roll = 0;
	if ($(this).attr('id') == "minus") {
		roll = -1;
		countRoll("-1");
	} else if ($(this).attr('id') == "plus") {
		roll = 1;
		countRoll("1");
	} else if ($(this).attr('id') == "clear") {
		$("#sum").text(0);
		clearrollCount();
	} else if ($(this).text() == "save") {
		$(this).text(stringFromrollCount());
		$("#sum").text(0);
		clearrollCount();
	} else {
		roll = computeRoll($(this).text());
		countRoll($(this).text());
	}
	var nextsum = parseInt($("#sum").text()) + roll;
	$("#sum").text(nextsum);
	$("#roll").text(stringFromrollCount());
});
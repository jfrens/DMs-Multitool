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

function stringFromRollCount()
{
	var ret = "";
	for (var die in rollCount)
	{
		if (die != "c" && rollCount[die] != 0) {
			ret += rollCount[die] + "(" + die + ")";
			ret += "+";
		}
	}
	ret += rollCount["c"];
	return ret;
}

function clearRollCount()
{
	for (var die in rollCount)
	{
		rollCount[die] = 0;
	}
	rollCount[$("#duser1").text()] = 0;
	rollCount[$("#duser2").text()] = 0;
}

function computeRoll(diceString) {
	var splitlist = diceString.split("d", 2);
	var a = "";
	if (splitlist[0] == "") {
		a = 1
	} else {
		a = parseInt(splitlist[0]);
	}
	var splitlist2 = splitlist[1].split(/\+/, 2);
	var r = parseInt(parseInt(splitlist2[0]));
	var c = "";
	if (splitlist2[1] == undefined) {
		c = 0
	} else {
		c = parseInt(splitlist2[1]);
	}
	var rand = 0;
	for (i = 0; i < a; i++) {
		rand += Math.floor((Math.random() * r) + 1);
	}
	return (rand) + c
}

$("button").click( function() {
	var roll = 0;
	if ($(this).attr('id') == "minus") {
		roll = -1;
		rollCount["c"] -= 1;
	} else if ($(this).attr('id') == "plus") {
		roll = 1;
		rollCount["c"] += 1;
	} else if ($(this).attr('id') == "clear") {
		$("#sum").text(0);
		clearRollCount();
	} else if ($(this).text() == "save") {
		$(this).text(stringFromRollCount());
		$("#sum").text(0);
		clearRollCount();
	} else {
		roll = computeRoll($(this).text());
		rollCount[$(this).text()] += 1;
	}
	var nextsum = parseInt($("#sum").text()) + roll;
	$("#sum").text(nextsum);
	$("#roll").text(stringFromRollCount());
});
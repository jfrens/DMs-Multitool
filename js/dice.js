console.log("hellojs");

function computeRoll(diceString) {
	var splitlist = diceString.split("d", 2);
	var a = splitlist[0];
	var splitlist2 = splitlist[1].split("+", 2);
	var r = splitlist2[0];
	var c = splitlist2[1];
	
	if (a == "") {a = 1};
	if (c == undefined) {c = 0};
	
	rand = Math.floor((Math.random() * r) + 1);
	return (a * rand) + c
}

$("button").click( function() {
	console.log($(this).text());
	var roll = computeRoll($(this).text());
	$("#sum").text(roll);
});
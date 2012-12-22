window.onload = function (evt) {
  start();
}

var testIndex = -1;
var currentRepeat = -1;
var repeatCount = 10;

var currentSquare = 1;

var outputdata = [];
outputdata.length = repeatCount;
for (var i = 0; i < outputdata.length; i++) {
    outputdata[i] = {};
}

function initSquares() {
    var squaresDiv = document.getElementById("squares");
    var id = 0;
    for (var i = 0; i < repeatCount; i++) {
        for (var j = 0; j <= tests.length; j++) {
            id++;
            squaresDiv.innerHTML += "<span class='incomplete-square' id='square-" + id + "'>\u25A0</span>";
        }
        squaresDiv.innerHTML += "<br>";
    }
}

function completeSquare() {
    var square = document.getElementById("square-" + currentSquare);
    if (square) {
        square.className = "complete-square";
        currentSquare++;
    }
}

function start() 
{
    initSquares();
    window.setTimeout(reallyNext, 500);
}

function next() 
{
    window.setTimeout(reallyNext, 10);
}

function reallyNext() 
{
    completeSquare();
    testIndex++;
    if (testIndex < tests.length) {
        testContents[testIndex]();
    } else if (++currentRepeat < repeatCount) { 
        testIndex = 0;
        testContents[testIndex]();
    } else {
        finish();
    }
}

function recordResult(time)
{
    if (currentRepeat >= 0) {// negative repeats are warmups
        outputdata[currentRepeat][tests[testIndex]] = time;
    }
    next();
}

function finish()
{
    var outputString = "{";
    outputString += '"v": "kraken-1.1", ';
    for (var test in outputdata[0]) {
        outputString += '"' + test + '":[';
        for (var i = 0; i < outputdata.length; i++) {
             outputString += outputdata[i][test] + ",";
        }
        outputString = outputString.substring(0, outputString.length - 1);
        outputString += '],';
    }

    outputString = outputString.substring(0, outputString.length - 1);
    outputString += "}";
    
    result(encodeURI(outputString));
}


var output;

function result(input) {
var outputJSON = JSON.parse(decodeURI(input));
var version = outputJSON["v"];
delete outputJSON["v"];
output = pivot(outputJSON);

sunspider_analyze();
sunspider_compare();

var output2 = output;
var version2 = version;

}

function pivot(input) {
    var output = [];
    for (var test in input) {
        for (var i = 0; i < input[test].length; i++) {
             if (!output[i])
                 output[i] = {};
             output[i][test] =  input[test][i];
        }
    }
    return output;
}

function print(str) {
    var console = document.getElementById("console");
    console.appendChild(document.createTextNode(str));
    console.appendChild(document.createElement("br"));
}

function compare(other)
{
    document.getElementById("console").innerHTML = "";

    var output1JSON = JSON.parse(decodeURI(other.split("?")[1]));
    var version1 = output1JSON["v"];
    delete output1JSON["v"];
    if (version1 != version2) {
        print("ERROR: cannot compare version " + version1 + ' with version ' + version2);
    } else {
        var output1 = pivot(output1JSON);
        sunspiderCompareResults(output1, output2);
    }
}

// Assigning candidate names and party color
var getCandidate = function(name, partyColor) 
{
    var politician = {};
    politician.name = name;
    politician.partyColor = partyColor; 
    politician.electionResults = null;
    politician.totalVotes = 0;

    return politician;
};

var candidate1 = getCandidate("John Deer", [153,50,204]);
var candidate2 = getCandidate("Jane Doe", [255,126,13]);

// Election results by state
candidate1.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2]
candidate2.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1]

// Changing some state results that were initially misreported
candidate1.electionResults[9] = 1;
candidate1.electionResults[4] = 17;
candidate1.electionResults[43] = 11;

candidate2.electionResults[9] = 28;
candidate2.electionResults[4] = 38;
candidate2.electionResults[43] = 27;

// State results
var setStateResults = function(state)
{
    theStates[state].winner = null;

    if ( candidate1.electionResults[state] > candidate2.electionResults[state] )
    {
        theStates[state].winner = candidate1.name;
        theStates[state].winnerColor = candidate1.partyColor;
    }
    else if ( candidate1.electionResults[state] < candidate2.electionResults[state] )
    {
        theStates[state].winner = candidate2.name;
        theStates[state].winnerColor = candidate2.partyColor;
    }
	
	// Puts state results in the table
	var stateInfoTable = document.getElementById('stateResults');

	var header = stateInfoTable.children[0];
	var body = stateInfoTable.children[1];

	var stateName = header.children[0].children[0];
	var abbrev = header.children[0].children[1];

	var candidate1Name = body.children[0].children[0];
	var candidate2Name = body.children[1].children[0];

	var candidate1Results = body.children[0].children[1];
	var candidate2Results = body.children[1].children[1];

	var winnersName = body.children[2].children[1]; 

	stateName.innerText = theStates[state].nameFull;
	abbrev.innerText = "(" +theStates[state].nameAbbrev + ")";

	candidate1Name.innerText = candidate1.name;
	candidate2Name.innerText = candidate2.name;

	candidate1Results.innerText = candidate1.electionResults[state];
	candidate2Results.innerText = candidate2.electionResults[state];

	if (theStates[state].winner === null)
	{
	  winnersName.innerText = "DRAW";
	}
	else
	{
	  winnersName.innerText = theStates[state].winner;
	}
  
  // Set state with winner's color
	var stateColor = theStates[state].winnerColor;
  
    if (theStates[state].winner !== null)
    {
      theStates[state].rgbColor = stateColor;
    }
    else
    {
      theStates[state].rgbColor = [11,32,57];
    }
};

// Tallying the votes
candidate1.tallyVotes = function()
{
    this.totalVotes = 0;

    for (var i = 0; i < this.electionResults.length; i++)
    {
         this.totalVotes = this.totalVotes + this.electionResults[i];
         //console.log(this.totalVotes);
    }
};
candidate1.tallyVotes();

candidate2.tallyVotes = function()
{
    this.totalVotes = 0;

    for (var i = 0; i < this.electionResults.length; i++)
    {
         this.totalVotes = this.totalVotes + this.electionResults[i];
         //console.log(this.totalVotes);
    }
};
candidate2.tallyVotes();

// Declare a winner
var winner = function()
{
  if ( candidate1.totalVotes > candidate2.totalVotes )
  {
    winner = candidate1.name;
  }
  else if ( candidate2.totalVotes > candidate1.totalVotes )
  {
    winner = candidate2.name;
  }
  else
    winner = "We have an unprecedented tie!"
};
winner();

//console.log ("Ladies and Gentlemen, the next president of the United States is " + winner + "!");

// Populate table announcing the overall winner
var countryInfoTable = document.getElementById('countryResults');

var row = countryInfoTable.children[0].children[0];
row.children[0].innerText = candidate1.name;
row.children[1].innerText = candidate1.totalVotes;
row.children[2].innerText = candidate2.name;
row.children[3].innerText = candidate2.totalVotes;

row.children[5].innerText = winner; 
//user shoot
let userSelection = '';
userSelection = prompt('Enter Rock(R), Paper(P), SCISSORS(S)');
userSelection = userSelection.toUpperCase();
console.log('User Selection: ' + printSelection(userSelection));

//computer shoot
let computerSelection = toStringSelection(Math.random());
console.log('Computer Selection: ' + printSelection(computerSelection));

//judged winner
judge(userSelection, computerSelection);



// change decimal selection to string selection
function toStringSelection(decimalSelection) {
  if (decimalSelection >= 0 && decimalSelection <= 0.34){
    return 'P';
  } else if (decimalSelection >= 0.35 && decimalSelection <= 0.67) {
    return 'S';
  } else {
    return 'R';
  }
}

// get full string by string selection
function printSelection(selection) {
  let symbol = '';
  switch (true) {
    case selection == 'P':
      symbol = 'Paper';
      break;
    case selection == 'S':
      symbol = 'Scissors';
      break;
    case selection == 'R':
      symbol = 'Rock';
      break;
  }
  return symbol;
}

// to judge who wins this game
function judge(userSelection, computerSelection) {
  if (userSelection == computerSelection) {
    console.log("It's a tie");
  } else if ((userSelection == 'P' && computerSelection == 'R') ||
             (userSelection == 'S' && computerSelection == 'P') ||
             (userSelection == 'R') && computerSelection == 'S') {
    console.log("User Wins");
  } else {
    console.log("Computer Wins");
  }
}
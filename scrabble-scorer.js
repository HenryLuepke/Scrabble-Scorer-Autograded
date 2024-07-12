// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   while (!/^[a-zA-Z\s]*$/.test(word)) {
      word = input.question("Only letters are accepatable in Scrabble! Please try again: ")
   }

   return word
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word) {
   return word.length;
};

function vowelBonusScorer(word) {
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3
      } else {
         score++
      }
   }

   return score;
};

function scrabbleScorer(word) {
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      let char = word[i].toLowerCase();
      score += newPointStructure[char]; //ask about why dot notation didn't work here
   }

   return score;
};

const scoringAlgorithms = [
   simpleScorer = {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   vowelBonusScorer = {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   scrabbleScorer = {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(scoreArr) {
   let userInput = input.question(`Which scoring algorithm would you like to use?

      0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
      1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
      2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
      Enter 0, 1, or 2: `);
   while (isNaN(userInput) || userInput < 0 || userInput > 2) {
      userInput = input.question('Invalid input. Please enter 0 , 1, or 2: ')
   }
   return scoreArr[userInput]
}

function transform(obj) {
   let newObject = {}
   for (let key in obj) {
      for (let i = 0; i < obj[key].length; i++) {
         newObject[obj[key][i].toLowerCase()] = Number(key);
      }
   }

   newObject[' '] = 0;

   return newObject
};

function runProgram() {
   let userWord = initialPrompt();
   let userAlg = scorerPrompt(scoringAlgorithms)
   console.log(`Score for '${userWord}': ${userAlg.scorerFunction(userWord)}`)
}

//ask about why tests fail

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

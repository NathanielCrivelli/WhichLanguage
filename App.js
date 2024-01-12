const fs = require("fs");
const frequency = JSON.parse(fs.readFileSync("./letterFrequency.json", "utf-8"));
const sample = fs.readFileSync("./text.txt", "utf-8");
let ranking = new Map();
let letterArray = Object.keys(frequency[0])
let sol;

const main = function() {
    textFreqency(removeCapsAndWhiteSpace(sample))
    chiSquare();
    console.log("The language is " + sol);
    
}

const chiSquare = function() {
    let min = 101;
    let minLanguage;
    for (let lang = 0; lang < 16; lang++) {
        let chiNum = 0; // Chi Square output for each language
        for (let letter = 1; letter < letterArray.length; letter++) {
            if (!ranking.has(letterArray[letter]) || frequency[lang][ranking]) { // if statement because sometimes values in either the language frequencies are 0, therefore cant do the equation
                if (frequency[lang][letterArray[letter]] != 0) {
                    let currentLetter = (0 - frequency[lang][letterArray[letter]]) ** 2; // part 1 of the formula
                    currentLetter /= frequency[lang][letterArray[letter]]; // part 2 of formula
                    chiNum += currentLetter;
                }
            } else {
                if (frequency[lang][letterArray[letter]] == 0 && ranking.get(letterArray[letter]) != 0) {
                    continue; // Checks for if letter does not exist in the language that sample is in
                } else {
                    let currentLetter = (ranking.get(letterArray[letter]) - frequency[lang][letterArray[letter]]) ** 2;
                    currentLetter /= frequency[lang][letterArray[letter]];
                    chiNum += currentLetter;
                }
            }
        }
        if (chiNum < min) { // if statement checks if the language is the minimum value every time the formula completes
            min = chiNum;
            minLanguage = frequency[lang]["Language"];
        }
    }
    sol = minLanguage;
}

const textFreqency = function(text) {
    const len = text.length;
    for (let i = 0; i < len; i++) {
        if (ranking.has(text.charAt(i))) {
            ranking.set(text.charAt(i), ranking.get(text.charAt(i))+1)
        } else {
            ranking.set(text.charAt(i), 1)
        }
    }
    // PUTTING NUMBER LETTERS THAT ARE IN SAMPLE INTO HASHMAP

    let array = [...ranking.keys()];
    for (let i = 0; i < array.length; i++) {
        ranking.set(array[i], (ranking.get(array[i])/len)*100)
    }
    // CONVERT LETTERCOUNT INTO PERCENTAGE

    return ranking
}

const removeCapsAndWhiteSpace = function(text) {
    let textFixed = text.toLowerCase();
    let noSpace = textFixed.split(" ").join('');
    let noNL = noSpace.split("\n").join('');
    let noDash = noNL.split("-").join('');
    let noHyphon = noDash.split("‘").join('');
    let noPeriod = noHyphon.split(".").join('');
    let noComma = noPeriod.split(",").join("");
    let noParaen = noComma.split("(").join("");
    let noRPara = noParaen.split(")").join("");
    let noLQuote = noRPara.split("“").join("");
    let noRQuote = noLQuote.split("”").join("");
    let noAnd = noRQuote.split("&").join("");
    let noBracket = noAnd.split("[").join("");
    let noRBracket = noBracket.split("]").join("");
    let noDots = noRBracket.split("…").join("");
    let noSlash = noDots.split("’").join("");
    let noQuote2 = noSlash.split("\"").join("");
    // GETTING RID OF SPECIAL CHARACTERS

    const stringWithoutNumbers = noQuote2.split('').filter(char => isNaN(char)).join('');
    // GETTING RID OF NUMBERS

    return stringWithoutNumbers;
    // RETURN COMPLETED STATEMENT
}

main();
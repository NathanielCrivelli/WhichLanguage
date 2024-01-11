const fs = require("fs");
const frequency = JSON.parse(fs.readFileSync("./letterFrequency.json", "utf-8"));
const sample = fs.readFileSync("./text.txt", "utf-8");
let ranking = new Map();
let chiRank = new Map();
let letterArray = Object.keys(frequency[0])

const chisquare = function() {
    for (let lang = 0; lang < 16; lang++) {
        let chiNum = 0;
        for (let letter = 1; letter < letterArray.length; letter++) {
            if (!ranking.has(letterArray[letter])) {
                if (frequency[lang][letterArray[letter]] != 0) {
                    let currentLetter = (0 - frequency[lang][letterArray[letter]]) ** 2;
                    currentLetter /= frequency[lang][letterArray[letter]];
                    chiNum += currentLetter;
                }
            } else {
                let currentLetter = (ranking.get(letterArray[letter]) - frequency[lang][letterArray[letter]]) ** 2;
                currentLetter /= frequency[lang][letterArray[letter]];
                chiNum += currentLetter;
            }
        }
        chiRank.set(frequency[lang]["Language"], chiNum);
    }

    return chiRank;
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

    let array = [...ranking.keys()];
    for (let i = 0; i < array.length; i++) {
        ranking.set(array[i], (ranking.get(array[i])/len)*100)
    }
    
    return ranking //may cause problems
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

    const stringWithoutNumbers = noQuote2.split('').filter(char => isNaN(char)).join('');

    return stringWithoutNumbers;
}

// console.log(frequency[15]);
// console.log(removeCapsAndWhiteSpace(sample));
console.log(removeCapsAndWhiteSpace(sample).length)
console.log(textFreqency(removeCapsAndWhiteSpace(sample)));
console.log(chisquare());
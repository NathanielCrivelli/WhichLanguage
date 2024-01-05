const fs = require("fs");
const frequency = JSON.parse(fs.readFileSync("./letterFrequency.json", "utf-8"));
const sample = fs.readFileSync("./text.txt", "utf-8");
let ranking = new Map();

// const chisquare = function() {
//     let chiNum = 0;
//     for (let i = 0; i < 17; i++) {

//     }
// }



const textFreqency = function(text) {
    const len = text.length;
    for (let i = 0; i < len; i++) {
        if (text.charAt(i) in ranking) {
            ranking[text.charAt(i)]++
        } else {
            ranking[text.charAt(i)] = 1;
        }
    }
}

const removeCapsAndWhiteSpace = function(text) {
    
}

console.log(frequency[15]);
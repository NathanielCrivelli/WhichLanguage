const fs = require("fs");
const frequency = JSON.parse(fs.readFileSync("./letterFrequency.json", "utf-8"));

// const chisquare = function() {
//     let chiNum = 0;
//     for (let i = 0; i < 17; i++) {

//     }
// }

console.log(frequency[0]["a"]);
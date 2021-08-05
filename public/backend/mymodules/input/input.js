const readline = require('readline');

input = function (question) {
    return new Promise(resolve => {    
        const rl = readline.createInterface({
            input:  process.stdin,
            output: process.stdout
        });
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });   
}


exports.input = input;

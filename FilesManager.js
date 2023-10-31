const movementUtils = require('./MovementUtils');
const utils = require('./utils');

function readOhCreditCard(nameFile) {
    const fs = require('fs');
    const pdf = require('pdf-parse');
    let dataBuffer = fs.readFileSync('./uploads/OhCreditCard/'+nameFile);
    pdf(dataBuffer).then(function(data) {
        var arr = data.text.split("\n");
        arr.forEach(element => {
            if(utils.dateValidator(element.substring(0,10))){
                console.log(element);
                console.log(element.substring(10, element.length));
            }
        });
    })
}

function readDebitCard(name){
    let movementList = [];
    const fs = require('fs');
    const pdf = require('pdf-parse'); 
    let dataBuffer = fs.readFileSync('./uploads/debitCard/'+name); 
    pdf(dataBuffer).then(function(data) {
        var arr = data.text.split("\n")
        arr.forEach(element => {
            if(element.length == 74){
                var dateMovement = element.substring(0,5).trim()
                var concept = element.substring(12, 35).trim()
                if(concept != 'SALDO ANTERIOR'){
                    var expense = element.substring(37, 54).trim().replace(",","")
                    var income = element.substring(56, 73).trim().replace(",","")
                    dateMovement = movementUtils.getNewFormatDate(dateMovement)

                    if(expense.length == 0){
                        expense = 0
                    }
                    if(income.length == 0){
                        income = 0
                    }

                    var movement = new Movements(dateMovement, dateMovement, concept, expense, income, 1);
                    movementList.push(movement);
                }
            }
            
        })

         /*  number of pages    
        console.log(data.numpages);     
        number of rendered pages    
        console.log(data.numrender);     
        PDF info    
        console.log(data.info);     
        PDF metadata    
        console.log(data.metadata);      
        PDF.js version     
        check https://mozilla.github.io/pdf.js/getting_started/    
        console.log(data.version);     PDF text    console.log(data.text);  */ 
    })
}

function readCreditCard(name) {
    const fs = require('fs');
    const pdf = require('pdf-parse'); 
    let dataBuffer = fs.readFileSync('./uploads/creditCard/'+name);
    let movementList = [];
    pdf(dataBuffer).then(function(data) {
        var arr = data.text.split("\n")
        var row = ""
        arr.forEach(element =>{
            if(element.length == 97 || element.length == 98 ){
                var dateMovement = element.substring(12,17).trim()
                if(dateMovement.length > 0){

                    dateMovement = movementUtils.getNewFormatDate(dateMovement)

                    var concept = element.substring(21, 60).trim()
                    var typeMovement = element.substring(76, 83).trim()
                    var amount = element.substring(85, element.length).replace(",","")
                    var expense = 0
                    var income = 0
                    if(typeMovement == 'CONSUMO' || typeMovement == 'PAGOSERVIC'){
                        expense = amount
                    }else{
                        income = element.substring(85, element.length-1)
                    }
                    var movement = new Movements(dateMovement, dateMovement, concept, expense, income, 2);
                    movementList.push(movement)
                    row = "('"+dateMovement+"', '"+ dateMovement +"', '"+concept+"', "+expense+", "+income+", 2),"
                }
            }
        })
        return sSQL
    });
}

module.exports = {
    readDebitCard:readDebitCard,
    readCreditCard:readCreditCard,
    readOhCreditCard:readOhCreditCard
}
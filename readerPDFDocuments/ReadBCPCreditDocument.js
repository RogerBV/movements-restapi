const ReaderDocument = require('./ReaderDocument');
const daoMySqlMovement = require('../dao/daoMySqlMovement');

module.exports = class ReaderBCPCreditDocument extends ReaderDocument {
    path = "/uploads/creditCard/";
    constructor() {
        super();
    }
    readDocument(name, cardId) {
        const fs = require('fs');
        const pdf = require('pdf-parse');
        let dataBuffer = fs.readFileSync('.'+this.path+name);
        let movementList = [];
        pdf(dataBuffer).then(function(data) {
            var arr = data.text.split("\n")
            arr.forEach((element) =>{
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
                        var movement = new Movements(dateMovement, dateMovement, concept, expense, income, cardId);
                        movementList.push(movement)
                    }
                }
            })
        });

        daoMySqlMovement.insertMultipleMovements(movementList);
    }
}
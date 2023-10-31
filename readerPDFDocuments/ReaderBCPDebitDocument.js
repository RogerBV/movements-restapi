const ReaderDocument = require('../readerPDFDocuments/ReaderDocument');
const DaoMySqlMovement = require('../dao/daoMySqlMovement');
const movementUtils = require('../MovementUtils');
const Movements = require('../entities/Movements');

module.exports = class ReaderBCPDebitDocument extends ReaderDocument {
    path = "/uploads/debitCard/";
    directoryName = "";
    cardId = 0;
    constructor(directoryName, cardId) {
        super();
        this.directoryName = directoryName;
        this.cardId = cardId;
    }
    readDocument(name, cardId) {
        const eMovementList = [];
        const fs = require('fs');
        const pdf = require('pdf-parse');
        let dataBuffer = fs.readFileSync('.'+this.path+name); 
        pdf(dataBuffer).then(function(data) {
            let arr = data.text.split("\n")
            arr.forEach(element => {
                if(element.length == 74){
                    let dateMovement = element.substring(0,5).trim()
                    var concept = element.substring(12, 35).trim()
                    if(concept != 'SALDO ANTERIOR'){
                        var expense = element.substring(37, 54).trim().replace(",","");
                        var income = element.substring(56, 73).trim().replace(",","");
                        dateMovement = movementUtils.getNewFormatDate(dateMovement)
                        if(expense.length == 0){
                            expense = 0
                        }
                        if(income.length == 0){
                            income = 0
                        }

                        var eMovement = new Movements(dateMovement, dateMovement, concept, expense, income, cardId);
                        eMovementList.push(eMovement);
                    }
                }
            });
            const daoMySqlMovement = new DaoMySqlMovement();
            daoMySqlMovement.insertMultipleMovements(eMovementList);
        });
        
    }
}
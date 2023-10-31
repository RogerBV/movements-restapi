module.exports = class ReaderOhCreditDocument extends ReaderDocument {
    readDocument(name, cardId) {
        const fs = require('fs');
        const pdf = require('pdf-parse');
        let dataBuffer = fs.readFileSync('./uploads/OhCreditCard/'+name);
        pdf(dataBuffer).then(function(data) {
            var arr = data.text.split("\n");
            arr.forEach(element => {
                if(utils.dateValidator(element.substring(0,10))){
                    console.log(element);
                    console.log(element.substring(10, element.length));
                }
            });
        });
    }
}
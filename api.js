const multer = require("multer");
const filesManager = require('./FilesManager');
var express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var cors = require ('cors');
const ReaderDocument = require('./readerPDFDocuments/ReaderDocument');
const BusinessRules = require("./BusinessRules/BusinessRules");
const handlerDocument = require('./readerPDFDocuments/HandlerDocument');
const ReaderBCPDebitDocument = require("./readerPDFDocuments/ReaderBCPDebitDocument");

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use('/api',router);

router.use((request,response,next)=>{
    next();
});

const upload = multer({
    dest:'./uploads/'
})

/*app.post('/upload', (req,res)=>{
    console.log(req.file)
    res.json({cool: "yeah"})
})*/

router.route('/manualRegisterMovement').post((request, response) => {
    try {
        let account = request.body;
        const bR = new BusinessRules();
        const insertMovement = bR.insertMovement(account);
        insertMovement.then((result) => {
            response.json(result);
        });
    } catch(error) {
        console.log(error);
    }
});

router.route('/uploadBCPCreditCard').post((request, response)=>{
  try {
    if (!request.files) {
      return response.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = request.files.file0;
    console.log(myFile)
        
    myFile.mv(`${__dirname}/uploads/creditCard/${myFile.name}`, function (err) {
      if (err) {
        console.log(err)
        return response.status(500).send({ msg: "Error occured" });
      } else {
        filesManager.readCreditCard(myFile.name)
      }
      // returing the response with file path and name
      return response.send({name: myFile.name, path: `/${myFile.name}`});
    });
  } catch(error){
    console.log(error)
  }
})

router.route('/uploadBCPDebitCard').post((request, response)=>{
    try {
        const directoryName = `${__dirname}`;
        const { cardId } = request.body;
        const readerDocument = new ReaderBCPDebitDocument(directoryName, cardId);
        return handlerDocument.uploadDocument(readerDocument, request, response);
    } catch(error){
        console.log(error)
    }
})

const uploadFile = (path, request) => {
    return new Promise((resolve, reject) => {
        if (!request.files) {
            reject('file is not found');
            //return response.status(500).send({ msg: "file is not found" })
        }

        // accessing the file
        const myFile = request.files.file0;

        myFile.mv(`${__dirname}${path}${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                reject(err)
                //return response.status(500).send({ msg: "Error occured" });
            }else {
                filesManager.readDebitCard(myFile.name)
                resolve(myFile.name)
            }
            // returing the response with file path and name
            return response.send({name: myFile.name, path: `/${myFile.name}`});
        });
    })
}

router.route('/uploadOhCreditCard').post((request, response)=>{
    let readerDocument = new ReaderOhCreditDocument()
    const upload = uploadFile(request, '/uploads/OhCreditCard/' );
    upload.then((result) => {
        console.log(result);
    })
    .catch((error) => {
        return response.status(500).send({ msg: error })
    })
});

router.route('/getBalances').get((request, response) => {
    const { cardId } = request.query;
    try {
        const bR = new BusinessRules();
        const balances = bR.getBalancesByCardId(cardId);
        balances.then((result) => {
            response.json(result);
        });
    } catch (error) {
        console.log(error);
    }
})

router.route('/getMovementsByMonth').get((request,response)=>{
    try {
        const { yearId, monthId, cardId } = request.query;
        const bR = new BusinessRules();
        const movements = bR.getMovementsByMonth(yearId, monthId, cardId);
        movements.then((result) => {
            response.json(result);
        });
    }catch(error){
        console.log(error);
    }
})

router.route('/getMovementsSumByYearAndMonth').get((request,response)=>{
    try{
        const { cardId } = request.query;
        const bR = new BusinessRules();
        const movements = bR.getMovementsSumByYearAndMonth(cardId);
        movements.then((result) => {
            response.json(result);
        });
    }catch(error){
        console.log(error);
    }
})

router.route('/getMovementsSumByDay').get((request,response)=>{
    try{
        const { yearId, monthId, cardId } = request.query;
        const bR = new BusinessRules();
        const movements = bR.getMovementsSumByDay(yearId, monthId, cardId);
        movements.then((result) => {
            response.json(result);
        });
    }catch(error){
        console.log(error);
    }
})


router.route('/getSumedMovementsByMonth').get((request,response)=>{
    try{
        const { yearId, monthId } = request.query;
        const bR = new BusinessRules();
        const movements = br.getSumedMovementsByMonth(yearId, monthId);
        movements.then((result) => {
            response.json(result);
        });
    }catch(error){
        console.log(error);
    }
})

router.route('/getBalanceByPeriod').get((request, response) => {
    try {
        const { yearId, monthId } = request.query;
        const bR = new BusinessRules();
        const response = bR.getBalanceByPeriod(yearId, monthId);
        response.then((result) => {
            response.json(result);
        })
    } catch (error) {
        console.log(error);
    }
})

router.route('/getSumedMovementsByMonthAndConcept').get((request,response)=>{
    try {
        const { yearId, monthId, dayId, cardId } = request.query;
        const bR = new BusinessRules();
        const result = bR.getSumedMovementsByMonthAndConcept(yearId, monthId, dayId, cardId);
        result.then((result) => {
            response.json(result);
        })
    } catch(error){
        console.log(error);
    }
});

router.route('/getCards').get((request, response) => {
  try {
    const bR = new BusinessRules();
    const result = bR.getCards();
    result.then((result) => {
      response.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.route('/getFamilies').get((request, response) => {
  try {
    const bR = new BusinessRules();
    const result = bR.getFamilies();
    result.then((result) => {
      response.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.route('/insertFamily').post((request, response) => {
  try {
    const { familyName } = request.body;
    const bR = new BusinessRules();
    const result = bR.insertFamily(familyName);
    result.then((result) => {
      response.json(result);
    })
  } catch (error) {
    console.log(error);
  }
});

router.route('/getFamilyConceptByFamilyId').get((request, response) => {
  try {
    const { FamilyId } = request.query;
    const bR = new BusinessRules();
    const result = bR.getFamiliesConceptByFamilyId(FamilyId);
    result.then((result) => {
      response.json(result);
    });
  } catch(error) {
    console.log(error);
  }
});

router.route('/insertFamilyConcept').post((request, response) => {
  try {
    const { FamilyId, Name } = request.body;
    const bR = new BusinessRules();
    const result = bR.insertFamilyConcept(Name, FamilyId);
    result.then((result) => {
      response.json(result);
    });
  } catch (error) {

  }
});

app.listen(3001)
console.log("Server on port 3001")

module.exports = app;
const DaoMovements = require('./daoMovements');
const configMySql = require('./dbConfigMySql');

module.exports = class DaoMySqlMovement extends DaoMovements {
    constructor() {
      super();
    }

    getMovementsByMonth = (yearId, monthId, cardId) => {
        return new Promise((resolve, reject) => {
            const sSQL = "SELECT movementId, dateMovement, dateValue, concept, expense, income, cardId FROM movements WHERE MONTH(dateMovement)="+monthId+ " AND YEAR(dateMovement)="+yearId+" and cardId="+cardId + " ORDER BY dateValue ASC"
            configMySql.query(sSQL, function(err, result) {
                if(err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    }

    insertMovement = (account) => {
        try {
            return new Promise((resolve, reject) => {
                const sSqlStoredProcedure = "Call sp_insertMovement(?, ?, ?, ? ,?, ?)";
                configMySql.query(
                    sSqlStoredProcedure, [
                        account.dateMovement, account.dateValue, account.concept,
                        account.expense, account.income,account.cardId
                    ], function (err, result) {
                        if(err) reject(err);
                        else {
                            resolve(result);
                        }
                    }
                );
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    getMovementsSumByYearAndMonth = (cardId) => {
        try {
            return new Promise((resolve, reject) => {
                const sSql = "SELECT * FROM v_movements WHERE cardId="+cardId
                configMySql.query(sSql,function(err,result){
                    if(err) reject(err);
                    else {
                        resolve(result);
                    }
                });
            })
        } catch (error) {
            console.log('Error: '+error);
        }
    }
    
    getMovementsSumByDay = (yearId, monthId, cardId) => {
        return new Promise((resolve, reject) => {
            const sSql = "SELECT CONCAT('Dia ', DAY(dateMovement)) as period, SUM(income) as income ,sum(expense) as expense, cardId FROM movements WHERE year(dateMovement) = "+ yearId +" AND month(dateMovement)="+monthId+" and cardId = "+cardId+" GROUP BY(dateMovement), cardId";
            configMySql.query(sSql,function(err,result){
                if(err) reject();
                else {
                    resolve(result);
                }
            });
        });
    }
    
    getSumedMovementsByMonth = (yearId, monthId) => {
        return new Promise((resolve, reject) => {
            const sSQL = "SELECT SUM(income) as income, SUM(expense) as expense,dateMovement as period  FROM Movements WHERE MONTH(dateMovement)="+monthId+ " AND YEAR(dateMovement)="+yearId +" GROUP BY dateMovement";
            configMySql.query(sSQL, function(err, result) {
                if(err) reject();
                else {
                    resolve(result);
                }
            });
        });
    }
    
    getBalancesByCardId = (cardId) => {
        return new Promise((resolve, reject) => {
            const sSqlStoredProcedure = "call sp_getBalanceByCardId(?)";
            configMySql.query(sSqlStoredProcedure, [cardId], function(err, result){
                if (err) reject(err);
                else {
                    resolve(result[0]);
                }
            })
        });
    }
    
    getBalanceByPeriod = (yearId, monthId) => {
        return new Promise((resolve, reject) => {
            const sSQL = "SELECT * FROM Balance WHERE yearId="+yearId+" AND monthId="+monthId;
            configMySql.query(sSQL, function(err, result) {
                if(err) reject(err);
                else {
                    resolve(result);
                }
            })
        });
    }
    
    getSumedMovementsByMonthAndConcept = (yearId, monthId, dayId, cardId) => {
        try {
            let arr = [];
            return new Promise((resolve, reject) => {
                const sSqlStoredProcedure = "Call sp_getSumedMovementsByMonthAndConcept( ?, ?, ?, ? )";
                configMySql.query(sSqlStoredProcedure, [yearId, monthId, dayId, cardId], function (err, result) {
                    if(err) reject(err);
                    else {
                        result[0].forEach(element=>{
                            const obj = {
                                concept: element.concept,
                                expense: element.expense
                            }
                            arr.push(obj)
                        })
                        resolve(arr);
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    insertMultipleMovements = (movementList) => {
        try {
            return new Promise((resolve, reject) => {
                let sSQL = "";
                movementList.map((movement) => {
                    sSQL = "Call sp_insertMovement('"+movement.dateMovement+"', '"+ movement.dateMovement +"', '"+movement.concept+"', "+movement.expense+", "+movement.income+", "+movement.cardId+");"
                    configMySql.query(sSQL,function(err, result){

                    });
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}
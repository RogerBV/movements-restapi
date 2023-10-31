const DaoMovements = require('./daoMovements');
const configMySql = require('./dbConfigMySql');

module.exports = class DaoMySqlCard extends DaoMovements {
  constructor() {
    super();
  }

  getCards = () => {
    return new Promise((resolve, reject) => {
      const sSQL = "SELECT * FROM v_card";
      configMySql.query(sSQL, function(err, result) {
        if(err) reject(err);
        else resolve(result);
      });
    });
  };
}
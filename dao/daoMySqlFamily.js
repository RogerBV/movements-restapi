const configMySql = require('./dbConfigMySql');

module.exports = class DaoMySqFamily {
  getFamilies = () => {
    return new Promise((resolve, reject) => {
      const sSQL = "SELECT FamilyId, Name FROM Family";
      configMySql.query(sSQL, function(err, result) {
        if (err) reject(err);
        else resolve(result);
      })
    });
  }

  insertFamily = (familyName) => {
    return new Promise((resolve, reject) => {
      const sSQL = "INSERT INTO Family (name) VALUES (?)";
      configMySql.query(sSQL, [familyName], function(err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  getFamiliesConceptByFamilyId = (FamilyId) => {
    return new Promise((resolve, reject) => {
      const sSQL = "SELECT * FROM FamilyConcept WHERE FamilyId = ?";
      configMySql.query(sSQL, [FamilyId], function(err, result) {
        if(err) reject(err);
        else resolve(result);
      })
    })
  }

  insertFamilyConcept = (name, familyId) => {
    return new Promise((resolve, reject) => {
      const sSQL = "INSERT INTO FamilyConcept (Name, FamilyId) VALUES(?, ?)";
      configMySql.query(sSQL, [name, familyId], function(err, result){
        if(err) reject(err);
        else resolve(result);
      })
    });
  }
}
const DaoMySqlCard = require("../dao/daoMySqlCard");
const DaoMySqlMovement = require("../dao/daoMySqlMovement");
const DaoMySqlFamily = require("../dao/daoMySqlFamily");

module.exports = class BusinessRules {
    constructor() {
        if(!BusinessRules.instance) {
            BusinessRules.instance = this;
        }
        return BusinessRules.instance;
    }

    getCards() {
      const daoMySqlCard = new DaoMySqlCard();
      return daoMySqlCard.getCards();
    }

    getSumedMovementsByMonthAndConcept(yearId, monthId, dayId, cardId) {
      const daoMySqlMovement = new DaoMySqlMovement();
      return daoMySqlMovement.getSumedMovementsByMonthAndConcept(yearId, monthId, dayId, cardId);
    }

    getBalanceByPeriod(yearId, monthId) {
      const daoMySqlMovement = new DaoMySqlMovement();
      return daoMySqlMovement.getBalanceByPeriod(yearId, monthId);
    }

    getSumedMovementsByMonth(yearId, monthId) {
        const daoMySqlMovement = new DaoMySqlMovement();
        return daoMySqlMovement.getSumedMovementsByMonth(yearId, monthId);
    }

    getMovementsSumByDay(yearId, monthId, cardId) {
        const daoMySqlMovement = new DaoMySqlMovement();
        return daoMySqlMovement.getMovementsSumByDay(yearId, monthId, cardId);
    }

    getMovementsSumByYearAndMonth(cardId) {
        const daoMySqlMovement = new DaoMySqlMovement();
        return daoMySqlMovement.getMovementsSumByYearAndMonth(cardId);
    }

    getMovementsByMonth(yearId, monthId, cardId) {
        const daoMySqlMovement = new DaoMySqlMovement();
        return daoMySqlMovement.getMovementsByMonth(yearId, monthId, cardId);
    }

    getBalancesByCardId(cardId) {
        const daoMySqlMovement = new DaoMySqlMovement();
        return daoMySqlMovement.getBalancesByCardId(cardId);
    }

    insertMovement(account) {
        const daoMySqlMovement = new DaoMySqlMovement();
        return daoMySqlMovement.insertMovement(account);
    }

    getFamilies () {
      const daoMySqlFamily = new DaoMySqlFamily();
      return daoMySqlFamily.getFamilies();
    }

    insertFamily (familyName) {
      const daoMySqlFamily = new DaoMySqlFamily();
      return daoMySqlFamily.insertFamily(familyName);
    }

    getFamiliesConceptByFamilyId = (FamilyId) => {
      const daoMySqlFamily = new DaoMySqlFamily();
      return daoMySqlFamily.getFamiliesConceptByFamilyId(FamilyId);
    }

    insertFamilyConcept = (name, familyId) => {
      const daoMySqlFamily = new DaoMySqlFamily();
      return daoMySqlFamily.insertFamilyConcept(name, familyId);
    }

}
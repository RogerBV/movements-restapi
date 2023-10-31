module.exports = class Movements {
    dateMovement = "";
    dateValue = "";
    concept = "";
    expense = 0;
    income = 0;
    cardId = 0;
    
    constructor(dateMovement, dateValue, concept, expense, income, cardId) {
        this.dateMovement = dateMovement;
        this.dateValue = dateValue;
        this.concept = concept;
        this.expense = expense;
        this.income = income;
        this.cardId = cardId;
    }
}
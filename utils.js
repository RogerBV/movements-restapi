function dateValidator(posibleDate) {
    var result1 = isANumber(posibleDate.substring(0, 2));
    var result2 = posibleDate.substring(2, 3) == '/';
    var result3 = isANumber(posibleDate.substring(3, 5));
    var result5 = isANumber(posibleDate.substring(6, 10));
    return result1 && result2 && result3;
}

function isANumber(value) {
    const conv = +value;
    if (conv) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    dateValidator: dateValidator
}
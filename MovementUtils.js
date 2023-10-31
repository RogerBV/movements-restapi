function getNewFormatDate(dateMovement){
    var year = "2022"
    var month = dateMovement.substring(2,6)
    if(month == "Ene" ||  month == "ENE"){
        month = "01"
    }
    if(month == "Feb" || month == "FEB"){
        month = "02"
    }
    if(month == "Mar" || month == "MAR"){
        month = "03"
    }
    if(month == "Abr" ||  month == "ABR"){
        month = "04"
    }
    if(month == "May" ||  month == "MAY"){
        month = "05"
    }
    if(month == "Jun" ||  month == "JUN"){
        month = "06"
    }
    if(month == "Jul" || month == "JUL"){
        month = "07"
    }
    if(month == "Ago" || month == "AGO"){
        month = "08"
    }
    if(month == "Set" || month == "SET"){
        month = "09"
    }
    if(month == "Oct" || month == "OCT"){
        month = "10"
    }
    if(month == "Nov" ||  month == "NOV"){
        month = "11"
    }
    if(month == "Dic" ||  month == "DIC"){
        month = "12"
    }
    return year+month+dateMovement.substring(0,2)
}

module.exports = {
    getNewFormatDate:getNewFormatDate
}
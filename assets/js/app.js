let today = new Date().toLocaleString();
todayHeader.innerHTML += today;

function countryCreator(countryC, nameC, flagC){
    
    this.countryC = countryC;
    this.nameC = nameC;
    this.flagC = flagC;  
}

function currencyCreator(currencyCode, nameCc, rateCc) {
    this.currencyCode = currencyCode;
    this.nameCc = nameCc;
    this.rateCc = rateCc;
}

function finalCreate(finalName, finalCc, finalRate, finalFlag, countryName) {
    this.finalName = finalName;    
    this.finalCc = finalCc;
    this.finalRate = finalRate;
    this.finalFlag = finalFlag;
    this.countryName = countryName;
}

const rateURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
const countryURL = "https://restcountries.com/v3.1/all";

let ratesData = await fetch(rateURL);
ratesData = await ratesData.json();

let countriesData = await fetch(countryURL);
countriesData = await countriesData.json();



let countriesCc = [], 
    countriesName = [], 
    countriesFlags = [], 
    currencyCc = [], 
    currencyName = [],
    currencyRate = [],
    finalName = [],
    finalCode = [],
    finalRates = [],
    finalFlags = [],
    countryNames = [];

let newCountry = [], newCurrency = [], finishCode = [];



for (let item in countriesData){
    if(countriesData[item].currencies !== undefined && countriesData[item].flags !== undefined && countriesData[item].name.official !== undefined ) {
        countriesCc.push(Object.keys(countriesData[item].currencies)[0]);
        countriesName.push(countriesData[item].name.official);
        countriesFlags.push(countriesData[item].flags.png)
    }
}

for (let item in ratesData){
    currencyCc.push(ratesData[item].cc);
    currencyName.push(ratesData[item].txt);
    currencyRate.push(ratesData[item].rate);
}

for (let i = 0; i <= countriesCc.length; i++) {    
        let countTry = new countryCreator (countriesCc[i], countriesName[i], countriesFlags[i]);
        if(countriesCc[i] !== undefined && countriesName[i] !== undefined && countriesFlags[i] !== undefined) {
            newCountry.push(countTry);  
        }
}

for (let i = 0; i <= ratesData.length; i++) {    
    let currencTry = new currencyCreator (currencyCc[i], currencyName[i], currencyRate[i]);
    if(currencyCc[i] !== undefined && currencyName[i] !== undefined && currencyRate[i] !== undefined) {
        newCurrency.push(currencTry); 
    }
          
}

console.log(newCountry, newCurrency);


for (let i = 0; i <= newCountry.length; i++) {
    for (let j = 0; j <= newCurrency.length; j++) {
        if(_.isEqual(newCountry[i]?.countryC, newCurrency[j]?.currencyCode)) {
            finalName.push(newCurrency[j]?.nameCc);
            finalCode.push(newCurrency[j]?.currencyCode);
            finalRates.push(newCurrency[j]?.rateCc);
            finalFlags.push(newCountry[i]?.flagC);
            countryNames.push(newCountry[i]?.nameC);
        }
    }
}
for (let i = 0; i <= finalName.length; i++) {
    let finalTry = new finalCreate(finalName[i], finalCode[i], finalRates[i], finalFlags[i], countryNames[i]);
    if(finalName[i] !== undefined && finalCode[i] !== undefined && finalRates[i] !== undefined && finalFlags[i] !== undefined && countryNames[i] !== undefined) {
        finishCode.push(finalTry); 
    }
}

infoPlace.innerHTML = finishCode.map (item => `
                <div class="d-flex align-items-center border border-3 m-3 p-1 w-50 mx-auto">    
                    <h5>${item.finalName}</h5>
                    
                    <div class="flex-grow-1 ms-5 w-25">
                        <span>${item.finalRate}
                    </div>
                        <img class="img-thumbnail m-1  border border-2" src="${item.finalFlag}" title="${item.countryName}"" style= "width: 100px; height:100px">
                </div>`
).join("");
    
    


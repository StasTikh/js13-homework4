let today = new Date().toLocaleString();
todayHeader.innerHTML += today;

// function countryCreator(countryC, nameC, flagC){
    
//     this.countryC = countryC;
//     this.nameC = nameC;
//     this.flagC = flagC;  
// }

// function currencyCreator(currencyCode, nameCc, rateCc) {
//     this.currencyCode = currencyCode;
//     this.nameCc = nameCc;
//     this.rateCc = rateCc;
// }

// function finalCreate(finalName, finalCc, finalRate, finalFlag, countryName) {
//     this.finalName = finalName;    
//     this.finalCc = finalCc;
//     this.finalRate = finalRate;
//     this.finalFlag = finalFlag;
//     this.countryName = countryName;
// }

// const rateURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
// const countryURL = "https://restcountries.com/v3.1/all";

// let ratesData = await fetch(rateURL);
// ratesData = await ratesData.json();

// let countriesData = await fetch(countryURL);
// countriesData = await countriesData.json();

// let outputObj = [{}];

// countriesData = countriesData
//                     .filter(item => item.currencies)
//                     .map(item => ({
//                         title: item.name.common,
//                         flag: item.flags.png,
//                         cc: Object.keys(item.currencies)
//                     }));

// for (let rate of ratesData) {
//     rate.countriesData = countriesData.filter(item => item.cc.includes(ratesData.cc));
// }

// console.log(countriesData);

// for (let i = 0; i <= ratesData.length; i++) {
//     outputObj.name = ratesData[i].txt;
//     outputObj.rates = ratesData[i].cc;
//     for (let j = 0; j <= countriesData.length; j++) {
//         if (countriesData[i]?.cc == ratesData[j]?.cc) {
//            outputObj.flags.push(countriesData?.flag);
//         }    
//     }
// }

// console.log(outputObj);

const rateURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
const countryURL = "https://restcountries.com/v3.1/all";

let ratesData = await fetch(rateURL);
ratesData = await ratesData.json();

let countriesData = await fetch(countryURL);
countriesData = await countriesData.json();

let outputArr = [];


countriesData = countriesData
                    .filter(item => item.currencies)
                    .map(item => ({
                        title: item.name.common,
                        flag: item.flags.png,
                        cc: Object.keys(item.currencies)
                    }));

for (let rate of ratesData) {
    rate.countriesData = countriesData.filter(item => item.cc.includes(ratesData.cc));
}

console.log(countriesData);

//country is not object

for (let i = 0; i < ratesData.length; i++) {
    let outputObj = new Object(); 
    outputObj.txt = ratesData[i]?.txt;
    outputObj.rates = ratesData[i]?.rate;
    outputObj.countries = [];
    outputObj.flags = [];
    for (let j = 0; j < countriesData.length; j++) {
        if (countriesData[j]?.cc == ratesData[i]?.cc) {
           outputObj.countries.push(countriesData[j]?.title);
           outputObj.flags.push(countriesData[j]?.flag);
        }    
    }
  outputArr.push(outputObj);
}

// country is object includes flags and names

// for (let i = 0; i < ratesData.length; i++) {
//     let outputObj = new Object(); 
//     outputObj.txt = ratesData[i]?.txt;
//     outputObj.rates = ratesData[i]?.rate;
//     outputObj.countries = [];
//     for (let j = 0; j < countriesData.length; j++) {
//         if (countriesData[j]?.cc == ratesData[i]?.cc) {
//            let outputCountry = new Object();
//            outputCountry.name = countriesData[j]?.title;
//            outputCountry.flag = countriesData[j]?.flag;
//            outputObj.countries.push(outputCountry);
//         }    
//     }
//   outputArr.push(outputObj);
// }

for (let i = 1; i <= 4; i++){
    outputArr.pop();
}

console.log(outputArr);

infoPlace.innerHTML = outputArr.map (item => `
                <div id="countryCard" class="d-flex align-items-center border border-3 m-3 p-1 w-50 mx-auto">    
                <h5 class="m-1">${item.txt}: </h5>
                <h5 class="m-1">${item.rates}</h5>
                <img src="${item.flags}" title="${item.countries}" style="width: 75px; height: 75px" class="m-2 border border-1"</img>       
                </div>`
).join("");
    
for (let i = 0; i < outputArr.length; i++){
    if(outputArr[i]?.flags.length != 1) {
       for(let j = 0; j <= outputArr[i].flags.length; j++){
            countryCard.insertAdjacentHTML('beforeend', 
                                           `<img src="${outputArr[i].flags[j]}" title="${outputArr[i].countries[j]}" style="width: 75px; height: 75px" class="m-2 border border-1"</img> 
            `)
       }  
    }
}

let today = new Date().toLocaleString();
todayHeader.innerHTML += today;

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

for (let i = 0; i < ratesData.length; i++) {
    let outputObj = new Object(); 
    outputObj.txt = ratesData[i]?.txt;
    outputObj.rates = ratesData[i]?.rate;
    outputObj.countries = [];
    for (let j = 0; j < countriesData.length; j++) {
        if (countriesData[j]?.cc == ratesData[i]?.cc) {
           let outputCountry = new Object();
           outputCountry.name = countriesData[j]?.title;
           outputCountry.flag = countriesData[j]?.flag;
           outputObj.countries.push(outputCountry);
        }    
    }
  outputArr.push(outputObj);
}

for (let i = 1; i <= 4; i++){
    outputArr.pop();
}

console.log(outputArr);

infoPlace.innerHTML = outputArr.map (item => `
                <div id="countryCard" class="border border-3 m-3 p-1 w-25">    
                <h6 class="m-1"> ${item.txt} = ${item.rates} UAH</h6>
                <div class="ms-3">
                    ${item.countries.map(oneFlag => `<img src="${oneFlag.flag}" style="width: 3rem; height: 1.5rem" title="${oneFlag.name}" class="m-2 border border-2">`).join('')}
                </div>
                </div>`
).join("");
    

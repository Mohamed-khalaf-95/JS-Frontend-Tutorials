//b9167a1f7446440d8b19dae9b659c31e
// 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=YOUR_APIKEY'

let amount = document.getElementById("amount-value");
let mainCurrency = document.getElementById("main-currency-value");
let subCurrency = document.getElementById("sub-currency-value");
let chValue = document.getElementById("ch-value");
let priceToDay = document.querySelector("#ch-value span");
let yourChange = document.querySelector(".your-change span");


let currncyApi = fetch(
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=b9167a1f7446440d8b19dae9b659c31e"
)
  .then((result) => {
    let currncyData = result.json();
    return currncyData;
  })
  .then((currn) => {
    let mainCurrencyKeys = Object.keys(currn.rates);
    let myBaseSpan = document.createElement("span");
    let myBaseSpanText = document.createTextNode(` ${currn.base}`);
    myBaseSpan.appendChild(myBaseSpanText);
    mainCurrency.appendChild(myBaseSpan);
    myBaseSpan.style.color = "#fff";

    // Start Sub Currn
    mainCurrencyKeys.forEach((el) => {
      let opt = document.createElement("option");
      let optData = document.createTextNode(el);
      opt.appendChild(optData);
      subCurrency.appendChild(opt);
      opt.setAttribute("value", el);
      if (opt.innerHTML.toLowerCase() === "egp") {
        opt.setAttribute("selected", "");
      }
    });

    return currn.rates;
  })
  .then((value) => {
    let currencyVal = Number(parseFloat(value[subCurrency.value]).toFixed(3));
    priceToDay.innerHTML = `${currencyVal} ${subCurrency.value}`;
    subCurrency.oninput = () => {
      priceToDay.innerHTML = `${Number(
        parseFloat(value[subCurrency.value]).toFixed(3)
      )} ${subCurrency.value}`;
    };
    return priceToDay;
  })
  .then((changeVal) => {
    amount.oninput = () => {
      yourChange.innerHTML = parseFloat(amount.value) * parseFloat(changeVal.innerHTML)
    };
  });

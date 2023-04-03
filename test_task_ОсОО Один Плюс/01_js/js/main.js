const serverUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1";

async function serverGetCurrency() {
  let response = await fetch(serverUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data;
}

let serverData = await serverGetCurrency();

let currency = [];

if (serverData !== null) {
  currency = serverData;
}

const $currencyList = document.getElementById("currency-list");
const $currencyListTHAll = document.querySelectorAll(".currencyTable th");
const greenColor = "#81c16b";
const blueColor = "#2b83ff";

// Получить tr валюты
function newCurrencyTR(currencyObj) {
  const $currencyTR = document.createElement("tr"),
    $idCurrencyTD = document.createElement("td"),
    $symbolCurrencyTD = document.createElement("td"),
    $nameCurrencyTD = document.createElement("td");

  $idCurrencyTD.textContent = currencyObj.id.trim();
  $symbolCurrencyTD.textContent = currencyObj.symbol.trim();
  $nameCurrencyTD.textContent = currencyObj.name.trim();

  $currencyTR.append($idCurrencyTD, $symbolCurrencyTD, $nameCurrencyTD);
  $currencyTR.classList.add("currency-tr");

  if (currencyObj.symbol.trim() == "usdt") {
    $currencyTR.style.backgroundColor = greenColor;
  }
  return $currencyTR;
}

// топ 5 монет
function topColor() {
  const $currencyTRList = document.querySelectorAll(".currency-tr");
  for (let i = 0; i < 5 && i < $currencyTRList.length; i++) {
    if ($currencyTRList[i].querySelector('td:nth-child(2)').textContent !== "usdt") {
        $currencyTRList[i].style.backgroundColor = blueColor
    } 
  }
  return;
}

// Отрисовать
function render() {
  let currencyCopy = [...serverData];
  $currencyList.innerHTML = "";

  for (const curren of currencyCopy) {
    const $newTr = newCurrencyTR(curren);
    $currencyList.append($newTr);
  }
  topColor();
}
render();

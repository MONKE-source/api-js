function getCountryInfo(name, information) {
  const url = "https://restcountries.com/v3.1/name/" + name;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      information.forEach((element) => {
        try {
          const info = getNestedValue(data[0], element);
          console.log(element + ": " + JSON.stringify(info, null, 2));
        } catch (error) {
          console.error("Invalid information for element: " + element);
        }
      });
    })
    .catch((error) => console.error(error));
}

function getNestedValue(obj, key) {
  return key.split(".").reduce((o, k) => (o || {})[k], obj);
}

getCountryInfo("canada", [
  "capital",
  "population",
  "coatOfArms",
  "languages.eng",
  "translations.fra.common",
]);

function getCountryInfo(name, information) {
  const url = "https://restcountries.com/v3.1/name/" + name;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      information.forEach((element) => {
        try {
          const info = getNestedValue(data[0], element);
          thing = JSON.stringify(info, null, 0);
          console.log(element + ": " + thing);
          if (element == "flags.svg") {
            document.getElementById("flag").src = thing.slice(1, -1);
          }
          if (element == "name.common") {
            document.getElementById("name").innerHTML =
              "Country name: " + thing.slice(1, -1);
            document.getElementById("title").innerHTML = thing.slice(1, -1);
          }
          if (element == "capital") {
            document.getElementById("capital").innerHTML =
              "Country capital: " + thing.slice(2, -2);
          }
          if (element == "population") {
            document.getElementById("population").innerHTML =
              "Country population: " + thing;
          }
          if (element == "area") {
            document.getElementById("area").innerHTML =
              "Country area: " + thing + " km²";
          }
        } catch (error) {
          console.error("Invalid information for element: " + element);
          alert("Invalid information");
        }
      });
    })
    .catch((error) => console.error(error));
}

function getNestedValue(obj, key) {
  return key.split(".").reduce((o, k) => (o || {})[k], obj);
}

function getCountry() {
  const name = document.getElementById("country").value;
  event.preventDefault(); // prevent from reloading
  getCountryInfo(name, [
    "name.common",
    "capital",
    "population",
    "area",
    "flags.svg",
  ]);
}
// splice method helps to remove elements from an array/string

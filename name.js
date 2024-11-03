function nameProps() {
  const name = "john";
  // Api URLS
  const ageURL = "https://api.agify.io?name=" + name;
  const nationalityURL = "https://api.nationalize.io/?name=" + name;
  const genderURL = "https://api.genderize.io?name=" + name;
  // Obtaining the age
  fetch(ageURL)
    .then((response) => response.json())
    .then((data) => {
      const age = data.age;
      console.log(age);
    })
    .catch((error) => console.error(error));
  //obtaining the nationality
  fetch(nationalityURL)
    .then((response) => response.json())
    .then((data) => {
      const country = data.country[0].country_id;
      fetch("https://restcountries.com/v3.1/alpha/" + country)
        .then((response) => response.json())
        .then((data) => {
          const countryName = data[0].name.common;
          console.log(countryName);
        });
    })
    .catch((error) => console.error(error));
  //obtaining the gender
  fetch(genderURL)
    .then((response) => response.json())
    .then((data) => {
      const gender = data.gender;
      console.log(gender);
    })
    .catch((error) => console.error(error));
}

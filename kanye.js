function apiFetchKanye() {
  fetch("https://api.kanye.rest")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").innerHTML = '" ' + data.quote + ' "';
      console.log(data.quote);
    })
    .catch((error) => console.error(error));
}

apiFetchKanye();

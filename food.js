function generateInstructions() {
  const mode = document.getElementById("dropdown").value;
  const prompt = document.getElementById("country").value;
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = ""; // Clear previous results

  if (mode === "name") {
    try {
      fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + prompt)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals.length === 1) {
            const meal = data.meals[0];
            displayMeal(meal);
          } else {
            const meals = data.meals.map((meal) => meal.strMeal);
            resultContainer.innerHTML =
              "Multiple meals found: " + meals.join(", ");
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  } else if (mode === "area") {
    try {
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + prompt)
        .then((response) => response.json())
        .then((data) => {
          const meals = data.meals.map((meal) => [
            meal.strMeal,
            meal.strMealThumb,
          ]);
          displayMeals(meals);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  } else if (mode === "main-ingrediant") {
    try {
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + prompt)
        .then((response) => response.json())
        .then((data) => {
          const meals = data.meals.map((meal) => [
            meal.strMeal,
            meal.strMealThumb,
          ]);
          displayMeals(meals);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  }
}

function displayMeal(meal) {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
  `;
}

function displayMeals(meals) {
  const resultContainer = document.getElementById("result-container");
  meals.forEach(([mealName, mealThumb]) => {
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
      <h3>${mealName}</h3>
      <img src="${mealThumb}" alt="${mealName}" />
    `;
    resultContainer.appendChild(mealDiv);
  });
}

function fetchRandomMeal() {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = ""; // Clear previous results

  try {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const meal = data.meals[0];
        displayMeal(meal);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
}

document.querySelector(".submit-button").addEventListener("click", (event) => {
  event.preventDefault();
  generateInstructions();
});

document.querySelector(".random-button").addEventListener("click", (event) => {
  event.preventDefault();
  fetchRandomMeal();
});

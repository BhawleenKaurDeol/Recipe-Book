let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

const form = document.getElementById("recipe-form");
const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("recipe-name").value;
  const ingredients = document.getElementById("ingredients").value;
  const steps = document.getElementById("steps").value;
  const imageInput = document.getElementById("recipe-image");
  const imageFile = imageInput.files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    const newRecipe = {
      name,
      ingredients,
      steps,
      image: reader.result || ""
    };

    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();
    form.reset();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onloadend();
  }
});

searchInput.addEventListener("input", () => {
  renderRecipes(searchInput.value.toLowerCase());
});

function renderRecipes(query = "") {
  recipeList.innerHTML = "";
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.ingredients.toLowerCase().includes(query)
  );

  filtered.forEach((recipe) => {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.innerHTML = `
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}" alt="Recipe Image" />
      <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
      <p><strong>Steps:</strong><br>${recipe.steps}</p>
    `;
    recipeList.appendChild(div);
  });
}

renderRecipes();


//To clear all the recipes
document.getElementById("clear-recipes").addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all recipes?")) {
        localStorage.removeItem("recipes");
        recipes = [];
        renderRecipes();
    }
});

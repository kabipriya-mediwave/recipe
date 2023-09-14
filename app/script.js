let favrecipe = [];
function makerecipeDiv(recipe) {
  const div = document.createElement("div");
  div.setAttribute("class", "recipe-card");
  const id = `recipe-${recipe["id"]}`;
  div.setAttribute("id", id);
  const h2 = document.createElement("h2");
  h2.innerText = recipe["title"];
  const h3 = document.createElement("h3");
  h3.innerText = recipe["time"];
  const h4 = document.createElement("h4");
  h4.innerText = recipe["steps"];

  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "imageBox");
  const image = document.createElement("img");
  image.src = recipe["image"];
  image.setAttribute("class", "picture");
  div.appendChild(imageDiv);
  imageDiv.appendChild(image);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Clear";

  deleteBtn.addEventListener("click", function () {
    removerecipe(recipe["id"]);
  });
  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(h4);

  div.appendChild(deleteBtn);
  return div;
}
function removerecipe(recipeId) {
  console.log("Deleting ", recipeId);

  const filteredArray = favrecipe.filter((recipe) => recipe.id != recipeId);
  favrecipe = filteredArray;
  updaterecipeListUI();
}
function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}

function updaterecipeListUI() {
  clearApp();
  for (let i = 0; i < favrecipe.length; i++) {
    const recipeDiv = makerecipeDiv(favrecipe[i]);
    const recipeApp = document.querySelector("#app");
    recipeApp.appendChild(recipeDiv);
    const totalcount = document.querySelector("#value");
    totalcount.innerText = favrecipe.length;
  }
}
function addrecipe(recipe) {
  favrecipe.push(recipe);
  updaterecipeListUI();
  saveToLocalStorage();
}
function hookForm() {
  const form = document.querySelector("#add-recipe-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#recipe-name").value;
    const time = document.querySelector("#preparation-time").value;
    const steps = document.querySelector("#steps").value;
    const image = document.querySelector("#image").value;

    const recipe = {
      id: new Date().getTime(),
      title: name,
      time: time,
      steps: steps,
      image: image,
      isEdit: false,
    };
    addrecipe(recipe);
  });
}
function saveToLocalStorage() {
  const str = JSON.stringify(favrecipe);
  localStorage.setItem("my-recipe-list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("my-recipe-list");
  if (!str) {
    favrecipe = [];
  } else {
    favrecipe = JSON.parse(str);
  }
}
getFromLocalStorage();
updaterecipeListUI();
hookForm();

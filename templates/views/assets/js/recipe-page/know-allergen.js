let knownAllergens = []; // a list to store all selected known allergens
let idFoodMapper = new Map();
idFoodMapper.set("grain", "bread");
idFoodMapper.set("vegetable", "carrot");
idFoodMapper.set("dairy", "cheese");
idFoodMapper.set("protein", "beef");
idFoodMapper.set("fruit", "mandarin");
idFoodMapper.set("drink", "juice");
let currentFoodTypeId = ""; // 1 of the 6 type of foods in lunchbox

/**
 * toggle button from in-active to active or the other way around
 * @param id unique identifier
 * @param active current active status
 */
function toggleKnownAllergen(id, active) {
  let selectedBtn = document.getElementById(id);
  let allergen = selectedBtn.innerText;

  let isActive = false;
  if (selectedBtn.className == "icon-box-active") {
    isActive = true;
  }

  if (isActive) {
    selectedBtn.setAttribute("class", "icon-box");
    const index = knownAllergens.indexOf(allergen);
    knownAllergens.splice(index, 1); // remove for array
  } else {
    selectedBtn.setAttribute("class", "icon-box-active");
    knownAllergens.push(allergen); // add to array
  }
}

/**
 * using id to map to food type
 * @param id
 * @returns {any}
 */
function generateFoodType(id) {
  return idFoodMapper.get(id);
}

/**
 * select different type of foods for lunchbox
 * @param id lunchbox item
 * @param selected if the item has been selected
 */
async function selectFood(id) {
  currentFoodTypeId = id;
  let foodName = generateFoodType(id);

  const response = await sendRequest(foodName);
  let foods = response.data;
  showFoodOptions(foods, id);
}

/**
 * send request to get food information
 * @param food
 * @returns {Promise<any>}
 */
async function sendRequest(food) {
  const foodInfoAPI = "https://nutsndairy.me/api/food-info/";
//  const foodInfoAPI = "http://localhost:5000/api/food-info/";
  let tempApi = foodInfoAPI + food;
  console.log(tempApi);
  const response = await fetch(tempApi);
  const data = await response.json();
  return data;
}

// TODO: LUNCHBOX FEATURE
/**
 * show food options for user to select
 * @param foods available foods
 * @param id associate food type in lunchbox, e.g. grain, vegetable etc.
 */
function showFoodOptions(foods, id) {
  // console.log(foods);
  // console.log(id);
  let foodOptionSection = document.getElementById("food-option");

  // console.log(foodOptionSection);
  let foodOptionSectionContainer = foodOptionSection.getElementsByClassName("container").item(0);
  // console.log(foodOptionSectionContainer);
  foodOptionSection.style.display = "flex";

  foodOptionSectionContainer.innerHTML = generateHTMLCode(foods);
}

function generateHTMLCode(foods) {
  // console.log(foods);
  const optionLimit = 9;
  const rowLimit = 3;

  // foods = foods.slice(0, 5);
  // console.log(foods);

  let html = "";
  for (let i = 0; i < optionLimit; i += 3) {
    if (i >= foods.length) {
      break;
    }
    html += generateRow(foods.slice(i, i + 3));
  }

  return html;
}

function generateRow(rowFoods) {
  const optionLimit = 3;
  const hr = `<hr>`;
  const openRowDiv = `<div class="row" style="justify-content: space-evenly">`;
  const openItemDiv = `<div class="col-lg-3 col-md-4 food-item"`;
  const closeArrow = `>`;
  const closeDiv = `</div>`;

  let rowHTML = openRowDiv;
  for (let i = 0; i < optionLimit; i++) {
    if (i >= rowFoods.length) {
      break;
    }
    let tempFood = rowFoods[i];
    // console.log(tempFood);
    // console.log(typeof tempFood);
    rowHTML += openItemDiv + ` id="` + tempFood["Food name"] + `"` + ` onclick="chooseFood(this.id)"` + closeArrow;
    rowHTML += `<h3>` + tempFood["Food name"] + `</h3>`;
    rowHTML += hr;
    rowHTML += `<p>` + tempFood["Description"] + `</p>`;
    rowHTML += closeDiv;
  }

  rowHTML += closeDiv;
  return rowHTML;
}

function chooseFood(id) {
  updateLunchbox(id);
  hideFoodOptions();
}

function updateLunchbox(foodName) {
  // console.log(currentFoodTypeId);
  // console.log(foodName);
  let lunchboxPart = document.getElementById(currentFoodTypeId);
  // console.log(lunchboxPart);
  // let lunchboxPartIcon = lunchboxPart.getElementsByTagName("img")[0];
  // console.log(lunchboxPartIcon);

  let tempHTML = foodName;
  // console.log(tempHTML);
  // tempHTML += lunchboxPartIcon;
  lunchboxPart.innerHTML = tempHTML;
  document.getElementById(currentFoodTypeId).setAttribute("class", "lunchbox-item-selected");
}

function hideFoodOptions() {
  let foodOptionSection = document.getElementById("food-option");
  foodOptionSection.style.display = "none";
}
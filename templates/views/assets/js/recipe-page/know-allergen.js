let knownAllergens = []; // a list to store all selected known allergens
let idFoodMapper = new Map();
idFoodMapper.set("grain", "bread");
idFoodMapper.set("vegetable", "carrot");
idFoodMapper.set("dairy", "cheese");
idFoodMapper.set("protein", "beef");
idFoodMapper.set("fruit", "blueberry");
idFoodMapper.set("drink", "juice");

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
  let foodName = generateFoodType(id);

  const response = await sendRequest(foodName);
  let foods = response.data;
  showFoodOptions(foods);
}

/**
 * send request to get food information
 * @param food
 * @returns {Promise<any>}
 */
async function sendRequest(food) {
  // const foodDataApi = "https://nutsndairy.me/api/food-info";
  const foodDataApi = "http://localhost:5000/api/food-info/";
  let tempApi = foodDataApi + food;
  console.log(tempApi);
  const response = await fetch(tempApi);
  const data = await response.json();
  console.log(data);
  return data;
}

// TODO: LUNCHBOX FEATURE
function showFoodOptions(foods) {
  console.log(foods);
  let foodOptionSection = document.getElementById("food-option");
  foodOptionSection.style.display = "flex";
}

function hideFoodOptions() {
  let foodOptionSection = document.getElementById("food-option");
  foodOptionSection.style.display = "none";
}
let knownAllergens = []; // a list to store all selected known allergens

/**
 * toggle button from in-active to active or the other way around
 * @param id unique identifier
 * @param active current active status
 */
function toggleKnownAllergen(id, active) {
  let selectedBtn = document.getElementById(id);
  let allergen = selectedBtn.innerText;
  console.log(allergen);

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
 * select different type of foods for lunchbox
 * @param id lunchbox item
 * @param selected if the item has been selected
 */
function selectFood(id, selected) {
  console.log(id);
}
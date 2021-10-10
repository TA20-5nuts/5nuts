const selection = "selection";
const selectionActive = "selection-active";
const ids = ['pregnant', 'solid-foods'];

// prevention information data
const preventionMapper = {
  "pregnant": ["./assets/img/prevention-page/pregnant.png", ["For pregnant",
    "Introduce the concept of a balanced diet which includes all the vitamins and minerals need for the mother and the baby.",
    "Take extra care of the mental health too. Research suggests that the state of the brain and the heart affects the child.",
    "Do not exclude any foods which contains high minerals and vitamins.",
    "Include omega intake which include foods like canola oil, soybean oil, salmon, seafood items."]],
  "breastfeeding": ["./assets/img/prevention-page/infants-breastfeeding.png", ["For infant - breastfeeding",
    "Breastfeed the child for at least 6 months",
    "If breastfeeding is not possible, a standard cow's milk-based formula can be an alternative.",
    "Mammal derived milks, soy milk, nut and cereal beverages are better not be use for the main source of milk for infant before 12 months."]],
  "solid-foods": ["./assets/img/prevention-page/infants-solid_foods.png", ["For infant - solid foods",
    "Should be introduced after four months.",
    "Do not introduce seafood items to the baby early on as it might lead to a serious case of food allergy or food poisoning.",
    "Introduce foods according to what the family usually eats",
    "Common food allergens should be introduced in around 12 months and in an age-appropriate form.",
    "Only introduce one common food allergen in once.",
    "Avoid food allergens that the parents already know about the newborn child.",
    "If dairy products or soy are tolerated, they can be cooked with other foods.",
    "Smear food on the skin can not help to identify possible food allergies."]]
};

/**
 * switch active tab
 * @param id
 */
function switchActive(id) {
  for (let tempId of ids) {
    let el = document.getElementById(tempId);
    if (tempId === id) {
      el.setAttribute("class", selectionActive);
      disableOnClick(el);
    } else {
      el.setAttribute("class", selection);
      enableOnClick(el);
    }
  }
}

/**
 * disable click event
 * @param el
 */
function disableOnClick(el) {
  el.setAttribute("onclick", "");
}

/**
 * enable click event
 * @param el
 */
function enableOnClick(el) {
  el.setAttribute("onclick", "switchPrevention(this.id)");
}

/**
 * switch prevention information after click event
 * @param id
 */
function switchPrevention(id) {
  replaceImg(id);
  replaceText(id);
  switchActive(id);
}

/**
 * replace image
 * @param id
 */
function replaceImg(id) {
  const targetImgId = "prevention-img";
  let img = document.createElement('img');
  img.src = preventionMapper[id][0];
  img.setAttribute("style", "width: 100%");

  let imgSection = document.getElementById(targetImgId);
  imgSection.innerHTML = "";

  imgSection.appendChild(img);
}

/**
 * replace text
 * @param id
 */
function replaceText(id) {
  const targetTextId = "prevention-text";
  let texts = preventionMapper[id][1];
  let mainText = texts.slice(1);

  let h4 = document.createElement("h4");
  h4.innerText = preventionMapper[id][1][0];

  let div = document.createElement("div");
  div.appendChild(h4);
  let ol = document.createElement("ol");

  for (let text of mainText) { // for loop to create ordered list item
    let li = document.createElement("li");
    let h5 = document.createElement("h5");
    h5.innerText = text;
    li.appendChild(h5);
    ol.appendChild(li);
  }
  div.appendChild(ol);

  let textSection = document.getElementById(targetTextId);
  textSection.innerHTML = ""; // clear text secton
  textSection.appendChild(div);
}
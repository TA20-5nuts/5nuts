/**
 * toggle button from in-active to active or the other way around
 * @param id unique identifier
 * @param active current active status
 */
function toggleKnownAllergen(id, active) {
  let selectedBtn = document.getElementById(id);

  let isActive = false;
  if (selectedBtn.className == "icon-box-active") {
    isActive = true;
  }

  if (isActive) {
    selectedBtn.setAttribute("class", "icon-box");
  } else {
    selectedBtn.setAttribute("class", "icon-box-active");
  }
}
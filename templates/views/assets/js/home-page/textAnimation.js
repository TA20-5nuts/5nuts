const text = [
  "BE SAFE | BE HEALTHY",
  "It’s not only your Child. Don’t blame them or their genetics.",
  "Your genetics is not your destiny - George M. Church",
  "Your genetics load the gun. Your lifestyle pulls the trigger - Mehmet Oz"];
const animationInterval = 100;

let currentText = text[0];
let displayText = "";
let charIndex = 0;
let deleting = false;

function getNextIndex(currentText) {
  let index = text.indexOf(currentText);
  index = index + 1;
  if (index === text.length) {
    return 0;
  }
  return index;
}

function calTypingText(tempText) {
  if (!deleting) {
    if (charIndex < tempText.length) {
      return tempText.slice(0, charIndex++);
    } else {
      deleting = !deleting;
      return currentText;
    }
  } else {
    if (charIndex > 0) {
      return tempText.slice(0, charIndex--);
    } else {
      deleting = !deleting;
      let nextIndex = getNextIndex(currentText);
      currentText = text[nextIndex];
      return "";
    }
  }
}

function updateDisplay(displayStr) {
  let displaySection = document.getElementById("slogan-animation");

  setInterval(() => {
    displayText = calTypingText(currentText);
    displaySection.innerHTML = displayText;
  }, animationInterval);
}

updateDisplay(currentText)

function initAns() {
  let answer = new Map();
  answer.set("q1", "false");
  answer.set("q2", "true");
  answer.set("q3", "false");
  answer.set("q4", "a");
  answer.set("q5", "true");
  answer.set("q6", "c");
  answer.set("q7", "d");
  return answer;
}

function getInputNameSet() {
  let inputs = document.getElementsByTagName("input");

  let inputNameSet = new Set();
  for (let i of inputs) {
    inputNameSet.add(i.name);
  }
  return inputNameSet;
}

function getSelected() {
  let inputNameSet = getInputNameSet();

  let userAnsMap = new Map();
  for (let tempName of inputNameSet) {
    let tempInput = document.getElementsByName(tempName);
    // console.log(tempInput);
    if (!checkRequired(tempInput)) { // check all questions are answered
      alert("Please answer all questions!");
      return;
    }

    for (let i = 0; i < tempInput.length; i++) {
      if (tempInput[i].checked) {
        userAnsMap.set(tempName, tempInput[i].value);
        break;
      }
    }
  }

  // check answer
  let totalCount = userAnsMap.size;
  console.log(userAnsMap.size);
  let correctCount = checkAnswer(userAnsMap);

  // display score
  displayScore(correctCount);

  document.getElementById("submit").disabled = true;
  document.getElementById("reset").disabled = false;
}

function resetQuiz() {
  let inputNameSet = getInputNameSet();
  for (let tempName of inputNameSet) {
    let tempInput = document.getElementsByName(tempName);
    for (let i of tempInput) {
      i.checked = false;
    }
  }

  displayScore(0);
  document.getElementById("submit").disabled = false;
  document.getElementById("reset").disabled = true;
}

/**
 * change display score
 * @param score score result from users
 */
function displayScore(score) {
  let scoreSection = document.getElementById("score");
  let userScore = document.getElementById("userScore");
  userScore.innerText = score;
}

/**
 * check user's ansswer
 * @param options user's answer
 * @returns {number} correct number
 */
function checkAnswer(options) {
  let answer = initAns();
  let correctAns = 0;

  for (let o of options) {
    let userOptionKey = o[0];
    let userOption = o[1];

    if (answer.get(userOptionKey) === userOption) {
      correctAns++;
    }
  }

  return correctAns;
}

/**
 * check if required filed are selected/input
 * @param inputGroup
 * @returns {boolean}
 */
function checkRequired(inputGroup) {
  for (let val of inputGroup) {
    if (val.checked) {
      return true;
    }
  }
  return false;
}
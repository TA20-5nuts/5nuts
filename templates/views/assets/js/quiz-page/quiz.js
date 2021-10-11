/**
 * get all questions of the page
 * @returns {HTMLCollectionOf<Element>}
 */
function getAllQuestions() {
  return document.getElementsByClassName("question");
}

/**
 * get all explanation of the page
 * @returns {HTMLCollectionOf<Element>}
 */
function getAllExplanations() {
  return document.getElementsByClassName("explanation");
}

/**
 * initial page
 */
function initPage() {
  let questions = getAllQuestions();
  let explanations = getAllExplanations();

  for (let q of questions) {
    q.setAttribute("class", "col-lg-12 question");
    q.getElementsByClassName("content")[0].setAttribute("class", "content");
  }

  for (let e of explanations) {
    e.style.display = "none";
  }
}

/**
 * initial answers
 * @returns {Map<any, any>} map with question number as key, answer as value
 */
function initAns() {
  let answer = new Map();
  answer.set("q1", "true");
  answer.set("q2", "false");
  answer.set("q3", "false");
  answer.set("q4", "a");
  answer.set("q5", "true");
  answer.set("q6", "true");
  answer.set("q7", "d");
  answer.set("q8", "false");
  answer.set("q9", "true");
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

function checkQuiz() {
  let inputNameSet = getInputNameSet();

  let userAnsMap = new Map();
  for (let tempName of inputNameSet) {
    let tempInput = document.getElementsByName(tempName);
    if (!checkRequired(tempInput)) { // check all questions are answered
      alert("Please answer all questions!");
      return;
    }

    for (let i = 0; i < tempInput.length; i++) {
      if (tempInput[i].checked) { // get user's answer
        userAnsMap.set(tempName, tempInput[i].value);
        break;
      }
    }
  }

  // show explanation
  showExplanation(userAnsMap);

  // check answer
  let totalCount = userAnsMap.size;
  // console.log(userAnsMap.size);
  let correctCount = 0;
  for (let ans of userAnsMap) {
    if (checkAnswer(ans)) {
      correctCount++;
    }
  }

  // disable all radio button
  toggleRadioButtonActive(true);

  // display score
  displayScore(correctCount);
  toggleButtonStatus(true);
}

/**
 * reset quiz form
 */
function resetQuiz() {
  let inputNameSet = getInputNameSet();
  for (let tempName of inputNameSet) {
    let tempInput = document.getElementsByName(tempName);
    for (let i of tempInput) {
      i.checked = false;
    }
  }

  // reset question part
  initPage();

  displayScore(0);
  toggleButtonStatus(false);

  // enable all radio buttons
  toggleRadioButtonActive(false);
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

/**
 * toggle button status according to submit and reset is clicked
 * @param toSubmit turn submit to disabled and reset to enabled if true, other round otherwise
 */
function toggleButtonStatus(toSubmit) {
  let submitBtn = document.getElementById("submit");
  let resetBtn = document.getElementById("reset");
  const enabledClass = "btn btn-success";
  const disabledClass = "btn btn-secondary";

  if (toSubmit) {
    submitBtn.disabled = true;
    submitBtn.setAttribute("class", disabledClass);

    resetBtn.disabled = false;
    resetBtn.setAttribute("class", enabledClass);
  } else {
    submitBtn.disabled = false;
    submitBtn.setAttribute("class", enabledClass);

    resetBtn.disabled = true;
    resetBtn.setAttribute("class", disabledClass);
  }
}

/**
 * show explanation
 * @param userAns
 */
function showExplanation(userAns) {
  let answer = initAns();
  let questions = getAllQuestions();
  let explanations = getAllExplanations();

  const questionClass = "col-lg-6 question";
  const questionClassWrongAns = "content wrong-ans";
  const questionClassCorrectAns = "content";

  let index = 0;
  for (let ans of userAns) {
    questions[index].setAttribute("class", questionClass);
    if (!checkAnswer(ans)) {
      questions[index].getElementsByClassName("content")[0].setAttribute("class", questionClassWrongAns);
      explanations[index].getElementsByClassName("content")[0].setAttribute("class", questionClassWrongAns);
    } else {
      questions[index].getElementsByClassName("content")[0].setAttribute("class", questionClassCorrectAns);
      explanations[index].getElementsByClassName("content")[0].setAttribute("class", questionClassCorrectAns);
    }
    explanations[index].style.display = "";
    index++;
  }
}

/**
 * check if answer is correct
 * @param option answer for a question
 * @returns {boolean} true if correct, false otherwise
 */
function checkAnswer(option) {
  let answer = initAns();
  let key = option[0];
  let value = option[1];

  return answer.get(key) === value;
}

/**
 * disalbe radio button
 * @param submitting true if user is submitting form, false if reset is clicked
 */
function toggleRadioButtonActive(submitting) {
  let radios = document.getElementsByTagName("input");
  for (let r of radios) {
    if (r.type === "radio") {
      if (submitting) {
        r.disabled = true;
      } else {
        r.disabled = false;
      }
    }
  }
}
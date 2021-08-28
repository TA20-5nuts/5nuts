function openQuiz() {
  clearAns();
  let quiz = document.getElementById("modalQuiz");
  quiz.style.display = "block";
}

function closeQuiz() {
  let quiz = document.getElementById("modalQuiz");
  quiz.style.display = "none";
}

function checkResult() {
  let q4Ans = document.getElementsByName("q4");
  for (let i = 0; i < q4Ans.length; i++) {
    if (i === 0 && q4Ans[i].checked) {
      window.location.replace("/resources");
      return;
    }
  }
  let quiz = document.getElementById("modalQuiz");
  quiz.style.display = "none";
}

function clearAns() {
  let q1Ans = document.getElementsByName("q1");
  let q2Ans = document.getElementsByName("q2");
  let q3Ans = document.getElementsByName("q3");
  let q4Ans = document.getElementsByName("q4");

  let list = [q1Ans, q2Ans, q3Ans, q4Ans];
  for (let li of list) {
    for (let l of li) {
      l.checked = false;
    }
  }
}
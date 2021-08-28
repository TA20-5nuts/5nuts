function openQuiz() {
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
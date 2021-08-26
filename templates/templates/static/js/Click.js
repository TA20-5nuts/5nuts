function sendTestRequest() {
  fetch("http://127.0.0.1:5000/test")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // document.getElementById("response").innerHTML = data; // when previous return res.text();
      document.getElementById("response").innerHTML = data.result; // when previous return res.json();
      console.log(data);
    })
    .catch((err) => console.log(err));
}

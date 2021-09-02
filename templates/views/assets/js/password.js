function verify() {
  let password;
  let referrer = document.referrer;

  if (referrer === "") {
    do {
      password = prompt("Please enter password");
    } while (password != "admin123");
  }
}

verify();
function verify() {
  let password;
  do {
    password = prompt("Please enter password");
  } while (password != "admin123");
}

verify();
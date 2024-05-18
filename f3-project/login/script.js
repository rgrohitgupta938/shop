document.addEventListener("DOMContentLoaded", () => {
  const login = document.getElementById("sub-log");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const error = document.getElementById("error");

  login.addEventListener("submit", (e) => {
    e.preventDefault();
    if (email.value === "" || password.value === "") {
      error.textContent = "Please enter all required fields!";
      error.style.display = "block";
    } else if (password.value.length < 8) {
      error.textContent = "Password should have atleast 8 characters!";
      error.style.display = "block";
    } else {
      error.style.display = "none";
      let users = JSON.parse(localStorage.getItem("users"));
      console.log(users);
      let st = users.findIndex(
        (u) => u.email.toLowerCase() === email.value.toLowerCase()
      );
      if (st >= 0 && users[st].password === password.value) {
        let user = users[st];
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "../shop/index.html";
      } else {
        error.textContent = "Incorrect Email or Password!";
        error.style.display = "block";
      }
    }
  });
});

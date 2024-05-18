document.addEventListener("DOMContentLoaded", () => {
  const fName = document.getElementById("fName");
  const lName = document.getElementById("lName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password1 = document.getElementById("password1");
  const signUp = document.getElementById("sign-log");
  const error = document.getElementById("error");

  signUp.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(fName.value);
    if (
      fName.value === "" ||
      lName.value === "" ||
      email.value === "" ||
      password.value === "" ||
      password1.value === ""
    ) {
      console.log("first");
      error.style.display = "block";
    } else if (password.value.length < 8) {
      error.textContent = "Password should have atleast 8 characters!";
      error.style.display = "block";
    } else if (password.value === password1.value) {
      console.log("mid");
      error.style.display = "none";
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      console.log(users);
      let user = {
        fName: fName.value,
        lName: lName.value,
        password: password.value,
        email: email.value,
      };
      console.log(user);
      let st = users.findIndex(
        (u) => u.email.toLowerCase() === user.email.toLowerCase()
      );
      console.log(st);
      if (st === -1) {
        users.push(user);
        fName.value = "";
        lName.value = "";
        password.value = "";
        password1.value = "";
        email.value = "";
        console.log(users);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "../shop/index.html";
      } else {
        error.textContent = "Email already Exits!";
        error.style.display = "block";
      }
    } else {
      error.textContent =
        "Please make sure password and confrim password are equal!";
      error.style.display = "block";
    }
  });
});

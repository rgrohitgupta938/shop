document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  if (Object.keys(user).length === 0) {
    window.location.href = "../login/index.html";
  }
  let users = JSON.parse(localStorage.getItem("users"));
  let st = users.findIndex(
    (i) => i.email.toLowerCase() === user.email.toLowerCase()
  );
  let temp = st >= 0 ? (users[st] = user) : {};
  console.log(user);
  const form = document.getElementById("profile-form");
  const fName = document.getElementById("fName");
  const lName = document.getElementById("lName");
  const oldPassword = document.getElementById("password");
  const newPassword = document.getElementById("password1");
  const confirmPassword = document.getElementById("password2");

  fName.value = user.fName;
  lName.value = user.lName;

  function updateUser() {
    if (fName.value !== "" || lName.value !== "") {
      user = {
        ...user,
        fName:
          fName.value.toLowerCase() === user.fName.toLowerCase()
            ? user.fName
            : fName.value,
        lName:
          lName.value.toLowerCase() === user.lName.toLowerCase()
            ? user.lName
            : lName.value,
      };
      let temp1 = st >= 0 ? (users[st] = user) : {};
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User information updated successfully.", user, users);
    }
  }

  function changePassword() {
    if (
      oldPassword.value === user.password &&
      newPassword.value === confirmPassword.value
    ) {
      user.password = newPassword.value;
      users[st].password = newPassword.value;
      console.log(users[st]);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Password changed successfully.");
    } else {
      console.log(confirmPassword.value, newPassword.value, oldPassword.value);
      console.log("Old password incorrect or new passwords do not match.");
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateUser();
  });

  document.getElementById("change-password").addEventListener("click", (e) => {
    e.preventDefault();
    changePassword();
  });

  document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "../logout/index.html";
  });
});

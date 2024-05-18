document.addEventListener("DOMContentLoaded", () => {
  const listHome = document.getElementById("list-home");
  const btnGrp = document.querySelector(".btngrp");
  console.log(btnGrp);
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  if (Object.keys(user).length !== 0) {
    let str = `<li><a href="../f3-project/index.html">Home</a></li><li><a href="../f3-project/shop/index.html">Shop</a></li>
    <li><a href="../f3-project/profile/index.html">Profile</a></li><li><a href="../f3-project/cart/index.html">My Cart</a></li><li><a href="../f3-project/logout/index.html">Log Out</a></li>`;
    listHome.innerHTML = str;
    btnGrp.innerHTML = "";
  } else {
    let str = `<li><a href="../f3-project/index.html">Home</a></li>
    <li><a href="../f3-project/login/index.html">Login</a></li>
    <li><a href="../f3-project/signup/index.html">Signup</a></li>`;
    listHome.innerHTML = str;
    let str1 = `<button id="login">Login</button>
    <button id="signup">Sign Up</button>`;
    btnGrp.innerHTML = str1;
  }

  document.getElementById("login").onclick = () => {
    console.log("hello");
    window.location.href = "../f3-project/login/index.html";
  };

  document.getElementById("signup").onclick = () => {
    window.location.href = "../f3-project/signup/index.html";
  };
});

document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  if (Object.keys(user).length === 0) {
    window.location.href = "../login/index.html";
  }
  if (cart.length === 0) {
    left.innerHTML = `<h2 class="error">No Item added</h2>`;
    right.style.display = "none";
    left.style.width = "100%";
  } else {
    getProducts();
  }
});
let data = [];
const left = document.getElementById("left");
const right = document.getElementById("right");
const checkout = document.getElementById("checkout");
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
async function getProducts() {
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    data = await res.json();
    console.log(data);
    displayMenu();
  } catch (error) {
    console.log(error);
  }
}
function displayMenu() {
  let prod = cart.map((c) => {
    let pr = data.find((d) => d.id === c.id);
    return {
      ...pr,
      qty: c.qty,
    };
  });
  console.log(prod);
  let str = `${prod.map(
    (p) => `<div class="item"><img src=${p.image} />
    <p>Title : ${p.title.split(" ").slice(0, 3).join(" ")}</p>
    <p>Price : $${p.price}</p>
    <button id="remove">Remove From Cart</button>
    </div>`
  )}`;
  console.log(str);
  let str1 = `<h1>Checkout List</h1>${prod.map(
    (p, inx) =>
      `<div class="pr"><span>${inx + 1}. ${p.title
        .split(" ")
        .slice(0, 3)
        .join(" ")}*${p.qty}</span><span>$${p.qty * p.price}</span></div>`
  )}<div class="total pr"><span>Total</span><span>$${prod
    .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
    .toFixed(
      2
    )}</span></div><div class="btn"><button id="check">Click To Checkout</button></div>`;
  left.innerHTML = str;
  checkout.innerHTML = str1;
  checkout.addEventListener("click", (e) => {
    if (e.target.id === "check") {
      console.log("clicked");
      window.location.href = "../razorpay/index.html";
    }
  });
}

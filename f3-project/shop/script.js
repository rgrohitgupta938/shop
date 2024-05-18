document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInfo = document.getElementById("user-info");
  if (Object.keys(user).length !== 0) {
    userInfo.textContent = `Welcome, ${user.fName ? user.fName : "Guest"} ${
      user.lName ? user.lName : ""
    }`;
  } else {
    window.location.href = "../login/index.html";
  }
  getProducts();

  // Add event listeners for filters
  document.querySelectorAll(".filter").forEach((filter, index) => {
    filter.addEventListener("click", () => displayMenu(index));
  });

  document.getElementById("search").addEventListener("input", applyFilters);
  document.querySelectorAll('input[name="color"]').forEach((input) => {
    input.addEventListener("change", applyFilters);
  });
  document.querySelectorAll('input[name="size"]').forEach((input) => {
    input.addEventListener("change", applyFilters);
  });
  document.getElementById("rating").addEventListener("input", applyFilters);
  document.querySelectorAll('input[name="price"]').forEach((input) => {
    input.addEventListener("change", applyFilters);
  });
});

let data = [];
let category = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];
const sizes = ["s", "m", "l", "xl"];
const colors = ["red", "blue", "black", "green"];

async function getProducts() {
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    data = await res.json();
    data = data.map((product) => ({
      ...product,
      colors: getRandomColors(),
      sizes: getRandomSizes(),
    }));
    displayMenu(0);
  } catch (error) {
    console.log(error);
  }
}

function getRandomColors() {
  let randomColors = [];
  let colorCount = Math.floor(Math.random() * colors.length) + 1;
  while (randomColors.length < colorCount) {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (!randomColors.includes(randomColor)) {
      randomColors.push(randomColor);
    }
  }
  return randomColors;
}

function getRandomSizes() {
  let randomSizes = [];
  let sizeCount = Math.floor(Math.random() * sizes.length) + 1;
  while (randomSizes.length < sizeCount) {
    let randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    if (!randomSizes.includes(randomSize)) {
      randomSizes.push(randomSize);
    }
  }
  return randomSizes;
}

function applyFilters() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const selectedColors = Array.from(
    document.querySelectorAll('input[name="color"]:checked')
  ).map((input) => input.id);
  const selectedSizes = Array.from(
    document.querySelectorAll('input[name="size"]:checked')
  ).map((input) => input.id);
  const selectedRating = document.getElementById("rating").value;
  const selectedPrices = Array.from(
    document.querySelectorAll('input[name="price"]:checked')
  ).map((input) => input.id);

  let filteredData = data.filter((product) => {
    // Filter by search query
    if (!product.title.toLowerCase().includes(searchQuery)) return false;

    // Filter by color
    if (
      selectedColors.length &&
      !selectedColors.some((color) => product.colors.includes(color))
    )
      return false;

    // Filter by size
    if (
      selectedSizes.length &&
      !selectedSizes.some((size) => product.sizes.includes(size))
    )
      return false;

    // Filter by rating
    if (product.rating.rate < selectedRating) return false;

    // Filter by price
    if (selectedPrices.length) {
      const productPrice = product.price;
      const priceRanges = {
        "0-25": productPrice >= 0 && productPrice <= 25,
        "25-50": productPrice > 25 && productPrice <= 50,
        "50-100": productPrice > 50 && productPrice <= 100,
        "100on": productPrice > 100,
      };
      if (!selectedPrices.some((priceRange) => priceRanges[priceRange]))
        return false;
    }

    return true;
  });


  let activeFilterIndex = -1;
  document.querySelectorAll(".filter").forEach((filter, index) => {
    if (filter.classList.contains("active")) {
      activeFilterIndex = index;
    }
  });

  displaySec(activeFilterIndex, filteredData);
}

function displayMenu(i = 0) {
  document
    .querySelectorAll(".filter")
    .forEach((filter) => filter.classList.remove("active"));
  document.querySelectorAll(".filter")[i].classList.add("active");

  let filteredData;
  if (i === 0) {
    filteredData = data;
  } else {
    filteredData = data.filter(
      (item) => item.category.toLowerCase() === category[i - 1]
    );
  }
  displaySec(i, filteredData);
}

function displaySec(i, filData) {
  let products = document.getElementById("products");
  let categoryTitle = i > 0 ? category[i - 1] : "All Products";

  let str = `<div class="items"><h1 class="capt">${categoryTitle}</h1><div class="f-row">${filData
    .map(
      (p) => `
      <div class="item">
        <img src=${p.image} alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">$${p.price}</div>
            <div class="sized">${p.sizes.join(", ")}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              ${p.colors
                .map(
                  (color) =>
                    `<div class="circle" style="background-color: ${color}"></div>`
                )
                .join("")}
            </div>
          </div>
          <div class="row">Rating: ${p.rating.rate}</div>
        </div>
        <button id="addBtn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `
    )
    .join("")}</div></div>`;

  products.innerHTML = str;
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let index = cart.findIndex((item) => item.id === id);
  if (index >= 0) {
    cart[index].qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

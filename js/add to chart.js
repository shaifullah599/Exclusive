let totalAmount = 0;
let cartArray = [];
let items = [
  {
    id: "1",
    name: "GYM EQUIPMENT",
    arrival: "Thursday, Feb. 11",
    price: 10000,
    image:
      "../img/slid_2.png"
  },
  {
    id: "2",
    name:
      "GYM EQUIPMENT",
    arrival: "Friday, Feb. 12",
    price: 10000,
    image:
      "../img/slid_2.png"
  },
  {
    id: "3",
    name:
      "GYM EQUIPMENT",
    arrival: "Thursday, Feb. 11",
    price: 1000,
    image:
      "../img/slid_2.png"
  }
];

items.map(function (item) {
  cartArray.push(item);
});

function shoppingCart() {
  totalAmount = 0;
  document.querySelector(".total-amount").classList.remove("updated-amount");
  document.querySelector(".total-amount span").textContent = "0";
  document.querySelector(".cart-count").textContent = 0;
  document.querySelector(".disappear ul").innerHTML = "";
  if (cartArray.length > 0) {
    document.querySelector(".checkout").classList.remove("disabled");
    cartArray.map(function (item, idx) {
      document.querySelector(".disappear ul").innerHTML += ` <li>
                <div class="item">
                <input type="hidden" value="${item.id}" id="itemId">
                    <a href="#" title="${item.name}"><img alt="${item.name}" src="${item.image}" /></a>
                    <div class="item-details"><span class="item-name"><a href="#">${item.name}</a></span>
                    <span class="arrival">Arrives: ${item.arrival}</span>
                    <span class="price">TK ${item.price}</span></div>
                    <button class="delete" id=${item.id} onClick="deletePrompt(this)" title="Remove item">&times;</button>
                </div>
            </li>`;
      document.querySelector(".cart-count").textContent = cartArray.length;
      totalAmount += item.price;
      document.querySelector(".total-amount").classList.add("updated-amount");
      document.querySelector(".total-amount span").textContent = totalAmount;
    });
  } else {
    document.querySelector(".total-amount").classList.add("updated-amount");
    document.querySelector(".checkout").classList.add("disabled");
    document.querySelector(
      ".disappear ul"
    ).innerHTML += `<li><div class="item empty-cart"><p>Your cart is empty.</p></div></li>`;
  }
}

shoppingCart();
function deletePrompt(e) {
  e.closest("li").classList.add("selected");
  e.closest("li").innerHTML += `<div class="prompt">
            <div class="prompt-inner">
            <p>Are you sure to delete ?</p>
            <div class="prompt-btn">
            <button class="prompt-yes" onClick="promptYes(this)">Yes</button>
            <button class="prompt-no" onClick="promptNo(this)">No</button>
            </div>
            </div>
            </div>`;
}

function promptYes(e) {
  let id = e.closest("li.selected").querySelector("#itemId").value;
  for (var i = 0; i < cartArray.length; i++)
    if (cartArray[i].id === id) {
      cartArray.splice(i, 1);
      break;
    }

  document.querySelector("li.selected").classList.add("deleted");
  setTimeout(function () {
    shoppingCart();
  }, 500);
}

function promptNo(e) {
  document.querySelector("li.selected").classList.add("cancelled");
  e.closest(".prompt").remove();
  shoppingCart();
}

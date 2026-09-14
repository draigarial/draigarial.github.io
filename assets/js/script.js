var price = Number(document.getElementById("itemPrice").textContent);
var stock = parseInt(document.getElementById("itemStock").textContent);
document.querySelector("#itemQuantity").max = stock // Sets the input box "max" attribute

function updatePrice(){ // Updates the price, multiplying it by the #itemQuantity input box content
  var inputBox = parseInt(document.querySelector("#itemQuantity").value);
  document.getElementById("totalPrice").textContent = price * inputBox;
}

function changeQuantity(amount){ // Changes #itemQuantity by the argument value, can't go below 0 or over stock amount
  var inputBox = parseInt(document.querySelector("#itemQuantity").value);
  var result = inputBox += amount;
  if (result <= 0) {
    result = 0;
    document.getElementById("submitPurchase").classList.add("disabled");
  } else if (result > stock) {
    result = stock;
  }
  if (result > 0) {
    document.getElementById("submitPurchase").classList.remove("disabled");
  }
  
  document.querySelector("#itemQuantity").value = result;
  updatePrice();
}

function processSale(){ // Substracts stock amount by #itemQuantity purchased, and set the #itemQuantity to 0 and its max to the current stock, if stock is 0, delete the buying options
  alert("You've bought " + String(document.querySelector("#itemQuantity").value) + " " + String(document.getElementById("itemName").textContent) + " for " + String(document.getElementById("totalPrice").textContent) + "!");
  document.getElementById("itemStock").textContent = stock - parseInt(document.querySelector("#itemQuantity").value);
  stock = parseInt(document.getElementById("itemStock").textContent);
  document.querySelector("#itemQuantity").max = stock
  changeQuantity(-parseInt(document.querySelector("#itemQuantity").value));
  if (stock == 0) {
    document.getElementById("stockAvailable").replaceChildren();
    document.getElementById("itemStock").textContent = "Out of stock";
  }
}

const ul = document.getElementById("myList");
function say_hi(){
  alert("Hiiiiii! ≧◡≦");
  const li = document.createElement("li");
  li.textContent = "MEOW";
  ul.appendChild(li);
  if (stock == 0) {
    li.textContent = "MEOOOOOOOOOOOOOOOOW";
  ul.appendChild(li);
  }
}
(function () {
  "use strict";

  // ========== Variables (Figma fishing man — home page only) ==========
  var variables = {
    title: "Fishing man",
    welcomeTitle: "Welcome Home",
    bioText: "At Ilana's kitchen, every cookie is made from natural ingredients and baked fresh with care. Real butter, fine chocolate, and recipes passed down with love just like home. You're welcome to place an order, stop by for pickup, or pre-order ahead for something special."
  };

  var homeCookies = [
    { id: "c1", name: "Chocolate Chip", price: 1.2 },
    { id: "c2", name: "Classic Butter", price: 1 },
    { id: "c3", name: "Oatmeal Raisin", price: 1.1 },
    { id: "c4", name: "Almond Cookies", price: 1.3 }
  ];

  var homeCakes = [
    { id: "k1", name: "Cinnamon Roll", price: 2.5 },
    { id: "k2", name: "Lemon Sugar", price: 2 },
    { id: "k3", name: "Double Chocolate", price: 2.8 }
  ];

  var homeCookiesRow = document.getElementById("homeCookiesRow");
  var homeCakesRow = document.getElementById("homeCakesRow");

  function renderHomeCards() {
    if (homeCookiesRow) {
      homeCookiesRow.innerHTML = homeCookies.map(function (p) {
        return (
          "<div class=\"card-preview\">" +
            "<strong>" + p.name + "</strong><br>" + p.price.toFixed(2) + " $" +
          "</div>"
        );
      }).join("");
    }
    if (homeCakesRow) {
      homeCakesRow.innerHTML = homeCakes.map(function (p) {
        return (
          "<div class=\"card-preview\">" +
            "<strong>" + p.name + "</strong><br>" + p.price.toFixed(2) + " $" +
          "</div>"
        );
      }).join("");
    }
  }

  renderHomeCards();
})();

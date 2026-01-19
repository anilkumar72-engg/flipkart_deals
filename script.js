let allProducts = [];

const csvURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpMZKp59kCtkcX_wRQK9IHtBhMc8iR3cLdJ0Q5eLxY0Vbps0J-8d1XnuAxUkGTtuZhPHq7oz9HZ_JS/pub?gid=47514979&single=true&output=csv";

Papa.parse(csvURL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    allProducts = results.data;
    renderProducts(allProducts);
  }
});

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(item => {
    if (!item.name || !item.link) return;

    container.innerHTML += `
      <div class="product-card">
        <img src="${item.image}" alt="${item.name}">
        <h2>${item.name}</h2>

        <p class="price">
          ₹${item.price}
          <span>₹${item.oldPrice}</span>
        </p>

        <p class="discount">${item.discount} OFF</p>

        <a href="${item.link}" target="_blank" class="buy-btn">
          Check Deal on Flipkart
        </a>
      </div>
    `;
  });
}

function filterCategory(category) {
  if (category === "All") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(
      p => p.category === category
    );
    renderProducts(filtered);
  }
}

function searchProducts(keyword) {
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );
  renderProducts(filtered);
}

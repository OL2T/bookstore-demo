// function renderProductList() {
//   let storedProducts = localStorage.getItem("List-products")
// 	 ? JSON.parse(localStorage.getItem("List-products"))
// 	 : [];
//   const literatureProductList = document
// 	 .getElementById("literature-product-list")
// 	 .querySelector(".view-content-wrapper");
//   const childrenBookProductList = document
// 	 .getElementById("children-book-product-list")
// 	 .querySelector(".view-content-wrapper");
//   const textbookProductList = document
// 	 .getElementById("textbook-product-list")
// 	 .querySelector(".view-content-wrapper");
//   const foreignLanguageBookProductList = document
// 	 .getElementById("foreign-language-book-product-list")
// 	 .querySelector(".view-content-wrapper");
//   const formatVND = new Intl.NumberFormat("vi-VN", {
// 	 style: "currency",
// 	 currency: "VND",
//   });

//   storedProducts.forEach((productArray) => {
// 	 const productDiv = document.createElement("div");
// 	 productDiv.classList.add("views-row");
// 	 const renderMarkup = (productDiv.innerHTML = `
// 	 <div class="view-row-content">
// 		<div class="view-field-image">
// 			<a href="#"><img src="${productArray.img}" alt="${productArray.name}"></a>
// 			<div class="product-buttons">
// 				<div class="action quick-view">
// 				  <span class="tool-tip">Xem nhanh</span>
// 				  <button class="btn-action btn-quick-view"></button>
// 				</div>
// 				<div class="action add-to-cart">
// 				  <span class="tool-tip">Thêm vào giỏ hàng</span>
// 				  <button class="btn-action btn-add-to-cart" onclick="addTocCart(${
// 		productArray.productId
// 	 })"></button>
// 				</div>
//   			</div>
// 		</div>
// 		<div class="content-wrapper">
// 		  <div class="view-field-category"><span>${productArray.categories}</span></div>
// 		  <div class="view-field-title"><a href="#">${productArray.name}</a></div>
// 		  <div class="view-field-author"><span>Tác giả: </span><span class="author-title">${
// 		productArray.author
// 	 }</span></div>
// 		  <div class="view-field-price"><p>${formatVND.format(
// 		productArray.price
// 	 )}</p></div>
// 		</div>
//     </div>`);

// 	 if (productArray.categories === "Văn học") {
// 		literatureProductList.appendChild(productDiv);
// 	 } else if (productArray.categories === "Thiếu nhi") {
// 		childrenBookProductList.appendChild(productDiv);
// 	 } else if (productArray.categories === "Sách giáo khoa") {
// 		textbookProductList.appendChild(productDiv);
// 	 } else if (productArray.categories === "Sách ngoại ngữ") {
// 		foreignLanguageBookProductList.appendChild(productDiv);
// 	 }
//   });
// }

// function saveToCartLocalStorage() {
//   localStorage.setItem('Carts', JSON.stringify(productInCart));
// }

function addTocCart(productId) {
  let storedProducts = localStorage.getItem("List-products")
	 ? JSON.parse(localStorage.getItem("List-products"))
	 : [];
  let productInCart = localStorage.getItem("Carts")
	 ? JSON.parse(localStorage.getItem("Carts"))
	 : [];
  let checkProduct = productInCart.some(
	 (value) => value.productId === productId
  );
  // console.log(checkProduct)
  if (!checkProduct) {
	 // console.log(checkProduct)
	 let product = storedProducts.find((value) => value.productId === productId);
	 productInCart.unshift({
		...product,
		quantity: 1,
	 });
	 //  lưu lại vào local storage
	 localStorage.setItem("Carts", JSON.stringify(productInCart));
	 calculatorQuantity();
  } else {
	 let getIndex = productInCart.findIndex(
		(value) => value.productId === productId
	 );
	 let product = productInCart.find((value) => value.productId === productId);
	 productInCart[getIndex] = {
		...product,
		quantity: ++product.quantity,
	 };
	 // console.log(getIndex)
	 localStorage.setItem("Carts", JSON.stringify(productInCart));
	 calculatorQuantity();
  }
}

function calculatorQuantity() {
  let productInCart = localStorage.getItem("Carts")
	 ? JSON.parse(localStorage.getItem("Carts"))
	 : [];
  document.querySelector(".block-cart .quantity").innerHTML =
	 productInCart.length;
}

function renderProductToCart() {
  let productInCart = localStorage.getItem("Carts")
	 ? JSON.parse(localStorage.getItem("Carts"))
	 : [];
  const products = document
	 .getElementById("product-in-cart")
	 .querySelector(".product-content-wrapper");
  const formatVND = new Intl.NumberFormat("vi-VN", {
	 style: "currency",
	 currency: "VND",
  });
  productInCart.map((productArray, index) => {
	 const productDiv = document.createElement("div");
	 productDiv.classList.add("views-row");
	 productDiv.innerHTML = `
	 <div class="view-row-content">
	 	<div class="view-field-inner">
			<div class="view-field-image"><img src="${productArray.img}" alt="${productArray.name}"></div>
			<div class="product-group">
	 			<div class="view-field-category">${productArray.categories}</div>
	 			<div class="view-field-title"><a href="#">${productArray.name}</a></div>
			</div>
		</div>
		<div class="view-field view-field-price">${formatVND.format(productArray.price)}</div>		
		<div class="view-field view-field-quantity">
			<div class="view-field-quantity-inner"><button class="btn-quantity btn-quantity-minus" onclick="minusQuantity(${index})"></button><span>${productArray.quantity}</span><button class="btn-quantity btn-quantity-plus" onclick="plusQuantity(${index})"></button></div>
		</div>
		<div class="view-field view-field-sub-total">${formatVND.format(productArray.price * productArray.quantity)}</div>
		<div class="view-field view-field-btn-product-action"><button>Xoá</button></div>
    </div>`;

	 products.appendChild(productDiv);
  });
}

function plusQuantity(index) {
  console.log(index)
  let productInCart = localStorage.getItem("Carts")
	 ? JSON.parse(localStorage.getItem("Carts"))
	 : [];
  const formatVND = new Intl.NumberFormat("vi-VN", {
	 style: "currency",
	 currency: "VND",
  });
  productInCart[index] = {
	 ...productInCart[index],
	 quantity: ++productInCart[index].quantity,
  }
  document.querySelector('.view-field-quantity-inner > span').innerText = productInCart[index].quantity
  document.querySelector('.view-field-sub-total').innerText = formatVND.format(productInCart[index].price * productInCart[index].quantity);
  localStorage.setItem("Carts", JSON.stringify(productInCart));
}

function minusQuantity(index) {
  // console.log(index)
  let productInCart = localStorage.getItem("Carts")
	 ? JSON.parse(localStorage.getItem("Carts"))
	 : [];
  const formatVND = new Intl.NumberFormat("vi-VN", {
	 style: "currency",
	 currency: "VND",
  });
  productInCart[index] = {
	 ...productInCart[index],
	 quantity: --productInCart[index].quantity,
  }
  document.querySelector('.view-field-quantity-inner > span').innerText = productInCart[index].quantity
  document.querySelector('.view-field-sub-total').innerText = formatVND.format(productInCart[index].price * productInCart[index].quantity);
  localStorage.setItem("Carts", JSON.stringify(productInCart));
}
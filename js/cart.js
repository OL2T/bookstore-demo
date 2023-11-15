const overlay = document.getElementById('overlay');
const pop_up_login = document.querySelector(".pop-up-form-login");
let productInCart = localStorage.getItem("Carts") ? JSON.parse(localStorage.getItem("Carts")) : [];

function saveToCartLocalStorage() {
  localStorage.setItem('Carts', JSON.stringify(productInCart));
}

function addTocCart(productId) {
  let user = localStorage.getItem('isLoggedIn')
  if (user === 'true') {
	 let storedProducts = localStorage.getItem("List-products")
		? JSON.parse(localStorage.getItem("List-products"))
		: [];
	 // let productInCart = localStorage.getItem("Carts")
	 //  ? JSON.parse(localStorage.getItem("Carts"))
	 //  : [];
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
	 }
  } else {
	 overlay.classList.add('is-active');
	 pop_up_login.classList.add('is-active');
  }
}

function calculatorQuantity() {
  // let productInCart = localStorage.getItem("Carts") ? JSON.parse(localStorage.getItem("Carts")) : [];
  document.querySelector(".block-cart .quantity").innerHTML = productInCart.length;
}

function renderProductToCart() {
  // let productInCart = localStorage.getItem("Carts")
  //  ? JSON.parse(localStorage.getItem("Carts"))
  //  : [];
  let products = document.getElementById('product-in-cart');
  const formatVND = new Intl.NumberFormat("vi-VN", {
	 style: "currency",
	 currency: "VND",
  });
  let data = ``;
  productInCart.map((productArray, index) => {
	 data += `
	 	<div class="views-row">
		  <div class="view-row-content">
				 <div class="view-field-image"><img src="${productArray.img}" alt="${productArray.name}"></div>
				 <div class="product-group">
					 <div class="view-field-category">${productArray.categories}</div>
					 <div class="view-field-title"><a href="#">${productArray.name}</a></div>
				 </div>
				 <div class="view-field view-field-price">${formatVND.format(productArray.price)}</div>		
			 <div class="view-field view-field-quantity">
				 <div class="view-field-quantity-inner"><button class="btn-quantity btn-quantity-minus" onclick="minusQuantity(${index},${productArray.quantity})"></button><span class="quantity">${productArray.quantity} <span class="tool-tip">Số lượng sản phẩm không được nhỏ hơn 1</span> </span><button class="btn-quantity btn-quantity-plus" onclick="plusQuantity(${index})"></button></div>
			 </div>
			 <div class="view-field view-field-sub-total">${formatVND.format(productArray.price * productArray.quantity)}</div>
			 <div class="view-field view-field-btn-product-action"><button onclick="deleteProductInCart(${index})">Xoá</button></div>
			 </div>
	   </div>`;
  });

  products.querySelector('.product-content-wrapper').innerHTML = data;
}

function plusQuantity(index) {
  productInCart[index] = {
	 ...productInCart[index],
	 quantity: ++productInCart[index].quantity,
  }
  localStorage.setItem("Carts", JSON.stringify(productInCart));
  renderProductToCart();
  totalMoney()
}

function minusQuantity(index, quantity) {
  if (quantity > 1) {
	 productInCart[index] = {
		...productInCart[index],
		quantity: --productInCart[index].quantity,
	 }

	 localStorage.setItem("Carts", JSON.stringify(productInCart));
	 renderProductToCart();
	 totalMoney()

  } else {
	 const toolTip = document.querySelectorAll('.tool-tip')
	 if (toolTip[index]) {
		toolTip[index].classList.add('is-active');
		// console.log(toolTip[index])
	 }
  }
}


function deleteProductInCart(index) {
  productInCart.splice(index, 1);
  saveToCartLocalStorage()
  calculatorQuantity();
  totalMoney();
  renderProductToCart();
}

function totalMoney() {
  const formatVND = new Intl.NumberFormat("vi-VN", {
	 style: "currency",
	 currency: "VND",
  });

  if (productInCart !== []) {
	 let total = 0;
	 for (let i = 0; i < productInCart.length; i++) {
		total += productInCart[i].quantity * productInCart[i].price
	 }
	 document.querySelector('.total-price > span').innerHTML = formatVND.format(total)
  }
}

function cartLoadPage() {
  renderProductToCart()
  calculatorQuantity()
  totalMoney()
}
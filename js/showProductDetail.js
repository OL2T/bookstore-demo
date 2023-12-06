let quantity = 1;

function renderViewDetailProduct(productId) {
  let storedProducts = localStorage.getItem("List-products") ? JSON.parse(localStorage.getItem("List-products")) : [];
  const popup = document.getElementById('popup-product-detail')
  popup.classList.add('is-active');
  overlay.classList.add('is-active')
  let data = ``;
  storedProducts.map((productArray, index) => {
	 if (productArray.productId === productId) {
		data += `
		<div class="popup-product-detail-inner popup-product-detail-inner-${productArray.productId}">
			<div class="view-field-image"><img src="${productArray.img}" alt="${productArray.name}"></div>
			<div class="content-wrapper">
				<div class="view-field-title">${productArray.name}</div>
				<div class="view-field-author"><span>Tác giả: </span><span class="author-title">${productArray.author}</span></div>
				<div class="view-field-price">${formatVND.format(productArray.price)}</div>
				<div class="view-field-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
				<div class="view-field view-field-quantity">
				 <div class="view-field-quantity-inner">
				 <button class="btn-quantity btn-quantity-minus" onclick="minusQuantityProductDetail(${index})"></button>
				 <span class="quantity">
					<span class="quantity-number">${quantity}</span>
				 	<span class="tool-tip-product-detail">Số lượng sản phẩm không được nhỏ hơn 1</span> 
				 </span>
				 <button class="btn-quantity btn-quantity-plus" onclick="plusQuantityProductDetail(${index})"></button>
				 </div>
				</div>
				<button class="btn-add-to-cart" onclick="addTocCartProductDetail(${index},${productArray.productId})">Thêm vào giỏ hàng</button>
			 	<div class="view-field-shipping">
			 		<div class="time">Đơn hàng đến tay bạn thường mất từ 2 đến 3 ngày</div>
			 		<div class="secure">Thanh toán an toàn và bảo mật</div>
			 	</div>
			 	<div class="view-field-category"><span>Thể loại: </span>${productArray.categories}</div>
			</div>
			<button class="btn-close" onclick="closePopupDetailProduct()">close</button>
		</div>`
	 }
  })
  document.getElementById('popup-product-detail').innerHTML = data;

}

function closePopupDetailProduct() {
  const popup = document.getElementById('popup-product-detail')
  popup.classList.remove('is-active');
  overlay.classList.remove('is-active')
  quantity = 1
  document.querySelector('.view-field-quantity-inner .quantity-number').innerHTML = quantity;
}


function plusQuantityProductDetail(index) {
  let toolTip = document.querySelector('.tool-tip-product-detail')
  toolTip.classList.remove('is-active')
  ++quantity
  // console.log(quantity)
  document.querySelector('.view-field-quantity-inner .quantity-number').innerHTML = quantity;
  return quantity;
}

function minusQuantityProductDetail(index) {
  // // let checkProduct = productInCart.some(
  // //  (value) => value.productId === productId
  // // );
  // // quantity = productInCart[index].quantity;
  // console.log(quantity)
  // if (quantity > 1) {
  //  productInCart[index] = {
  // 	...productInCart[index],
  // 	quantity: --productInCart[index].quantity,
  //  }
  //  console.log(productInCart[index])
  //  document.querySelector('.view-field-quantity-inner .quantity-number').innerHTML = productInCart[index].quantity;
  //  localStorage.setItem("Carts", JSON.stringify(productInCart));
  //  // toolTip[index].classList.remove('is-active')
  // } else {
  //  let toolTip = document.querySelectorAll('.tool-tip-product-detail')
  //  toolTip[index].classList.add('is-active');
  // }
  if (quantity > 1) {
	 --quantity
	 // console.log(quantity)
	 document.querySelector('.view-field-quantity-inner .quantity-number').innerHTML = quantity;
	 return quantity;
  } else {
	 let toolTip = document.querySelector('.tool-tip-product-detail')
	 toolTip.classList.add('is-active');
  }
}

function addTocCartProductDetail(index, productId) {
  let user = localStorage.getItem('isLoggedIn')
  if (user === 'true') {
	 let storedProducts = localStorage.getItem("List-products")
		? JSON.parse(localStorage.getItem("List-products"))
		: [];
	 let checkProduct = productInCart.some(
		(value) => value.productId === productId
	 );
	 if (!checkProduct) {
		let product = storedProducts.find((value) => value.productId === productId);
		productInCart.unshift({
		  ...product,
		  quantity: quantity,
		});
		//  lưu lại vào local storage
		localStorage.setItem("Carts", JSON.stringify(productInCart));
		calculatorQuantity();
	 } else {
		let getIndex = productInCart.findIndex(
		  (value) => value.productId === productId
		);
		let currentQuantityProduct = productInCart[getIndex].quantity;
		productInCart[getIndex] = {
		  ...productInCart[getIndex],
		  quantity: currentQuantityProduct + quantity,
		}
		localStorage.setItem("Carts", JSON.stringify(productInCart));
	 }
  } else {
	 overlay.classList.add('is-active');
	 pop_up_login.classList.add('is-active');
	 document.getElementById('popup-product-detail').classList.remove('is-active')
  }
}

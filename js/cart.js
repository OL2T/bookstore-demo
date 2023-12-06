const overlay = document.getElementById('overlay');
const pop_up_login = document.querySelector(".pop-up-form-login");
let productInCart = localStorage.getItem("Carts") ? JSON.parse(localStorage.getItem("Carts")) : [];
let currentUser = localStorage.getItem("loggedInUsername");
let cartArray = JSON.parse(localStorage.getItem('CartArray')) || [];
const loggedin = JSON.parse(localStorage.getItem("isLoggedIn"));


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

function showPopupCart() {
  const popup_success = document.querySelector('.notification-add-to-cart');
  const btnClose = document.querySelector('.notification-add-to-cart .pop-up-content .btn-close')

  popup_success.classList.add('is-active');
  overlay.classList.add('is-active');
  document.querySelector('body').classList.add('no-scrollable');

  btnClose.addEventListener('click', function () {
    popup_success.classList.remove('is-active');
    overlay.classList.remove('is-active');
    document.querySelector('body').classList.remove('no-scrollable');
  })
}

function calculatorQuantity() {
  // let productInCart = localStorage.getItem("Carts") ? JSON.parse(localStorage.getItem("Carts")) : [];
  document.querySelector(".block-cart .quantity").innerHTML = productInCart.length;
}

function renderProductToCart() {
  // const holder = document.querySelector(".section-product-in-cart");
  // let data1 = ` <section id="product-in-cart" class="section section-product-in-cart">
  //         <div class="cart-heading">
  //           <div class="heading-product heading-product-title">Sản phẩm</div>
  //           <div class="heading-product product-price">Đơn giá</div>
  //           <div class="heading-product product-quantity">Số lượng</div>
  //           <div class="heading-product product-sub-total">Thành tiền</div>
  //           <div class="heading-product product-actions">Thao tác</div>
  //         </div>
  //         <div class="product-content-wrapper"></div>
  //         <!--        <div class="product-content-wrapper mobile"></div>-->
  //         <div class="footer-product">
  //           <div class="footer-product-inner">
  //             <div class="total-price">Tổng số tiền: <span></span></div>
  //             <button onclick="showPaymentForm() ">Thanh Toán</button>
  //           </div>
  //         </div>
  //       </section>`
  // holder.innerHTML = '';
  // holder.innerHTML = data1;
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
  totalMoney();
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
  let total = 0;
  if (productInCart !== null) {

    for (let i = 0; i < productInCart.length; i++) {
      total += productInCart[i].quantity * productInCart[i].price
    }
    // document.querySelector('.total-price > span').innerHTML = formatVND.format(total)
  }
  return total;
}

function cartLoadPage() {
  renderProductToCart()
  calculatorQuantity()
  totalMoney()
}


let existingIDs = [];

function generateRandomID() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  let randomID;

  do {
    randomID = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (existingIDs.includes(randomID)); // Check if the ID already exists

  existingIDs.push(randomID); // Add the generated ID to the list
  return randomID;
}


function validatePaymentForm() {
  const username = document.getElementById('payment-form-username').value.trim();
  const phoneNumber = document.getElementById('payment-form-number').value.trim();
  const provinces = document.getElementById('provinces').value;
  const districts = document.getElementById('districts').value;
  const ward = document.getElementById('payment-form-ward').value.trim();
  const street = document.getElementById('payment-form-street').value.trim();

  if (username === '' || phoneNumber === '' || provinces === '' || districts === '' || ward === '' || street === '') {
    alert('Please fill in all required fields.');
    return false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert('Please enter a valid phone number (10 digits).');
    return false;
  }
  return true;
}

const provinces = [
  { name: 'Hà Nội', districts: ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng'] },
  { name: 'Hồ Chí Minh', districts: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức'] }

];

const provincesDropdown = document.getElementById('provinces');
const districtsDropdown = document.getElementById('districts');

provinces.forEach(province => {
  const option = document.createElement('option');
  option.textContent = province.name;
  option.value = province.name;
  if (provincesDropdown !== null) {
    provincesDropdown.appendChild(option);
  }
});

function populateDistricts() {
  const selectedProvince = provincesDropdown.value;
  const selectedProvinceData = provinces.find(province => province.name === selectedProvince);
  districtsDropdown.innerHTML = '<option value="">Chọn quận huyện</option>';

  if (selectedProvinceData) {
    selectedProvinceData.districts.forEach(district => {
      const option = document.createElement('option');
      option.textContent = district;
      option.value = district;
      districtsDropdown.appendChild(option);
    });
  }
}

function showPaymentForm() {
  if ((loggedin === true)) {

    var Form = document.querySelector('.pop-up-payment-form');
    Form.style.display = 'block';
    document.getElementById('cart-overlay').style.display = 'block';

  }
}

function closePaymentForm() {
  var Form = document.querySelector('.pop-up-payment-form');
  Form.style.display = 'none';
  document.getElementById('cart-overlay').style.display = 'none';
}

const currentDate = new Date();

const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();

const formattedDate = `${day}-${month}-${year}`;

function createSuccessPopup() {
  if (validatePaymentForm() == true) {
    const customername = document.getElementById('payment-form-username').value.trim();
    const phoneNumber = document.getElementById('payment-form-number').value.trim();
    const provinces = document.getElementById('provinces').value;
    const districts = document.getElementById('districts').value;
    const ward = document.getElementById('payment-form-ward').value.trim();
    const street = document.getElementById('payment-form-street').value.trim();
    var Form = document.querySelector('.payment-success-pop-up');
    Form.style.display = 'block';
    document.getElementById('cart-overlay').style.display = 'block';

    let modifiedList = {
      id: generateRandomID(),
      Khách_hàng: customername,
      username: currentUser,
      địa_chỉ: street + ', ' + ward + ', ' + districts + ', ' + provinces,
      phonenumber: phoneNumber,
      products: productInCart,
      date: formattedDate,
      tổng_tiền: totalMoney(),
      status: 'Chưa xác nhận',
    };
    cartArray.push(modifiedList);

    localStorage.setItem('CartArray', JSON.stringify(cartArray));

  }
}

function closeSuccessPopup() {
  var Form = document.querySelector('.payment-success-pop-up');
  Form.style.display = 'none';
  localStorage.setItem("Carts", JSON.stringify([]));
  location.reload();

}

function formatToDDMMYYYY(dateString) {
  const [month, day, year] = dateString.split('-');

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
function seeWaitingList() {
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const holder = document.querySelector(".section-product-in-cart");
  holder.innerHTML = '';

  const thisUserCarts = cartArray.filter(cart => cart.username === currentUser);
  console.log(thisUserCarts);
  thisUserCarts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });


  thisUserCarts.forEach(cart => {
    const waitingCart = document.createElement('div');
    waitingCart.classList.add('waiting-cart');

    const info = document.createElement('div');

    info.innerHTML = `
						<div class="cart-info">
            <span>Mã đơn hàng: ${cart.id}</span>
            <span>Ngày đặt: ${formatToDDMMYYYY(cart.date)}</span>
            <span>Trạng thái: ${cart.status}</span>
						</div>
        `;
    waitingCart.appendChild(info);
    const cartHeader = document.createElement('div');
    cartHeader.innerHTML = ` <div class="waiting-list-views-row-header" >
                    <div class="view-row-content">
												<div class="view-field-image"></div>                       
											  <div class="view-field">Sách</div>
                        <div class="view-field view-field-price">Đơn giá</div>
												<div class="view-field view-field-quantity">Số lượng</div>
                        <div class="view-field view-field-sub-total">Thành tiền</div>
                    </div>
                </div>
            `;
    waitingCart.appendChild(cartHeader);
    const productSection = document.createElement('div');
    productSection.classList.add('this-cart-section');
    cart.products.forEach(book => {
      const product = document.createElement('div');
      product.innerHTML = `
                <div class="waiting-list-views-row" >
                    <div class="view-row-content">
                        <div class="view-field-image"><img src="${book.img}" alt="${book.name}"></div>
                        <div class="product-group">
                            <div class="view-field-category">${book.categories}</div>
                            <div class="view-field-title"><a href="#">${book.name}</a></div>
                        </div>
                        <div class="view-field view-field-price"><span>${formatVND.format(book.price)}</span></div>
												<div class="view-field view-field-quantity">${book.quantity}</div>
                        <div class="view-field view-field-sub-total">${formatVND.format(book.price * book.quantity)}</div>
                    </div>
                </div>
            `;
      productSection.appendChild(product);
    });
    waitingCart.appendChild(productSection);
    const total = document.createElement('div');
    total.classList.add('cart-footer');
    total.innerHTML = `<div class="footer-product" >
            <div class="footer-product-inner">
              <div class="total-price">Tổng số tiền: ${formatVND.format(cart.tổng_tiền)}</div>
             
            </div>
          </div>`
    waitingCart.appendChild(total);

    holder.appendChild(waitingCart);
  });
}
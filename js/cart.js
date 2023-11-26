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
	let total = 0;
	if (productInCart !== null) {

		for (let i = 0; i < productInCart.length; i++) {
			total += productInCart[i].quantity * productInCart[i].price
		}
		document.querySelector('.total-price > span').innerHTML = formatVND.format(total)
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

	// Basic validation (you can extend this according to your requirements)
	if (username === '' || phoneNumber === '' || provinces === '' || districts === '' || ward === '' || street === '') {
		alert('Please fill in all required fields.');
		return false; // Prevent form submission
	}

	// Validation for phone number (you can customize as needed)
	const phoneRegex = /^[0-9]{10}$/; // Validates 10-digit numbers
	if (!phoneRegex.test(phoneNumber)) {
		alert('Please enter a valid phone number (10 digits).');
		return false; // Prevent form submission
	}

	// You can add more specific validations for email, provinces, etc. as needed

	return true; // Allow form submission if all validations pass
}

const provinces = [
	{ name: 'Hà Nội', districts: ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng'] },
	{ name: 'Hồ Chí Minh City', districts: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức'] }

];

const provincesDropdown = document.getElementById('provinces');
const districtsDropdown = document.getElementById('districts');

provinces.forEach(province => {
	const option = document.createElement('option');
	option.textContent = province.name;
	option.value = province.name;
	provincesDropdown.appendChild(option);
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

// Get various components of the current date
const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and ensure it's 2 digits
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month and ensure it's 2 digits
const year = currentDate.getFullYear(); // Get the full year

// Formatted date in dd-mm-yyyy format
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
			status: 'not_checked',
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
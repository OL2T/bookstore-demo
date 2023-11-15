function main() {
  const overlay = document.getElementById('overlay');
  const btn_register = document.getElementById('btn-register');
  const btn_login = document.getElementById('btn-login');
  const pop_up = document.querySelector(".pop-up-form-register");
  const pop_up_login = document.querySelector(".pop-up-form-login");
  const popup_success = document.getElementById('notification');
  const btn_login_popup = popup_success.querySelector('.btn-login');
  const body = document.querySelector('body');
  const btnLogout = document.getElementById('btn-logout')
  let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
  const header = document.querySelector('.header');

  body.style.paddingTop = header.offsetHeight + 'px';

  btn_register.addEventListener("click", function () {
	 pop_up.classList.add('is-active');
	 overlay.classList.add('is-active');
	 body.classList.add('no-scrollable');
  });

  if (btn_login_popup) {
	 btn_login_popup.addEventListener('click', function () {
		pop_up_login.classList.add('is-active');
		overlay.classList.add('is-active');
		popup_success.classList.remove('is-active');
		body.classList.add('no-scrollable');
	 });
  }

  if (btn_login) {
	 btn_login.addEventListener('click', function () {
		pop_up_login.classList.add('is-active');
		overlay.classList.add('is-active');
		body.classList.add('no-scrollable');
	 });
  }

  document.onclick = function (e) {
	 if (e.target.id === 'overlay') {
		pop_up.classList.remove('is-active');
		overlay.classList.remove('is-active');
		pop_up_login.classList.remove('is-active');
		body.classList.remove('no-scrollable');
		// document.getElementById('popup-confirm-delete-product').classList.remove('is-active')
	 }
  }

  let form = document.querySelector('.form');
  let iconShowPass = document.querySelectorAll('.icon-show-password')

  iconShowPass.forEach(icon => {
	 icon.addEventListener('click', function () {
		// icon.parentElement.classList.toggle('show-password');
		// icon.previousElementSibling.type = 'text';
		if (icon.previousElementSibling.getAttribute('type') === 'password') {
		  icon.previousElementSibling.setAttribute('type', 'text');
		  icon.parentElement.classList.add('show-password');
		} else if (icon.previousElementSibling.getAttribute('type') === 'text') {
		  icon.previousElementSibling.setAttribute('type', 'password');
		  icon.parentElement.classList.remove('show-password');
		}
	 })
  })

  if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
	 document.querySelector('body').classList.add('user-logged-in');
	 document.getElementById('btn-login').parentElement.style.display = 'none';
	 document.getElementById('btn-register').parentElement.style.display = 'none';
	 btnLogout.parentElement.style.display = 'block';
	 overlay.classList.remove('is-active');
	 pop_up_login.classList.remove('is-active');
  }

  btnLogout.addEventListener('click', function (e) {
	 e.preventDefault();
	 logout();
  });

}


function createAdmin() {
  let user = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];

  const admin = {
	 userID: 1000,
	 fullName: 'Lâm Tấn Tài',
	 username: 'admin1',
	 email: 'lamtantai200@gmail.com',
	 phone: '0981210174',
	 password: 'admin1',
	 role: 'admin'
  }

  // user.push(admin);
  // console.log(admin)
  // console.log(user)
  if (user == '') {
	 user.push(admin)
	 // console.log('them thanh cong')
  }
  let json = JSON.stringify(user);
  localStorage.setItem('List-users', json);
  // console.log(user)
  for (let i = 0; i < user.length; i++) {
	 // console.log(user)
	 if (user[i].username === user[i].username) {
		// console.log('tai khoan da ton tai')
	 }
  }

}

var categories = [
  {
	 id: "literature",
	 name: "Văn học",
  },
  {
	 id: "children-book",
	 name: "Thiếu nhi",
  },
  {
	 id: "textbook",
	 name: "Sách giáo khoa",
  },
  {
	 id: "foreign-language-book",
	 name: "Sách ngoại ngữ",
  }
];

const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

function renderProductItems(products, wrapDiv) {
  products.forEach(productArray => {
	 const productDiv = document.createElement('div');
	 productDiv.classList.add('views-row');
	 const urlPath = location.href;
	 const splitPath = urlPath.split('/');
	 if (splitPath[splitPath.length - 1] !== 'index.html') {
		// productDiv.style.flex = '0 0 calc(33.3333333333% - 24px)';
		// productDiv.style.maxWidth = 'calc(33.3333333333% - 24px)';
	 }

	 productDiv.innerHTML = `
		<div class="view-row-content" >
			<div class="view-field-image" >
				<a href="#"><img src="${productArray.img}" alt="${productArray.name}" style="object-fit: contain;"></a>
				<div class="product-buttons">
					<div class="action quick-view">
					<span class="tool-tip">Xem nhanh</span>
					<button class="btn-action btn-quick-view"></button>
					</div>
					<div class="action add-to-cart">
					<span class="tool-tip">Thêm vào giỏ hàng</span>
					<button class="btn-action btn-add-to-cart" onclick="addTocCart(${productArray.productId
	 })"></button>
					</div>
				</div>
			</div>
			<div class="content-wrapper">
			<div class="view-field-category"><span>${productArray.categories}</span></div>
			<div class="view-field-title"><a href="#">${productArray.name}</a></div>
			<div class="view-field-author"><span>Tác giả: </span><span class="author-title">${productArray.author}</span></div>
			<div class="view-field-price"><p>${formatVND.format(productArray.price)}</p></div>
			</div>
		</div>`;
	 wrapDiv.appendChild(productDiv);
  });
}

function renderProductList() {
  let storedProducts = localStorage.getItem('List-products') ? JSON.parse(localStorage.getItem('List-products')) : [];

  let literatureProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Văn học") {
		literatureProductList.push(product);
	 }
  });
  let childrenBookProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Thiếu nhi") {
		childrenBookProductList.push(product);
	 }
  });
  let textbookProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Sách giáo khoa") {
		textbookProductList.push(product);
	 }
  });
  let foreignLanguageBookProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Sách ngoại ngữ") {
		foreignLanguageBookProductList.push(product);
	 }
  });

  const main_content = document.getElementById('main-content');

  categories.forEach(category => {
	 const categorySection = document.createElement('section');
	 categorySection.classList.add('section', 'section-product-list');
	 categorySection.id = category.id;

	 const categoryHeader = document.createElement('div');
	 categoryHeader.classList.add('header-content');
	 categoryHeader.innerText = category.name;
	 categorySection.appendChild(categoryHeader);

	 const categoryContent = document.createElement('div');
	 categoryContent.classList.add('view-content-wrapper');

	 let tempProducts = [];
	 if (category.name === "Văn học") {
		tempProducts = literatureProductList;
	 } else if (category.name === "Thiếu nhi") {
		tempProducts = childrenBookProductList;
	 } else if (category.name === "Sách giáo khoa") {
		tempProducts = textbookProductList;
	 } else if (category.name === "Sách ngoại ngữ") {
		tempProducts = foreignLanguageBookProductList;
	 }
	 renderProductItems(tempProducts, categoryContent);
	 categorySection.appendChild(categoryContent);
	 main_content.appendChild(categorySection);
  });
}

function renderProductByType(type, currentPage, priceRange) {
  renderFilterLeft(type, priceRange);
  let storedProducts = localStorage.getItem('List-products') ? JSON.parse(localStorage.getItem('List-products')) : [];
  let literatureProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Văn học") {
		literatureProductList.push(product);
	 }
  });
  let childrenBookProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Thiếu nhi") {
		childrenBookProductList.push(product);
	 }
  });
  let textbookProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Sách giáo khoa") {
		textbookProductList.push(product);
	 }
  });
  let foreignLanguageBookProductList = [];
  storedProducts.forEach(product => {
	 if (product.categories === "Sách ngoại ngữ") {
		foreignLanguageBookProductList.push(product);
	 }
  });

  let products = [];
  if (type === 'literature') {
	 products = literatureProductList;
  } else if (type === 'children-book') {
	 products = childrenBookProductList;
  } else if (type === 'textbook') {
	 products = textbookProductList;
  } else if (type === 'foreign-language-book') {
	 products = foreignLanguageBookProductList;
  } else {
	 products = storedProducts;
  }


  if (priceRange === null) {
	 // products = storedProducts;
  } else {
	 const tempPrice = priceRange.split('-');
	 const minPrice = parseInt(tempPrice[0] + '000');
	 const maxPrice = parseInt(tempPrice[1] + '000');
	 if (tempPrice[1] === 'Infinity') {
		products = products.filter(product => {
		  if (product.price >= minPrice) {
			 return product;
		  }
		})
	 }
	 else {
		products = products.filter(product => {
		  if (product.price >= minPrice && product.price <= maxPrice) {
			 return product;
		  }
		})
	 }
  }

  const main_content = document.getElementById('main-content');
  const rightDiv = document.createElement('div');
  rightDiv.id = 'right';

  const productWrap = document.createElement('div');
  productWrap.style.display = 'flex';
  productWrap.style.flexDirection = 'row';
  const section = document.createElement('section');
  section.classList.add('section', 'section-product-list');
  section.style.marginTop = '0';
  const categoryContent = document.createElement('div');
  categoryContent.classList.add('view-content-wrapper');

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tempProducts = products.slice(startIndex, endIndex);
  renderProductItems(tempProducts, categoryContent);
  section.appendChild(categoryContent);
  productWrap.appendChild(section);
  rightDiv.appendChild(productWrap);
  createPaginationbuttons(rightDiv, products);
  main_content.appendChild(rightDiv);
}

function changeCategory(type) {
  const urlParams = new URLSearchParams(window.location.search);
  type === ''
	 ? urlParams.delete('type')
	 : urlParams.set('type', type);
  window.location.search = urlParams;
}

function displayProducts(productsToDisplay) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  productsToDisplay.forEach(product => {
	 const productCard = document.createElement('div');
	 productCard.classList.add('product-card');
	 productCard.textContent = `${product.name} - ${product.category} - $${product.price}`;
	 productList.appendChild(productCard);
  });
}

function changePriceRange(priceRange) {
  const urlParams = new URLSearchParams(window.location.search);
  priceRange === ''
	 ? urlParams.delete('priceRange')
	 : urlParams.set('priceRange', priceRange.min + '-' + priceRange.max);
  window.location.search = urlParams;
}

function renderFilterLeft(type, price) {
  const leftDiv = document.createElement('div');
  leftDiv.id = 'left';
  const accordionDiv = document.createElement('div');
  accordionDiv.id = 'accordion';

  // nhóm sản phẩm
  const filterDiv = document.createElement('div');
  filterDiv.classList.add('filter');
  filterDiv.innerText = 'Nhóm sản phẩm';
  const catePriceDiv = document.createElement('div');
  catePriceDiv.classList.add('catePrice');

  categories.forEach(category => {
	 const categoryDiv = document.createElement('div');
	 categoryDiv.classList.add('filter-item');
	 const checkbox = document.createElement('input');
	 checkbox.type = 'checkbox';
	 checkbox.id = category.id;
	 checkbox.name = category.name;
	 checkbox.value = category.name;
	 if (type === category.id) {
		checkbox.checked = true;
	 } else {
		checkbox.checked = false;
	 }
	 checkbox.addEventListener('change', function () {
		if (checkbox.checked) {
		  changeCategory(category.id);
		} else {
		  changeCategory('');
		}
	 });
	 const label = document.createElement('label');
	 label.htmlFor = category.id;
	 label.innerText = category.name;

	 categoryDiv.appendChild(checkbox);
	 categoryDiv.appendChild(label);
	 catePriceDiv.appendChild(categoryDiv);
  });

  accordionDiv.appendChild(filterDiv);
  accordionDiv.appendChild(catePriceDiv);
  leftDiv.appendChild(accordionDiv);

  //Giá
  const priceDiv = document.createElement('div');
  priceDiv.classList.add('filter');
  priceDiv.innerText = 'Giá';
  const priceRangeDiv = document.createElement('div');
  priceRangeDiv.classList.add('catePrice');

  const priceRanges = [
	 { id: 'under-100', name: 'Dưới 100.000', min: 0, max: 100.000 },
	 { id: '100-200', name: '100.000 - 200.000', min: 100.000, max: 200.000 },
	 { id: '200-300', name: '200.000 - 300.000', min: 200.000, max: 300.000 },
	 { id: '300-400', name: '300.000 - 400.000', min: 300.000, max: 400.000 },
	 { id: 'above-400', name: 'Trên 400.000', min: 400.000, max: Infinity },
  ];

  priceRanges.forEach(priceRange => {
	 const priceDiv = document.createElement('div');
	 priceDiv.classList.add('filter-item');
	 const checkbox = document.createElement('input');
	 checkbox.type = 'checkbox';
	 checkbox.id = 'priceRange';
	 checkbox.name = priceRange.name;
	 checkbox.value = priceRange.id;

	 const temp = priceRange.min + '-' + priceRange.max;
	 if (temp === price) {
		checkbox.checked = true;
	 } else {
		checkbox.checked = false;
	 }

	 checkbox.addEventListener('change', function () {
		if (checkbox.checked) {
		  changePriceRange(priceRange);
		} else {
		  changePriceRange('');
		}
	 });

	 const label = document.createElement('label');
	 label.htmlFor = priceRange.id;
	 label.innerText = priceRange.name;

	 priceDiv.appendChild(checkbox);
	 priceDiv.appendChild(label);
	 priceRangeDiv.appendChild(priceDiv);
  });

  accordionDiv.appendChild(priceDiv);
  accordionDiv.appendChild(priceRangeDiv);
  leftDiv.appendChild(accordionDiv);

  const main_content = document.getElementById('main-content');
  main_content.style.marginTop = '50px';
  main_content.appendChild(leftDiv);
}

function createPaginationbuttons(wrapper, productList) {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');
  for (let i = 1; i <= totalPages; i++) {
	 const button = document.createElement('button');
	 button.classList.add('pagination-button');
	 button.innerText = i;
	 button.addEventListener('click', () => {
		button.classList.add('active');
	 });
	 paginationContainer.appendChild(button);
  }
  wrapper.appendChild(paginationContainer);
}

function mobileMenu() {
  const overlay = document.getElementById('overlay');
  const pop_up = document.querySelector(".pop-up-form-register");
  const pop_up_login = document.querySelector(".pop-up-form-login");
  const popup_success = document.getElementById('notification');
  const btn_login_popup = popup_success.querySelector('.btn-login');
  const body = document.querySelector('body');
  const btnLogout = document.querySelector('.block-navigation-mobile .btn-logout')
  let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
  const header = document.querySelector('header');
  const toggle = document.getElementById('toggle-navigation');
  toggle.addEventListener('click', function () {
	 header.classList.toggle('is-active');
  })
  const blockNavigation = document.querySelector('.block-navigation-mobile ')
  const ul = blockNavigation.querySelector('.menu.mobile')
  ul.addEventListener('click', function (e) {
	 e.preventDefault();
	 let target = e.target;
	 while (target && target.parentNode !== ul) {
		target = target.parentNode; // If the clicked element isn't a direct child
		if (!target) {
		  return;
		} // If element doesn't exist
	 }
	 if (target.className === 'menu-item menu-item-expanded') {
		target.classList.add('is-active');
		console.log(target)
	 } else {
		target.classList.remove('is-active');
	 }
  })
  const btnLogin = blockNavigation.querySelector('.btn-login')
  const btnSignup = blockNavigation.querySelector('.btn-register')

  btnLogin.addEventListener('click', function () {
	 pop_up_login.classList.add('is-active');
	 overlay.classList.add('is-active');
	 body.classList.add('no-scrollable');
	 header.classList.remove('is-active')
  })

  btnSignup.addEventListener("click", function () {
	 pop_up.classList.add('is-active');
	 overlay.classList.add('is-active');
	 body.classList.add('no-scrollable');
	 header.classList.remove('is-active')
  });

  if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
	 btnLogin.parentElement.style.display = 'none';
	 btnSignup.parentElement.style.display = 'none';
	 btnLogout.parentElement.style.display = 'block';
  }

  btnLogout.addEventListener('click', function (e) {
	 e.preventDefault();
	 logout();
  });
}

window.addEventListener('scroll', function () {
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  if (window.scrollY > header.offsetHeight) {
	 header.classList.add('fixed')
  } else {
	 header.classList.remove('fixed')
  }
})

window.onload = function () {
  createProduct();
  createAdmin();
  const urlPath = location.href;
  const splitPath = urlPath.split('/');
  if (splitPath[splitPath.length - 1] === 'index.html') {
	 renderProductList();
  } else {
	 const urlParams = new URLSearchParams(window.location.search);
	 const type = urlParams.get('type');
	 const priceRange = urlParams.get('priceRange');
	 renderProductByType(type, 1, priceRange);
  }

  if (splitPath[splitPath.length - 1] === 'cart.html') {
	 cartLoadPage()
  }

  searchLoadPage()
  calculatorQuantity()
  validateRegisterForm();
  // renderListUser();
  mobileMenu();
  login();
  main();
  checkLogin();
}

// function indexLoadPage(){
//   createProduct();
//   createAdmin();
//   renderProductList();
//   calculatorQuantity()
//   // indexLoadPage();
//   validateRegisterForm();
//   renderListUser();
//   login();
//   logout()
//   main();
//   checkLogin();
//   // checkUserAddToCart()
// }

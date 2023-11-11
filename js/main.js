function main() {
  const overlay = document.getElementById('overlay');
  const btn_register = document.getElementById('btn-register');
  const btn_login = document.getElementById('btn-login');
  const pop_up = document.querySelector(".pop-up-form-register");
  const pop_up_login = document.querySelector(".pop-up-form-login");
  const popup_success = document.getElementById('notification');
  const btn_login_popup = popup_success.querySelector('.btn-login');
  const body = document.getElementById('body');


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
		body.classList.add('no-scrollable');
		overlay.classList.add('is-active');
	 });
  }

  document.onclick = function (e) {
	 if (e.target.id === 'overlay') {
		pop_up.classList.remove('is-active');
		overlay.classList.remove('is-active');
		body.classList.remove('no-scrollable');
		pop_up_login.classList.remove('is-active');
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

  document.getElementById('btn-logout').addEventListener('click', function (e) {
	 e.preventDefault();
	 logout();
  });
}

function renderProductList() {
  let storedProducts = localStorage.getItem('List-products') ? JSON.parse(localStorage.getItem('List-products')) : [];
  const literatureProductList = document.getElementById('literature-product-list').querySelector('.view-content-wrapper');
  const childrenBookProductList = document.getElementById('children-book-product-list').querySelector('.view-content-wrapper');
  const textbookProductList = document.getElementById('textbook-product-list').querySelector('.view-content-wrapper');
  const foreignLanguageBookProductList = document.getElementById('foreign-language-book-product-list').querySelector('.view-content-wrapper');
  const formatVND = new Intl.NumberFormat('vi-VN', {
	 style: 'currency',
	 currency: 'VND',
  })

  storedProducts.forEach(productArray => {
	 const productDiv = document.createElement('div');
	 productDiv.classList.add('views-row');

	 const renderMarkup = productDiv.innerHTML = `
	 <div class="view-row-content" style="height: 100%;">
		<div class="view-field-image" style="height: 300px;">
			<a href="#"><img src="${productArray.img}" alt="${productArray.name}" style="object-fit: contain;"></a>
			<div class="product-buttons">
				<div class="action quick-view">
				  <span class="tool-tip">Xem nhanh</span>
				  <a href="" class="btn-quick-view"></a>
				</div>
				<div class="action add-to-cart">
				  <span class="tool-tip">Thêm vào giỏ hàng</span>
				  <a href="" class="btn-add-to-cart"></a>
				</div>
  			</div>
		</div>
		<div class="content-wrapper" style="height: calc(100% - 300px);">
		  <div class="view-field-category"><span>${productArray.categories}</span></div>
		  <div class="view-field-title"><a href="#">${productArray.name}</a></div>
		  <div class="view-field-author"><span>Tác giả: </span><span class="author-title">${productArray.author}</span></div>
		  <div class="view-field-price"><p>${formatVND.format(productArray.price)}</p></div>
		</div>
    </div>`;

	 if (productArray.categories === 'Văn học') {
		literatureProductList.appendChild(productDiv);
	 } else if (productArray.categories === 'Thiếu nhi') {
		childrenBookProductList.appendChild(productDiv);
	 } else if (productArray.categories === 'Sách giáo khoa') {
		textbookProductList.appendChild(productDiv);
	 } else if (productArray.categories === 'Sách ngoại ngữ') {
		foreignLanguageBookProductList.appendChild(productDiv);
	 }
  });
}


window.onload = function () {
  main();
  createProduct();
  renderProductList();
  validateRegisterForm();
  renderListUser();
  login();
}
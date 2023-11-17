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

function changeToFilter(params) {
	window.location.href = `./index.html?type=${params}`;
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
	const a = splitPath[splitPath.length - 1];
	if (a.includes('index.html')) {
		if (a === 'index.html') {
			renderProductList();
		} else {
			const urlParams = new URLSearchParams(window.location.search);
			const type = urlParams.get('type');
			const priceRange = urlParams.get('priceRange');
			renderProductByType(type, 1, priceRange);
		}
		
	} else if (a.includes('cart.html')) {
		cartLoadPage();
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

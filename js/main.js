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
  renderProductList();
  calculatorQuantity()
  // indexLoadPage();
  validateRegisterForm();
  renderListUser();
  login();
  main();
  checkLogin();
  renderProductToCart()
}

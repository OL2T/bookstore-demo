function login() {
	let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
	let form = document.getElementById('form-login');
	const overlay = document.getElementById('overlay');
	const pop_up_login = document.querySelector(".pop-up-form-login");
	const body = document.querySelector('body');
	const blockUser = document.querySelector('.block-user .icon-user');

	function showMessageError(input, message) {
		let parent = input.parentElement;
		let form_message = parent.querySelector('.form-message')
		parent.classList.add('invalid');
		parent.classList.remove('success');
		form_message.innerText = message;
	}

	function showSuccess(input, message) {
		let parent = input.parentElement;
		let form_message = parent.querySelector('.form-message')
		parent.classList.remove('invalid');
		parent.classList.add('success');
		form_message.innerText = '';
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let isLogin = false;

		let usernameDataInput = document.getElementById('username-login');
		let passwordDataInput = document.getElementById('password-login');

		for (let i = 0; i < listUsers.length; i++) {

			if (listUsers[i].username === usernameDataInput.value) {
				showSuccess(usernameDataInput);
			} else {
				showMessageError(usernameDataInput, 'Tên đăng nhập không trùng khớp')
			}

			if (listUsers[i].password === passwordDataInput.value) {
				showSuccess(passwordDataInput);
			} else {
				showMessageError(passwordDataInput, 'Mật khẩu không trùng khớp');
			}

			if (listUsers[i].username === usernameDataInput.value && listUsers[i].password === passwordDataInput.value) {
				isLogin = true;
				// console.log('UserID:', listUsers[i].userID);
				localStorage.setItem('loggedInUsername', listUsers[i].fullName);
				checkLogin();

			} else {
				console.log('dang nhap that bai')
			}
		}
		// console.log(isLogin)
		if (isLogin) {
			form.reset();
			localStorage.setItem('isLoggedIn', 'true');
			body.classList.remove('no-scrollable');

			const btnLogout = document.getElementById('btn-logout')
			document.querySelector('body').classList.add('user-logged-in');
			document.getElementById('btn-login').parentElement.style.display = 'none';
			document.getElementById('btn-register').parentElement.style.display = 'none';
			btnLogout.parentElement.style.display = 'block';
			document.querySelector('.block-navigation-mobile .btn-login').parentElement.style.display = 'none';
			document.querySelector('.block-navigation-mobile .btn-register').parentElement.style.display = 'none';
			document.querySelector('.block-navigation-mobile .btn-logout').parentElement.style.display = 'block';
			overlay.classList.remove('is-active');
			pop_up_login.classList.remove('is-active');
			location.reload();

		} else {
			blockUser.innerText = '';
		}
	})
}

function checkLogin() {
	const loggedInUsername = localStorage.getItem('loggedInUsername');
	const blockUser = document.querySelector('.block-user .icon-user');
	// const blockMobile = document.querySelector('.block-navigation-mobile')

	if (loggedInUsername) {
		// Người dùng đã đăng nhập, bạn có thể sử dụng `loggedInUsername` để biết người dùng là ai.
		console.log('Người đã đăng nhập:', loggedInUsername);
		// Hiển thị tên đăng nhập hoặc thông tin người dùng trên giao diện.
		blockUser.innerText = loggedInUsername;
	} else {
		// Người dùng chưa đăng nhập.
		console.log('Chưa có người dùng đăng nhập.');
	}
}

function logout() {
	let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
	let productInCart = localStorage.getItem("Carts") ? JSON.parse(localStorage.getItem("Carts")) : [];
	const blockUser = document.querySelector('.block-user .icon-user');

	localStorage.setItem('isLoggedIn', 'false');
	document.querySelector('body').classList.remove('user-logged-in');
	document.getElementById('btn-login').parentElement.style.display = 'block';
	document.getElementById('btn-register').parentElement.style.display = 'block';
	document.getElementById('btn-logout').parentElement.style.display = 'none';

	document.querySelector('.block-navigation-mobile .btn-login').parentElement.style.display = 'block';
	document.querySelector('.block-navigation-mobile .btn-register').parentElement.style.display = 'block';
	document.querySelector('.block-navigation-mobile .btn-logout').parentElement.style.display = 'none';

	for (let i = 0; i < listUsers.length; i++) {
		blockUser.innerText = '';
		localStorage.setItem('loggedInUsername', '');
	}

	productInCart = [];


	localStorage.setItem('Carts', JSON.stringify(productInCart));
	calculatorQuantity();
	renderProductToCart();
	location.reload();
}


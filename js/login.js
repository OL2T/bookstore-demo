function login() {
  let isLogin = false;
  let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
  let form = document.getElementById('form-login');
  const overlay = document.getElementById('overlay');
  const pop_up_login = document.querySelector(".pop-up-form-login");

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

  function checkEmpty(listInput) {
	 let isEmptyError = false;
	 listInput.forEach(input => {
		input.value = input.value.trim();
		if (!input.value) {
		  isEmptyError = true;
		  showMessageError(input, 'Vui lòng nhập vào ô này')
		} else {
		  showSuccess(input);
		}
	 });
	 return isEmptyError;
  }

  function checkMathInputError(usernameDataInput, passwordDataInput) {
	 return false
  }


  form.addEventListener('submit', function (e) {
	 e.preventDefault();

	 let usernameDataInput = document.getElementById('username-login');
	 let passwordDataInput = document.getElementById('password-login');

	 // let isCheckEmptyError = checkEmpty([usernameDataInput, passwordDataInput]);
	 // let isCheckMatchData = checkMathInputError(usernameDataInput, passwordDataInput);
	 //
	 // if (isCheckEmptyError || isCheckMatchData) {
	 // console.log('Còn lỗi đăng nhập')
	 // } 
	 // else {
	 // // console.log('Dang nhap thanh cong 2222222222')
	 //
	 // }

	 for (let i = 0; i < listUsers.length; i++) {

		if (listUsers[i].username === usernameDataInput.value) {
		  showSuccess(usernameDataInput);
		} else {
		  showMessageError(usernameDataInput, 'Ten dang nhap khong trung khop')
		}

		if (listUsers[i].password === passwordDataInput.value) {
		  showSuccess(passwordDataInput);
		} else {
		  showMessageError(passwordDataInput, 'Mat khau khong trung khop')
		}

		if (listUsers[i].username === usernameDataInput.value && listUsers[i].password === passwordDataInput.value) {
		  isLogin = true;
		  console.log('Dang nhap thanh cong');
		  break;
		}
	 }
	 if (isLogin) {
		// window.location.href = 'index.html';
		localStorage.setItem('isLoggedIn', 'true');
		document.querySelector('body').classList.add('user-logged-in');
		document.getElementById('btn-login').parentElement.style.display = 'none';
		document.getElementById('btn-register').parentElement.style.display = 'none';
		document.getElementById('btn-logout').parentElement.style.display = 'block';
		overlay.classList.remove('is-active');
		pop_up_login.classList.remove('is-active');
	 }
	 // else {
	 // alert('Đăng nhập thất bại');
	 // showMessageError(usernameDataInput, 'Ten dang nhap khong trung khop')
	 // showMessageError(passwordDataInput, 'Mat khau khong trung khop')
	 // }
  })
}

function logout() {
  // const btnLogout = document.getElementById('btn-logout');
  //
  // btnLogout.addEventListener('click', function (e) {
  //  // e.preventDefault();
  //  localStorage.removeItem('isLoggedIn');
  //  document.querySelector('body').classList.remove('user-logged-in');
  //
  // })
  localStorage.setItem('isLoggedIn', 'false');
  document.querySelector('body').classList.remove('user-logged-in');
  document.getElementById('btn-login').parentElement.style.display = 'block';
  document.getElementById('btn-register').parentElement.style.display = 'block';
  document.getElementById('btn-logout').parentElement.style.display = 'none';
}
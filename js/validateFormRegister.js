function validateRegisterForm() {
	var fullname = document.getElementById('fullname');
	var username = document.getElementById('username');
	var email = document.getElementById('email');
	var phone = document.getElementById('phone-number');
	var password = document.getElementById('password');
	var confirm_pass = document.getElementById('password_confirmation');
	var form = document.querySelector('.form-register');

	function showMessageError(input, message) {
		let parent = input.parentElement;
		let form_mesage = parent.querySelector('.form-message')
		parent.classList.add('invalid');
		parent.classList.remove('success');
		form_mesage.innerText = message;
	}

	function showSuccess(input, message) {
		let parent = input.parentElement;
		let form_mesage = parent.querySelector('.form-message')
		parent.classList.remove('invalid');
		parent.classList.add('success');
		form_mesage.innerText = '';
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

	function checkLength(input, min, max) {
		input.value = input.value.trim();
		// console.log(input.value.length);
		if (input.value.length < min) {
			showMessageError(input, `Bạn cần nhập ít nhất ${min} ký tự`);
			return true
		}
		if (input.value.length > max) {
			showMessageError(input, `Bạn không được nhập quá ${max} ký tự`);
			return true
		}
		showSuccess(input)
		return false
	}

	function checkFullName(input, min, max) {
		// Trim the input to remove leading and trailing spaces
		input.value = input.value.trim();

		if (input.value === '') {
			showMessageError(input, 'Họ và tên không được để trống');
			return true;
		}

		let regex = /^(?![0-9]*$)[A-Za-z\sÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰĐđàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữự\s]+$/u;

		if (!regex.test(input.value)) {
			showMessageError(input, 'Họ và tên phải là chữ và không có kí tự đặc biệt');
			return true;
		}

		if (input.value.length < min) {
			showMessageError(input, `Bạn cần nhập ít nhất ${min} ký tự`);
			return true;
		}

		if (input.value.length > max) {
			showMessageError(input, `Bạn không được nhập quá ${max} ký tự`);
			return true;
		}

		showSuccess(input);
		return false;
	}

	function checkPhoneNumber(input) {
		let regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
		input.value = input.value.trim();

		let isPhoneNumberError = !regex.test(input.value);
		if (regex.test(input.value)) {
			showSuccess(input);
		} else {
			showMessageError(input, 'Số điện thoại phải là số và có 10 kí tự');
		}

		return isPhoneNumberError;
	}

	function checkEmail(input) {
		var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		input.value = input.value.trim();

		let isEmailError = !regex.test(input.value);
		if (regex.test(input.value)) {
			showSuccess(input);
		} else {
			showMessageError(input, 'Email không hợp lệ');
		}

		return isEmailError;
	}

	function checkMathPasswordError(passInput, confirmPassInput) {
		if (passInput.value !== confirmPassInput.value) {
			showMessageError(confirmPassInput, "Mật khẩu bạn nhập không trùng khớp");
			return true
		}
		return false
	}

	function checkDuplicateData(input) {
		let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
		input.value = input.value.trim();

		let isEmailDuplicate = listUsers.some(user => user.email === input.value);
		let isPhoneNumberDuplicate = listUsers.some(user => user.phone === input.value);
		let isUserNameDuplicate = listUsers.some(user => user.username === input.value);

		if (isEmailDuplicate) {
			showMessageError(input, `Email ${input.value} đã được đăng ký`);
			return true;
		} else if (isPhoneNumberDuplicate) {
			showMessageError(input, `Số điện thoại ${input.value} này đã được đăng ký`);
			return true;
		} else if (isUserNameDuplicate) {
			showMessageError(input, `Tên đăng nhập ${input.value} này đã được đăng ký`);
			return true;
		}

		return false;
	}

	function accessibility() {
		const overlay = document.getElementById('overlay');
		const pop_up = document.querySelector(".pop-up-form-register");
		const pop_up_success = document.getElementById('notification');
		const pop_up_login = document.querySelector(".pop-up-form-login");
		const body = document.getElementById('body');


		pop_up.classList.remove('is-active');
		overlay.classList.remove('is-active');
		body.classList.remove('no-scrollable');

		if (pop_up_success) {
			pop_up_success.classList.add('is-active');
			overlay.classList.add('is-active');
			body.classList.add('no-scrollable');
		}

		document.onclick = function (e) {
			if (e.target.id === 'overlay') {
				pop_up_success.classList.remove('is-active');
				overlay.classList.remove('is-active');
				pop_up.classList.remove('is-active');
				body.classList.remove('no-scrollable');
				pop_up_login.classList.remove('is-active');
			}
		}
	}


	form.addEventListener('submit', function (e) {
		e.preventDefault();

		let isEmptyError = checkEmpty([username, email, phone, password, confirm_pass]);
		let isFullNameError = checkFullName(fullname, 6, 40);
		let isUserNameError = checkLength(username, 5, 20);
		let isEmailError = checkEmail(email);
		let isPhoneNumberError = checkPhoneNumber(phone);
		let isCheckPass = checkLength(password, 5, 20);
		let isCheckPassConfirm = checkLength(confirm_pass, 5, 20);
		let isCheckMathPasswordError = checkMathPasswordError(password, confirm_pass);
		let isCheckUserNameDuplicateError = checkDuplicateData(username);
		let isCheckEmailDuplicateError = checkDuplicateData(email);
		let isCheckPhoneDuplicateError = checkDuplicateData(phone);

		if (isEmptyError || isFullNameError || isUserNameError || isPhoneNumberError || isEmailError || isCheckPass || isCheckPassConfirm || isCheckMathPasswordError || isCheckUserNameDuplicateError || isCheckEmailDuplicateError || isCheckPhoneDuplicateError) {
			// do nothing
			console.log('Còn lỗi');
		} else {
			// add users
			let user = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
			let fullNameData = fullname.value;
			let usernameData = username.value;
			let emailData = email.value;
			let phoneData = phone.value;
			let passwordData = password.value;
			let role = 'Khách hàng'
			let maxUserId = 1000;

			for (const userData of user) {
				if (userData.userID > maxUserId) {
					maxUserId = userData.userID;
				}
			}

			// Tăng giá trị maxUserId lên 1 để tạo userID mới
			let userId = maxUserId + 1;

			user.push({
				userID: userId,
				fullName: fullNameData,
				username: usernameData,
				email: emailData,
				phone: phoneData,
				password: passwordData,
				role: role,
			});

			let json = JSON.stringify(user);
			localStorage.setItem('List-users', json);


			renderListUser();
			accessibility();
			form.reset();
			login();
			// createAdmin()
			// logout();

		}
	})
}

function renderListUser() {
	let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
	let users =
		`<thead>
		  <tr>
			 <th>ID</th>
			 <th>Họ và tên</th>
			 <th>Tên đăng nhập</th>
			 <th>Email</th>
			 <th>Số điện thoại</th>
			 <th>Mật khẩu</th>
			 <th>Quyền</th>
			 <th></th>
		  </tr>
     </thead>`

	listUsers.map((value, index) => {
		users +=
			`<tbody>
		  <tr> 
			 <td>${value.userID}</td>
			 <td>${value.fullName}</td>
			 <td>${value.username}</td>
			 <td>${value.email}</td>
			 <td>${value.phone}</td>
			 <td>${value.password}</td>
			 <td>${value.role}</td>
			 <td class="btn-action">
			 <button>Edit</button>
			 <button>Delete</button>
			</td>
		  </tr>
     </tbody>`
	})

	document.getElementById('table-list-users').innerHTML = users;
}
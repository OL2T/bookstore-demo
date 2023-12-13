let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
let loggedin = localStorage.getItem('isLoggedIn');
let adminName = localStorage.getItem('fullname');
let cartArray = JSON.parse(localStorage.getItem('CartArray')) || [];
if (loggedin === 'true') {
  const adminNameElement = document.querySelector('.admin-name');

  adminNameElement.textContent = adminName;
}
function displayCustomerList() {
  const report = document.getElementById('report-container');
  report.innerHTML = '';
  const booktype = document.getElementsByClassName('booktype')[0];
  booktype.innerHTML = '';
  const oldBill = document.getElementsByClassName('main-bill')[0];
  if (oldBill) {
    oldBill.remove();
  }
  const oldCustomerManagement = document.getElementById('customer-management');
  if (oldCustomerManagement) {
    oldCustomerManagement.remove();
  }

  const main = document.getElementById('main');
  const customerManagement = document.createElement('div');
  customerManagement.classList.add('customer-management');
  customerManagement.id = 'customer-management';
  customerManagement.innerHTML = `
    <h3>Danh sách người dùng</h3>
    <div class="users-list">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Tên tài khoản</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Password</th>
            <th>Quyền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  `;

  for (let i = 0; i < listUsers.length; i++) {
    const user = listUsers[i];
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${user.fullName}</td>
      <td>${user.username}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn-edit" onclick="editUser(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn-delete" onclick="deleteUser(${i})"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    customerManagement.querySelector('tbody').appendChild(row);
  }

  main.appendChild(customerManagement);
  report.appendChild(customerManagement);

}

function deleteUser(index) {
  const user = listUsers[index];

  const deleteModal = document.createElement('div');
  deleteModal.classList.add('modal');
  deleteModal.id = 'deleteModal';
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
  <div class="modal-header">
      <div class="delete-header">Delete User</div>
      <div class="close">X</div>
    </div>
    <div class="modal-body">
      <p>Bạn có chắc muốn xóa khách hàng ${user.fullName}?</p>
    </div>
    <div class="modal-footer">
      <button id="confirmDeleteButton" onclick="confirmDeleteUser(${index})">Xác nhận</button>
      <button id="cancelDeleteButton" onclick="closeModal1()">Hủy</button>
    </div>
  `;

  const closeButton = modalContent.querySelector('.close');

  closeButton.addEventListener('click', closeModal1);

  deleteModal.appendChild(modalContent);
  document.body.appendChild(deleteModal);
  openModal1();
}

function confirmDeleteUser(index) {
  listUsers.splice(index, 1);
  localStorage.setItem('List-users', JSON.stringify(listUsers));
  closeModal1();
  displayCustomerList();
}

function openModal1() {
  const deleteModal = document.getElementById('deleteModal');
  if (deleteModal) {
    deleteModal.style.display = 'block';
  }
}

function closeModal1() {
  const deleteModal = document.getElementById('deleteModal');
  if (deleteModal) {
    deleteModal.remove();
  }
}


function openModal() {
  const editUserModal = document.getElementById('editUserModal');
  if (editUserModal) {
    editUserModal.style.display = 'block';
  }
}

function closeModal() {
  const editUserModal = document.getElementById('editUserModal');
  editUserModal.style.display = 'none';
}

function updateUser(event, index) {
  event.preventDefault();
  let user = listUsers[index];
  let carts = cartArray.filter(cart => cart.username === listUsers[index].username);
  let IDarray = carts.map(cart => cart.id);
  console.log(IDarray);
  console.log(carts);
  const name = document.getElementById('nameInput').value;
  const username = document.getElementById('usernameInput').value;
  const phone = document.getElementById('phoneInput').value;
  const email = document.getElementById('emailInput').value;
  const role = document.getElementById('roleInput').value;
  for (let i = 0; i < listUsers.length; i++) {
    if (username === listUsers[i].username) {
      alert('Tên đăng nhập đã tồn tại!');
      return;
    }
  }

  user.fullName = name;
  user.username = username;
  user.phone = phone;
  user.email = email;
  user.role = role;
  if (user.role !== 'admin')
    IDarray.forEach(id => {
      let matchedCart = cartArray.find(cart => cart.id === id);
      matchedCart.username = username;
    });

  localStorage.setItem('List-users', JSON.stringify(listUsers));
  localStorage.setItem('CartArray', JSON.stringify(cartArray));


  closeModal();
  displayCustomerList();

}

function handleChangeValue(event, inputId) {
  event.preventDefault();
  const input = document.getElementById(inputId);
  input.value = event.target.value; // Set the value property of the input element
}

function editUser(index) {
  const existingModal = document.getElementById('editUserModal');
  if (existingModal) {
    existingModal.remove();
  }
  let user = listUsers[index];
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = 'editUserModal';
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
    <form id="editUserForm">
      <div class="modal-header">
        <div class="edit-header">Edit User</div>
        <div class="close">X</div>
      </div>
      <div class="modal-body">
        <div>
          <label>Nhập tên khách hàng mới:</label>
          <input type="text" id="nameInput" value="${user.fullName}">
        </div>
        <div>
          <label>Nhập tên đăng nhập mới:</label>
          <input type="text" id="usernameInput" value="${user.username}">
        </div>
        <div>
          <label>Nhập số điện thoại mới:</label>
          <input type="text" id="phoneInput" value="${user.phone}">
        </div>
        <div>
          <label>Nhập email mới:</label>
          <input type="email" id="emailInput" value="${user.email}">
        </div>
        <div>
          <label>Nhập vai trò mới:</label>
          <input type="text" id="roleInput" value="${user.role}">
        </div>
      </div>
      <div class="modal-footer">
        <button id="saveButton">Save</button>
      </div>
    </form>
  `;

  const closeButton = modalContent.querySelector('.close');
  closeButton.addEventListener('click', closeModal);

  const saveButton = modalContent.querySelector('#saveButton');
  saveButton.addEventListener('click', function (event) {
    event.preventDefault();
    updateUser(event, index);
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  openModal();
}

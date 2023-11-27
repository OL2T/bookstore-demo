let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];

function displayCustomerList() {
  const reportContainer = document.querySelector('.report-container');
  reportContainer.innerHTML = '';
  const list = document.querySelector(".booktype");
  list.innerHTML = '';
  const main = document.getElementById('main');
  const customerManagement = document.createElement('div');
  customerManagement.classList.add('customer-div');
  customerManagement.classList.add('customer-management');
  customerManagement.id = 'customer-management';
  customerManagement.innerHTML = `
    <h3>Danh sách khách hàng</h3>
    <div class="users-list">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Tên tài khoản</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Password</th>
            <th>Vai trò</th>
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
        <button class="btn-edit" onclick="editUser(${i})">Sửa</button>
        <button class="btn-delete" onclick="deleteUser(${i})">Xóa</button>
      </td>
    `;
    customerManagement.querySelector('tbody').appendChild(row);
  }

  main.appendChild(customerManagement);
  reportContainer.appendChild(customerManagement);

}

function deleteUser(index) {
  const user = listUsers[index];
  const confirmation = confirm('Are you sure you want to delete this user?');

  if (confirmation) {
    listUsers.splice(index, 1);
    localStorage.setItem('List-users', JSON.stringify(listUsers));
    displayCustomerList();
  }
}

function editUser(index) {
  const user = listUsers[index];
  const confirmation = confirm('Are you sure you want to edit this user?');
  if (!confirmation) {
    return;
  }
  else {
    const name = prompt('Nhập tên khách hàng:', user.name);
    const username = prompt('Nhập tên tài khoản:', user.username);
    const phone = prompt('Nhập số điện thoại:', user.phone);
    const email = prompt('Nhập email:', user.email);
    const address = prompt('Nhập địa chỉ:', user.address);
    const role = prompt('Nhập vai trò:', user.role);

    user.name = name;
    user.username = username;
    user.phone = phone;
    user.email = email;
    user.address = address;
    user.role = role;

    localStorage.setItem('List-users', JSON.stringify(listUsers));
    displayCustomerList();
  }

}
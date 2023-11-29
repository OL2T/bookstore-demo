let listUsers = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];


function displayCustomerList() {
  let realUsers = listUsers.filter(user => user.role === "Khách hàng")
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

  for (let i = 0; i < realUsers.length; i++) {
    const user = realUsers[i];
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
        <button class="btn-edit" onclick="editUser('${user.username}')">Sửa</button>
        <button class="btn-delete" onclick="deleteUser('${user.username}')">Xóa</button>
      </td>
    `;
    customerManagement.querySelector('tbody').appendChild(row);
  }

  main.appendChild(customerManagement);
  reportContainer.appendChild(customerManagement);

}

function deleteUser(username) {
  const indexToRemove = listUsers.findIndex(user => user.username === username);
  console.log(indexToRemove);

  const confirmation = confirm('Are you sure you want to delete this user?');

  if (confirmation) {
    listUsers.splice(indexToRemove, 1);
    localStorage.setItem('List-users', JSON.stringify(listUsers));
    displayCustomerList();
  }
}

function editUser(username) {
  const indexToRemove = listUsers.findIndex(user => user.username === username);
  const confirmation = confirm('Are you sure you want to edit this user?');
  if (!confirmation) {
    return;
  }


}
function open() {
  const logoutModal = document.getElementById('logoutModal');
  if (logoutModal) {
    logoutModal.style.display = 'block';
  }
}

function close() {
  const logoutModal = document.getElementById('logoutModal');
  if (logoutModal) {
    logoutModal.style.display = 'none';
  }
}

function logoutAdmin(index) {
  const logoutModal = document.createElement('div');
  logoutModal.classList.add('modal');
  logoutModal.id = 'logoutModal';
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-title"> Đăng xuất</div>
      <div class="close" onclick="closeModal()">x</div>
    </div>
    <div class="modal-body">
      <p>Bạn có muốn đăng xuất khỏi tài khoản admin ?</p>
    </div>
    <div class="modal-footer">
      <button id="confirmDeleteButton" onclick="confirmLogout(${index})">Xác nhận</button>
      <button id="cancelDeleteButton" onclick="closeModal()">Hủy</button>
    </div>
  `;
  const closeButton = modalContent.querySelector('.close');

  closeButton.addEventListener('click', close);

  logoutModal.appendChild(modalContent);
  document.body.appendChild(logoutModal);
  open();
}

function confirmLogout(index) {
  close();
  // displayCustomerList();
  window.location.href = '../index.html';
  let user = localStorage.getItem('List-users') ? JSON.parse(localStorage.getItem('List-users')) : [];
  user.logout = true;
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem("loggedInUsername");
  localStorage.setItem('List-users', JSON.stringify(user));
}
let orders = JSON.parse(localStorage.getItem('CartArray')) || [];

function createBill() {
  const report = document.getElementById('report-container');
  report.style.display = 'none';
  const booktype = document.getElementsByClassName('booktype')[0];
  booktype.style.display = 'none';
  const oldCustomerManagement = document.getElementById('customer-management');
  if (oldCustomerManagement) {
    oldCustomerManagement.remove();
  }

  const main = document.getElementById('main');
  const main_bill = document.createElement('div');
  main_bill.classList.add('main-bill');

  const dateSection = document.createElement('section');
  dateSection.classList.add('date-section');

  const label1 = document.createElement('label');
  label1.htmlFor = 'start-date';
  label1.innerText = 'Từ ngày:';
  const input1 = document.createElement('input');
  input1.type = 'date';
  input1.id = 'start-date';

  const label2 = document.createElement('label');
  label2.htmlFor = 'end-date';
  label2.innerText = 'Đến ngày:';
  const input2 = document.createElement('input');
  input2.type = 'date';
  input2.id = 'end-date';

  const button = document.createElement('button');
  button.type = 'submit';
  button.innerText = 'Lọc đơn hàng';
  button.addEventListener('click', function () {
    filterOrders();
  });

  dateSection.appendChild(label1);
  dateSection.appendChild(input1);
  dateSection.appendChild(label2);
  dateSection.appendChild(input2);
  dateSection.appendChild(button);
  main_bill.appendChild(dateSection);
  main.appendChild(main_bill);

  const billListSection = document.createElement('section');
  billListSection.classList.add('bill-list-section');

  const bill_table = document.createElement('table');
  bill_table.classList.add('bill-table');
  bill_table.id = 'table';

  const bill_header = document.createElement('thead');
  bill_header.innerHTML = `
  <tr>
    <th>Mã đơn hàng</th>
    <th>Tên khách hàng</th>
    <th>Tên tài khoản</th>
    <th>Địa chỉ</th>
    <th>Số điện thoại</th>
    <th>Tổng tiền</th>
    <th>Ngày đặt</td>
    <th class="order-status">Trạng thái</th>
    <th class="see-order-detail" >Chi tiết đơn hàng</th>
  </tr>
 
`;
  bill_table.appendChild(bill_header);

  const bill_data = document.createElement('tbody');
  cartArray.forEach(order => {
    const orderItem = document.createElement('tr');
    orderItem.classList.add('order-item');
    orderItem.innerHTML = `

    <td>${order.id}</td>
    <td>${order.Khách_hàng}</td>
    <td>${order.username}</td>
    <td>${order.địa_chỉ}</td>
    <td>${order.phonenumber}</td>
    <td>${order.tổng_tiền}</td>
   <td>${order.date}</td>
    <td class="order-status">${order.status}</td>
    <td>
      <button class="view-btn" onclick="see_order_detail(${order.id})"><i class="fa-solid fa-eye"></i></button>
    </td>
     
  `;
    bill_data.appendChild(orderItem);
  });

  bill_table.appendChild(bill_data);
  billListSection.appendChild(bill_table);
  main_bill.appendChild(billListSection);
}

function see_order_detail(id) {

  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let data = ``;

  const order = cartArray.find(order => order.id === id);
  if (order) {
    order.products.forEach(product => {
      data += `
        <div class="views-row">
          <div class="view-row-content">
            <div class="view-field-image"><img src="${product.img}" alt="${product.name}"></div>
           <div class="book-order-info">
            <div class="view-field-title"><a href="#">${product.name}</a></div>   
              <div class="view-field-category">Thể loại: ${product.categories}</div>               
              <div class="view-field view-field-price">Đơn giá: ${formatVND.format(product.price)}</div> 
              <div class="book-order-quantity">Số lượng: ${product.quantity} </div>       
              <div class="view-field view-field-sub-total">Thành tiền: ${formatVND.format(product.price * product.quantity)}</div>
            </div>
          </div>
        </div>`;
    });
  }
  const detail = document.querySelector(".order-detail-popup");
  const detail1 = document.querySelector(".order-detail")
  detail.style.display = 'block';
  detail1.innerHTML = data;
  detail1.style.display = 'block';

}
function closeOrderDetailPopup() {
  const detail = document.querySelector(".order-detail-popup");
  detail.style.display = 'none';
}

var dataorder = [
  { id: 1, idbill: 10, name: "AAA", address: "HCM", date: '2023-01-01', price: 100, status: 'Chưa xử lý', detail: [{ id: 1, name: "San pham 1", quantity: 10, price: 100 }] },
  { id: 2, idbill: 11, name: "BBB", address: "HCM", date: '2023-01-02', price: 400, status: 'Đang xuất', detail: [{ id: 2, name: "San pham 2", quantity: 12, price: 400 }] },
  { id: 3, idbill: 12, name: "CCC", address: "HCM", date: '2023-01-03', price: 300, status: 'Đã xử lý', detail: [{ id: 3, name: "San pham 3", quantity: 3, price: 300 }] },
  { id: 4, idbill: 13, name: "DDD", address: "HCM", date: '2023-01-04', price: 200, status: 'Đang xuất', detail: [{ id: 4, name: "San pham 4", quantity: 7, price: 200 }] },
]

function createBill() {
  const reportContainer = document.querySelector('.report-container');
  reportContainer.innerHTML = '';
  reportContainer.style.display = 'none';

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
    <th>STT</th>
    <th>Mã đơn hàng</th>
    <th>Tên khách hàng</th>
    <th>Địa chỉ</th>
    <th>Ngày lập</th>
    <th>Tổng tiền</th>
    <th class="order-status">Trạng thái</th>
    <th>Chi tiết đơn hàng</th>
  </tr>
`;
  bill_table.appendChild(bill_header);

  displayOrders(dataorder);

  // const bill_data = document.createElement('tbody');
  // dataorder.forEach(order => {
  //   const orderItem = document.createElement('tr');
  //   orderItem.classList.add('order-item');
  //   orderItem.innerHTML = `
  //   <td>${order.id}</td>
  //   <td>${order.idbill}</td>
  //   <td>${order.name}</td>
  //   <td>${order.address}</td>
  //   <td>${order.date}</td>
  //   <td>${order.price}</td>
  //   <td class="order-status">${order.status}</td>
  //   <td>
  //     <button class="view-btn"><i class="fa-solid fa-eye"></i></button>
  //   </td>
  // `;
  //   bill_data.appendChild(orderItem);
  // });

  // bill_table.appendChild(bill_data);

  billListSection.appendChild(bill_table);
  main_bill.appendChild(billListSection);
}

function filterOrders() {
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);

  const filteredOrders = dataorder.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate >= startDate && orderDate <= endDate;
  });

  displayOrders(filteredOrders);
}

function displayOrders(dataorder) {
  const bill_table = document.getElementById('table');
  // bill_table.innerHTML = '';

  const bill_data = document.createElement('tbody');
  dataorder.forEach(order => {
    const orderItem = document.createElement('tr');
    orderItem.classList.add('order-item');
    orderItem.innerHTML = `
      <td>${order.id}</td>
      <td>${order.idbill}</td>
      <td>${order.name}</td>
      <td>${order.address}</td>
      <td>${order.date}</td>
      <td>${order.price}</td>
      <td class="order-status">${order.status}</td>
      <td>
        <button class="view-btn"><i class="fa-solid fa-eye"></i></button>
      </td>
    `;
    bill_data.appendChild(orderItem);
  });

  bill_table.appendChild(bill_data);
}
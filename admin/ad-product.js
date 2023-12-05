let arr = JSON.parse(localStorage.getItem('List-products'));

let data = '';
let IDarr = [];

arr.forEach(book => {
  IDarr.push(book.productId);
});

console.log(IDarr);


function bookSort() {

  let holder = document.querySelector(".report-container"); ``
  let list = document.querySelector(".booktype");
  data = ` 
  <div class="book-upload">

  <div class="upload-btn"><button class="upload-btn" onclick="showUploadForm()">Upload</button></div>
  <div class="pop-up-upload-form">
  <label for="book-upload-id">Book's ID:</label>
  <input type="text" id="book-upload-id" name="book-upload-id">
  <label for="book-upload-name">Book's title:</label>
  <input type="text" id="book-upload-name" name="book-upload-name">
  <label for="book-upload-price">Book's price:</label>
  <input type="text" id="book-upload-price" name="book-upload-price">
            <label for="book-category">Book's category:</label>
            <select id="book-upload-type" onchange="addnewType()">
             <option value="" disabled selected>Choose category</option>           
            <option value="Thiếu nhi">Thiếu nhi</option>
            <option value="Sách giáo khoa">Sách giáo khoa</option>
            <option value="Sách ngoại ngữ">Sách ngoại ngữ</option>
            <option value="Văn học">Văn học</option>
            <option value="Khác">Khác</option>           
            </select>
            <div id="other-category-input" style="display: none;">
  <label for="book-upload-other-category">Other Category:</label>
  <input type="text" id="book-upload-other-category" name="book-upload-other-category">
</div>

   <label for="book-upload-author">Book's author:</label>
  <input type="text" id="book-upload-author" name="book-upload-author">
   <label for="book-upload-publisher">Book's publisher:</label>
  <input type="text" id="book-upload-publisher" name="book-upload-publisher">
  <label for="myfile">Select a file:</label>
  <input type="file" id="myfile" name="myfile" accept="image/*" onchange="handleImageUpload(event)">
  <div class="image-container"></div>
  <div class="upload-form-btn">
  <button class="saving-upload-form" onclick="validateAndSave()" >Save</button>
  <button class="cancel-upload" onclick="closeUploadForm()">Cancel</button>
  </div>
  </div>

   <div class="pop-up-edit-form">
  <label for="book-edit-id">Book's ID:</label>
  <input type="text" id="book-edit-id" name="book-edit-id">
  <label for="book-edit-name">Book's title:</label>
  <input type="text" id="book-edit-name" name="book-edit-name">
  <label for="book-edit-price">Book's price:</label>
  <input type="text" id="book-edit-price" name="book-edit-price">
            <label for="book-category">Book's category:</label>
            <select id="book-edit-type" onchange="addnewTypeedit()">
             <option value="" disabled selected>Choose category</option>
            <option value="Thiếu nhi">Thiếu nhi</option>
            <option value="Sách giáo khoa">Sách giáo khoa</option>
            <option value="Sách ngoại ngữ">Sách ngoại ngữ</option>
            <option value="Văn học">Văn học</option>
             <option value="Khác">Khác</option>
            </select>
            <div id="other-category-input-edit" style="display: none;">
  <label for="book-edit-other-category">Other Category:</label>
  <input type="text" id="book-edit-other-category" name="book-edit-other-category">
</div>
   <label for="book-edit-author">Book's author:</label>
  <input type="text" id="book-edit-author" name="book-edit-author">
   <label for="book-edit-publisher">Book's publisher:</label>
  <input type="text" id="book-edit-publisher" name="book-edit-publisher">
  <label for="myfile">Select a file:</label>
  <input type="file" id="myfile" name="myfile" accept="image/*" onchange="handleImageUpload(event)">
  <div class="image-container"></div>
  <div class="edit-form-btn">
  <button class="saving-form">Save</button>
  <button class="cancel-edit" onclick="closeEditForm()">Cancel</button>
  </div>
</div>
    <div class="book-category">
      <select id="categoryDropdown">
      <option value="" disabled selected>Select a category</option>
       <option value="Tất cả">Tất cả</option>
        <option value="Thiếu nhi">Thiếu nhi</option>
        <option value="Sách ngoại ngữ">Sách ngoại ngữ</option>
        <option value="Sách giáo khoa">Sách giáo khoa</option>
        <option value="Văn học">Văn học</option>
      </select>
    </div>`;
  holder.innerHTML = ' ';
  list.innerHTML = data;

  let dropdown = document.getElementById('categoryDropdown');
  dropdown.addEventListener('change', function () {
    let selectedCategory = dropdown.value;
    displayProducts(selectedCategory);
  });
}

function displayProducts(category) {
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let selectedCategory = category;
  let categoryBooks = arr.filter(product => product.categories === selectedCategory);
  if (category === "Tất cả") {
    categoryBooks = arr;
  }

  let categoryContainer = document.querySelector(".report-container");
  categoryContainer.innerHTML = '';

  categoryBooks.forEach(book => {

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-row');

    const bookContent = `
      <div class="book-row-content">
        <div class="book-image">
          <img src="${book.img}" alt="${book.name}">
        </div>
        <div class="book-info">
          <div class="book-title">Tên: ${book.name}</div>
          <div class="book-id">Mã: ${book.productId}</div>
          <div class="book-category">Thể loại: ${book.categories}</div>
          <div class="book-author">Tác giả: ${book.author}</div>
          <div class ="book-publisher">NXB: ${book.publishingHouse}</div>
          <div class="book-price">Giá: ${formatVND.format(book.price)}</div>
        </div>
        <div class="book-list-btns">
        <button class="edit-book-btn" onclick="showEditForm(this)">Edit</button>
        <button class="delete-book-btn" data-productId="${book.productId}">Delete</button>
      </div>
    `;

    bookDiv.innerHTML = bookContent;
    categoryContainer.appendChild(bookDiv);
  });

  const deleteButtons = document.querySelectorAll('.delete-book-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const confirmed = window.confirm('Are you sure you want to delete this book?');
      if (confirmed) {

        const bookRow = event.target.closest('.book-row');
        const bookId = bookRow.querySelector('.book-id').textContent.split(':')[1].trim(); // Get the book ID and remove extra whitespace
        console.log(bookId)// Get the productId from the data attribute

        // Use productId to remove the corresponding book
        const indexToRemove = arr.findIndex(product => product.productId.toString() === bookId);
        console.log(indexToRemove);
        if (indexToRemove !== -1) {
          arr.splice(indexToRemove, 1);
          localStorage.setItem('List-products', JSON.stringify(arr));
          displayProducts(category);

        }
      }
    });
  });
}
function addnewType() {
  var selectElement = document.getElementById("book-upload-type");
  var selectedValue = selectElement.value;

  var otherCategoryInput = document.getElementById("other-category-input");

  if (selectedValue === "Khác") {
    otherCategoryInput.style.display = "block";
  } else {
    otherCategoryInput.style.display = "none";
  }
}
function addnewTypeedit() {
  var selectElement = document.getElementById("book-edit-type");
  var selectedValue = selectElement.value;

  var otherCategoryInput = document.getElementById("other-category-input-edit");

  if (selectedValue === "Khác") {
    otherCategoryInput.style.display = "block";
  } else {
    otherCategoryInput.style.display = "none";
  }
}


function handleImageUpload(event) {
  const uploadedImage = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const imgElement = document.createElement('img');
    imgElement.src = e.target.result;


    imgElement.style.maxWidth = '70%';
    imgElement.style.height = 'auto';

    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imgElement);
  };

  reader.readAsDataURL(uploadedImage);
}


function validateAndSave() {
  var bookId = document.getElementById('book-upload-id').value.trim();
  var bookTitle = document.getElementById('book-upload-name').value.trim();
  var bookPrice = document.getElementById('book-upload-price').value.trim();
  var bookCategory = document.getElementById('book-upload-type').value.trim();
  var bookAuthor = document.getElementById('book-upload-author').value.trim();
  var bookPublisher = document.getElementById('book-upload-publisher').value.trim();
  var Regex = /^\d+$/; // 
  var isValidPrice = Regex.test(bookPrice);
  var isValidID = Regex.test(bookId);

  if (bookId === '' || bookTitle === '' || bookPrice === '' || bookAuthor === '' || bookPublisher === '') {
    alert('Please fill in all required fields.');
    return;
  }
  if (!isValidPrice) {
    alert('Please enter a valid price');
    return;
  }

  var idExists = false;
  for (var i = 0; i < IDarr.length; i++) {
    if (IDarr[i] === parseInt(bookId)) {
      idExists = true;
      break;
    }
  }

  if (!isValidID || idExists) {
    alert('ID is not valid or already exists');
    return;
  }


  // Get the value of the selected category
  var selectedCategory = document.getElementById('book-upload-type').value.trim();
  var otherCategoryInput = document.getElementById('book-upload-other-category');

  // If "Khác" (Other) category is selected, use the value from the other category input field
  if (selectedCategory === 'Khác') {
    bookCategory = otherCategoryInput.value.trim();

    if (bookCategory === '') {
      alert('Please specify the other category');
      return;
    }
  }

  const imgElement = document.querySelector('.image-container img');
  const imageData = imgElement ? imgElement.src : '';

  if (imageData === '') {
    alert('Please upload an image');
    return;
  }

  const product = {
    productId: parseInt(bookId),
    productId: parseInt(bookId),
    categories: bookCategory,
    author: bookAuthor,
    publishingHouse: bookPublisher,
    img: imageData,
    name: bookTitle,
    price: parseInt(bookPrice)
  };

  console.log(product);
  saveProduct(product);
  alert('Product added');
}

function saveProduct(product) {

  let products = JSON.parse(localStorage.getItem('List-products')) || [];
  products.push(product);
  localStorage.setItem('List-products', JSON.stringify(products));
}

function showUploadForm() {
  var uploadForm = document.querySelector('.pop-up-upload-form');
  uploadForm.style.display = 'block';


}
function showEditForm(editButton) {

  var uploadForm = document.querySelector('.pop-up-edit-form');
  uploadForm.style.display = 'block';
  var bookRow = editButton.closest('.book-row-content');
  var bookIdvalue = bookRow.querySelector('.book-id').textContent.split(':')[1].trim();


  let arr = JSON.parse(localStorage.getItem('List-products'));
  const Book = arr.find(book => book.productId.toString() === bookIdvalue);

  var bookId = document.getElementById('book-edit-id');
  bookId.placeholder = Book.productId + " (not editable)";
  bookId.disabled = true;
  var bookTitle = document.getElementById('book-edit-name');
  bookTitle.placeholder = Book.name;
  var bookPrice = document.getElementById('book-edit-price');
  bookPrice.placeholder = Book.price;
  var bookCategory = document.getElementById('book-edit-type');
  bookCategory.placeholder = Book.categories;
  var bookAuthor = document.getElementById('book-edit-author');
  bookAuthor.placeholder = Book.author;
  var bookPublisher = document.getElementById('book-edit-publisher');
  bookPublisher.placeholder = Book.publishingHouse;




  console.log('Found Book:', Book);

  const editButtons = document.querySelectorAll('.saving-form');
  editButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const confirmed = window.confirm('Are you sure you want to save the editing to this book?');
      if (confirmed) {
        var bookTitle = document.getElementById('book-edit-name').value.trim();

        var bookPrice = document.getElementById('book-edit-price').value.trim();
        var bookCategory = document.getElementById('book-edit-type').value.trim();
        var bookAuthor = document.getElementById('book-edit-author').value.trim();
        var bookPublisher = document.getElementById('book-edit-publisher').value.trim();
        var imgElement = document.querySelector('.image-container img');
        var imageData = imgElement ? imgElement.src : '';

        var selectedCategory = document.getElementById('book-edit-type').value.trim();
        var otherCategoryInput = document.getElementById('book-edit-other-category');


        if (selectedCategory === 'Khác') {
          bookCategory = otherCategoryInput.value.trim();

          if (bookCategory === '') {
            alert('Please specify the other category');
            return;
          }
        }
        if (bookTitle === '') {
          bookTitle = Book.name;
        }
        if (bookPrice.toString() === '') {
          bookPrice = Book.price.toString();
        }
        if (bookCategory === '') {
          bookCategory = Book.categories;
        } if (bookAuthor === '') {
          bookAuthor = Book.author;
        }
        if (bookPublisher === '') {
          bookPublisher = Book.publishingHouse;
        }
        if (imageData === '') {
          imageData = Book.img;
        }
        var Regex = /^\d+$/; // 
        var isValidPrice = Regex.test(bookPrice);
        if (!isValidPrice) {
          alert('Please enter a valid price');
          return;
        }

        Book.name = Book.price = Book.categories = Book.author = Book.publishingHouse = Book.img = '';
        Book.name = bookTitle;
        Book.price = parseInt(bookPrice);
        Book.categories = bookCategory;
        Book.author = bookAuthor;
        Book.publishingHouse = bookPublisher;
        Book.img = imageData;
        console.log(Book);
        localStorage.setItem('List-products', JSON.stringify(arr));
        alert("Saved");
        return;
      }
    });
  });
}


function closeUploadForm() {
  var uploadForm = document.querySelector('.pop-up-upload-form');
  uploadForm.style.display = 'none';
}
function closeEditForm() {
  var uploadForm = document.querySelector('.pop-up-edit-form');
  uploadForm.style.display = 'none';
}
function overviewLoading() {
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const reportContainer = document.querySelector('.report-container');
  reportContainer.innerHTML = '';
  const list = document.querySelector(".booktype");
  list.innerHTML = '';

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
  button.innerText = 'Lọc';
  dateSection.appendChild(label1);
  dateSection.appendChild(input1);
  dateSection.appendChild(label2);
  dateSection.appendChild(input2);
  dateSection.appendChild(button);
  main_bill.appendChild(dateSection);
  main.appendChild(main_bill);
  reportContainer.appendChild(main_bill);
  const container = document.createElement('div');
  container.classList.add('overview-container');

  const data = document.createElement('div');
  data.innerHTML = `
    <div class="total-sold"><h3>Đã bán</h3><span class="total-count"></span></div>
   <div class="overview-container">

      <div class="van-hoc"><h4>Văn học</h4><span class="van-hoc-count"></span></div>
      <div class="ngoai-ngu"><h4>Ngoại ngữ</h4><span class="ngoai-ngu-count"></span></div>
      <div class="thieu-nhi"><h4>Thiếu nhi</h4><span class="thieu-nhi-count"></span></div>
      <div class="giao-khoa"><h4>Giáo khoa</h4><span class="giao-khoa-count"></span></div>
    </div>
  `;
  reportContainer.appendChild(data);
  const arr = localStorage.getItem("Sold") ? JSON.parse(localStorage.getItem('Sold')) : [];
  console.log(arr);

  let van_hoc = [];
  let ngoai_ngu = [];
  let giao_khoa = [];
  let thieu_nhi = [];

  van_hoc = arr.filter(sold => sold.category === "Văn học");
  ngoai_ngu = arr.filter(sold => sold.category === "Sách ngoại ngữ");
  giao_khoa = arr.filter(sold => sold.category === "Sách giáo khoa");
  thieu_nhi = arr.filter(sold => sold.category === "Thiếu nhi");
  console.log(van_hoc);


  let all_van_hoc = 0; let all_ngoai_ngu = 0; let all_giao_khoa = 0; let all_thieu_nhi = 0;
  van_hoc.forEach(book => {
    all_van_hoc += book.quantity;
  }
  )
  ngoai_ngu.forEach(book => {
    all_ngoai_ngu += book.quantity;
  }
  )
  giao_khoa.forEach(book => {
    all_giao_khoa += book.quantity;
  }
  )
  thieu_nhi.forEach(book => {
    all_thieu_nhi += book.quantity;
  }
  )
  let vh = document.querySelector('.van-hoc .van-hoc-count');
  vh.textContent = all_van_hoc.toString();
  let nn = document.querySelector('.ngoai-ngu .ngoai-ngu-count');
  nn.textContent = all_ngoai_ngu.toString();
  let gk = document.querySelector('.giao-khoa .giao-khoa-count');
  gk.textContent = all_giao_khoa.toString();
  let tn = document.querySelector('.thieu-nhi .thieu-nhi-count');
  tn.textContent = all_thieu_nhi.toString();
  let total = document.querySelector('.total-sold .total-count');
  total.textContent = (all_giao_khoa + all_ngoai_ngu + all_van_hoc + all_thieu_nhi).toString();
  console.log(all_van_hoc);

  button.addEventListener('click', function () {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const total_in_days = arr.filter(book => {
      const bookDate = new Date(book.date);
      return bookDate >= startDateObj && bookDate <= endDateObj;
    })
    let total_in_days_count = 0;
    total_in_days.forEach(book => {
      total_in_days_count += book.quantity;
    })
    total.textContent = total_in_days_count.toString();
    //
    const filtered_van_hoc = van_hoc.filter(book => {

      const bookDate = new Date(book.date);
      return bookDate >= startDateObj && bookDate <= endDateObj;

    });
    let x = 0;
    console.log(filtered_van_hoc);
    filtered_van_hoc.forEach(book => {
      x += book.quantity;

    })
    vh.textContent = x.toString();
    //

    const filtered_ngoai_ngu = ngoai_ngu.filter(book => {

      const bookDate = new Date(book.date);
      return bookDate >= startDateObj && bookDate <= endDateObj;

    });
    let y = 0;

    filtered_ngoai_ngu.forEach(book => {
      y += book.quantity;

    })
    nn.textContent = y.toString();
    //
    const filtered_thieu_nhi = thieu_nhi.filter(book => {

      const bookDate = new Date(book.date);
      return bookDate >= startDateObj && bookDate <= endDateObj;

    });
    let z = 0;

    filtered_thieu_nhi.forEach(book => {
      z += book.quantity;

    })
    console.log(z);
    //
    tn.textContent = z.toString();
    const filtered_giao_khoa = giao_khoa.filter(book => {

      const bookDate = new Date(book.date);
      return bookDate >= startDateObj && bookDate <= endDateObj;

    });
    let v = 0;

    filtered_giao_khoa.forEach(book => {
      v += book.quantity;

    })
    gk.textContent = v.toString();
  });
}
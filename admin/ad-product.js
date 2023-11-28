let arr = JSON.parse(localStorage.getItem('List-products'));
let data = '';

function bookSort() {
  let holder = document.querySelector(".report-container");
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
            <select id="book-upload-type">
             <option value="" disabled selected>Choose category</option>
            <option value="type1">Thiếu nhi</option>
            <option value="type2">Sách giáo khoa</option>
            <option value="type3">Sách ngoại ngữ</option>
            <option value="type4">Văn học</option>
            </select>
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
  <label for="book-edit-id">Book's mmmID:</label>
  <input type="text" id="book-edit-id" name="book-edit-id">
  <label for="book-edit-name">Book's title:</label>
  <input type="text" id="book-edit-name" name="book-edit-name">
  <label for="book-edit-price">Book's price:</label>
  <input type="text" id="book-edit-price" name="book-edit-price">
            <label for="book-category">Book's category:</label>
            <select id="book-edit-type">
             <option value="" disabled selected>Choose category</option>
            <option value="type1">Thiếu nhi</option>
            <option value="type2">Sách giáo khoa</option>
            <option value="type3">Sách ngoại ngữ</option>
            <option value="type4">Văn học</option>
            </select>
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
          const bookRow = event.target.closest('.book-row');
          if (bookRow) {
            bookRow.remove();
          }
        }
      }
    });
  });
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

  if (bookId === '' || bookTitle === '' || bookPrice === '' || bookCategory === '' || bookAuthor === '' || bookPublisher === '') {
    alert('Please fill in all fields.');
    return;
  }
  if (!isValidPrice) {
    alert('Please enter a valid price');
    return;
  }
  if (!isValidID) {
    alert('Please enter a valid ID');
    return;
  }
  const imgElement = document.querySelector('.image-container img');
  const imageData = imgElement ? imgElement.src : '';

  if (imageData === '') {
    alert('Please upload an image');
    return;
  }
  const product = {
    productId: bookId,
    categories: bookCategory,
    author: bookAuthor,
    publishingHouse: bookPublisher,
    img: imageData,
    name: bookTitle,
    price: bookPrice
  }
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
  var bookId = document.getElementById('book-upload-id');

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






  // var imgElement = document.querySelector('.image-container img');
  // var imageData = imgElement ? imgElement.src : '';
  // if (bookTitlenew === '') {
  //   bookTitlenew = Book.name;
  // }
  // if (bookPricenew === '') {
  //   bookPricenew = Book.price;
  // }
  // if (bookCategorynew === '') {
  //   bookCategorynew = Book.categories;
  // } if (bookAuthornew === '') {
  //   bookAuthornew = Book.author;
  // }
  // if (bookPublishernew === '') {
  //   bookPublishernew = Book.publishingHouse;
  // }
  // if (imgElement === '') {
  //   imgElement = Book.img;
  // }

  console.log('Found Book:', Book);
  // console.log(bookTitlenew);
  const editButtons = document.querySelectorAll('.saving-form');
  editButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const confirmed = window.confirm('Are you sure you want to save the editing to this book?');
      if (confirmed) {


        var bookId = document.getElementById('book-edit-id').value.trim();

        var bookTitle = document.getElementById('book-edit-name').value.trim();

        var bookPrice = document.getElementById('book-edit-price').value.trim();
        var bookCategory = document.getElementById('book-edit-type').value.trim();
        var bookAuthor = document.getElementById('book-edit-author').value.trim();
        var bookPublisher = document.getElementById('book-edit-publisher').value.trim();
        var bookImg = document.getElementById



        var imgElement = document.querySelector('.image-container img');
        var imageData = imgElement ? imgElement.src : '';
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
        Book.name = Book.price = Book.categories = Book.author = Book.publishingHouse = Book.img = '';
        Book.name = bookTitle;

        Book.price = bookPrice;
        Book.categories = bookCategory;
        Book.author = bookAuthor;
        Book.publishingHouse = bookPublisher;
        Book.img = imageData;
        console.log(Book);

        localStorage.setItem('List-products', JSON.stringify(arr));
        alert("Saved");


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
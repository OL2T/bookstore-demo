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
   <label for="book-upload-type">Book's category:</label>
  <input type="text" id="book-upload-type" name="book-upload-type">
   <label for="book-upload-author">Book's author:</label>
  <input type="text" id="book-upload-author" name="book-upload-author">
   <label for="book-upload-publisher">Book's publisher:</label>
  <input type="text" id="book-upload-publisher" name="book-upload-publisher">
  <label for="myfile">Select a file:</label>
  <input type="file" id="myfile" name="myfile" accept="image/*" onchange="handleImageUpload(event)">
  <div class="image-container"></div>
  <div class="upload-form-btn">
  <button onclick="validateAndSave()">Save</button>
  <button class="cancel-upload" onclick="closeUploadForm()">Cancel</button>
  </div>
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
        <div class="book-category">${book.categories}</div>
        <div class="book-title">${book.name}</div>
        <button class="delete-book-btn">Delete</button>
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
        const bookRow = event.target.parentElement.parentElement;

        const indexToRemove = arr.findIndex(product => product.name === bookRow.querySelector('.book-title').textContent);
        if (indexToRemove !== -1) {
          arr.splice(indexToRemove, 1);

          localStorage.setItem('List-products', JSON.stringify(arr));

          bookRow.remove();
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


    imgElement.style.maxWidth = '100%';
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
}

function closeUploadForm() {
  var uploadForm = document.querySelector('.pop-up-upload-form');
  uploadForm.style.display = 'none';
}
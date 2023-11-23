let arr = JSON.parse(localStorage.getItem('List-products'));
let data = '';

function bookSort() {
  let holder = document.querySelector(".report-container");
  let list = document.querySelector(".booktype");
  data = `
  <div class="book-upload">
  <div class="upload-btn"><button class="upload-btn" onclick="showUploadForm()">Upload</button></div>
  <div class="pop-up-upload-form">
  
  <label for="book-upload-name">Book's title:</label>
  <input type="text" id="book-upload-name" name="book-upload-name">
  <label for="book-upload-price">Book's price:</label>
  <input type="text" id="book-upload-price" name="book-upload-price">
  <label for="book-upload-id">Book's ID:</label>
  <input type="text" id="book-upload-id" name="book-upload-id">
  <label for="myfile">Select a file:</label>
  <input type="file" id="myfile" name="myfile">
  <div class="upload-form-btn">
  <button onclick="saveBookToLocalStorage()">Save</button>
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

  // Get the dropdown element after adding it to the DOM
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
  categoryContainer.innerHTML = ''; // Clear existing content

  categoryBooks.forEach(book => {
    // Creating a div element to hold the book details and delete button
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-row');

    const bookContent = `
      <div class="book-row-content">
        <div class="book-image">
          <img src="../${book.img}" alt="${book.name}">
        </div>
        <div class="book-category">${book.categories}</div>
        <div class="book-title">${book.name}</div>
        <button class="delete-book-btn">Delete</button>
      </div>
    `;

    bookDiv.innerHTML = bookContent;

    // Appending bookDiv to the category container
    categoryContainer.appendChild(bookDiv);
  });


  const deleteButtons = document.querySelectorAll('.delete-book-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const confirmed = window.confirm('Are you sure you want to delete this book?');
      if (confirmed) {
        const bookRow = event.target.parentElement.parentElement;

        // Find the index of the book in the array by its name or ID
        const indexToRemove = arr.findIndex(product => product.name === bookRow.querySelector('.book-title').textContent);
        if (indexToRemove !== -1) {
          arr.splice(indexToRemove, 1);

          // Update the localStorage with the modified array
          localStorage.setItem('List-products', JSON.stringify(arr));

          // Remove the book from the display
          bookRow.remove();
          // Add logic here to delete the book data from your storage (localStorage, database, etc.)
        }
      }
    });
  });
}
function handleImageUpload() {
  const uploadBtn = document.querySelector('.upload-book-btn');

  uploadBtn.addEventListener('click', function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Accept only image files

    fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        // Handle the uploaded file here, for example, display a preview:
        const reader = new FileReader();
        reader.onload = function (event) {
          const imgPreview = document.createElement('img');
          imgPreview.src = event.target.result;
          document.body.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
      }
    });

    // Trigger the file input click to open the file selection dialog
    fileInput.click();
  });
}

// Helper function to generate a unique product ID
function generateProductId() {
  return Math.floor(Math.random() * 100000) + 1;
}

function showUploadForm() {
  var uploadForm = document.querySelector('.pop-up-upload-form');
  uploadForm.style.display = 'block';
}

function closeUploadForm() {
  var uploadForm = document.querySelector('.pop-up-upload-form');
  uploadForm.style.display = 'none';
}
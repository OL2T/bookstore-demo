let storedProducts = localStorage.getItem('List-products') ? JSON.parse(localStorage.getItem('List-products')) : [];
const inputSearch = document.getElementById('search-desktop')
let count = document.getElementById('count')
let currentPage = 1;
let itemPerPage = 8;
let totalPage = 0;
let perProducts = storedProducts.slice(
	(currentPage - 1) * itemPerPage,
	(currentPage - 1) * itemPerPage + itemPerPage,
)



function renderProductSearch(array) {
	// totalPage = Math.ceil(array.length / itemPerPage);
	// let perProducts = array.slice(
	//  (currentPage - 1) * itemPerPage,
	//  (currentPage - 1) * itemPerPage + itemPerPage,
	// )
	let products = document.getElementById('product-by-search');
	// let formatVND = new Intl.NumberFormat("vi-VN", {
	// 	style: "currency",
	// 	currency: "VND",
	// });

	let data = ``;
	array.map((productArray) => {
		data += `
		<div class="views-row">
			<div class="view-row-content" >
			  <div class="view-field-image" >
				  <a href="#"><img src="${productArray.img}" alt="${productArray.name}" style="object-fit: contain;"></a>
				  <div class="product-buttons">
					  <div class="action quick-view">
					  <span class="tool-tip">Xem chi tiết</span>
					  <button class="btn-action btn-quick-view" onclick="renderViewDetailProduct(${productArray.productId})"></button>
					  </div>
					  <div class="action add-to-cart">
					  <span class="tool-tip">Thêm vào giỏ hàng</span>
					  <button class="btn-action btn-add-to-cart" onclick="addTocCart(${productArray.productId})"></button>
					  </div>
				  </div>
			  </div>
			  <div class="content-wrapper">
			  <div class="view-field-category"><span>${productArray.categories}</span></div>
			  <div class="view-field-title"><a href="#">${productArray.name}</a></div>
			  <div class="view-field-author"><span>Tác giả: </span><span class="author-title">${productArray.author}</span></div>
			  <div class="view-field-price"><p>${formatVND.format(productArray.price)}</p></div>
			  </div>
			</div>
		</div>
		
	 	`;
	});
	products.querySelector('.view-content-wrapper').innerHTML = data;
	// renderPagination(perProducts);
}

function renderPagination(array) {
	totalPage = Math.ceil(array.length / itemPerPage);
	const wrapper = document.getElementById('product-by-search')
	const pagination = document.createElement('ul')
	pagination.classList.add('custom-pagination')
	wrapper.appendChild(pagination)
	for (let i = 1; i <= totalPage; i++) {
		// pagination.innerHTML += `<li class="pagination-item" onclick="handlePageNumber(${i})">${i}</li>`
		let newPage = document.createElement('li')
		newPage.classList.add('pagination-item')
		newPage.innerText = i;
		if (i === currentPage) {
			newPage.classList.add('is-active');
		}
		// newPage.setAttribute('onclick', "handlePageNumber(" + i + ")");
		newPage.addEventListener('click', function () {
			handlePageNumber(i, array);
			highlightActivePage(i);
		});
		pagination.appendChild(newPage);
	}
}

function handlePageNumber(num, array) {
	currentPage = num
	perProducts = array.slice(
		(currentPage - 1) * itemPerPage,
		(currentPage - 1) * itemPerPage + itemPerPage,
	)
	renderProductSearch(perProducts);
}

function highlightActivePage(pageNumber) {
	const paginationItems = document.querySelectorAll('.pagination-item');
	paginationItems.forEach(item => {
		if (parseInt(item.innerText) === pageNumber) {
			item.classList.add('is-active');
		} else {
			item.classList.remove('is-active');
		}
	});
}

function searchByTitle() {
	let valueSearch = inputSearch.value;
	let userSearch = storedProducts.filter(value => {
		return value.name.toUpperCase().includes(valueSearch.toUpperCase());
	})
	window.location.href = `search.html?query=${encodeURIComponent(valueSearch)}`;
	// console.log(encodeURIComponent(valueSearch))
	renderProductSearch(userSearch);
	// renderPagination(userSearch)
}

function searchLoadPage() {
	const btnSearch = document.getElementById('btn-search')

	inputSearch.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			searchByTitle();
		}
	});

	btnSearch.addEventListener('click', function () {
		searchByTitle();
	});
}

function applyFilter(array) {
	let form = document.querySelector('.filter-search');
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const wrapper = document.getElementById('product-by-search');
		const existingPagination = wrapper.querySelector('.custom-pagination');
		if (existingPagination) {
			wrapper.removeChild(existingPagination);
		}

		let valueFilter = e.target.elements;
		// console.log(valueFilter)
		let productFilter = array.filter(item => {
			let literature = item.categories === 'Văn học';
			let childrenBook = item.categories === 'Thiếu nhi';
			let textbook = item.categories === 'Sách giáo khoa';
			let foreignLanguageBook = item.categories === 'Sách ngoại ngữ';

			if (valueFilter.category.value !== '') {
				if (item.categories !== valueFilter.category.value) {
					return false;
				}
			}

			if (valueFilter.minPrice.value !== '') {
				if (item.price < valueFilter.minPrice.value) {
					return false;
				}
			}

			if (valueFilter.maxPrice.value !== '') {
				if (item.price > valueFilter.maxPrice.value) {
					return false;
				}
			}

			if (valueFilter.minPrice.value !== '' && valueFilter.maxPrice.value !== '') {
				if (item.price < valueFilter.minPrice.value && item.price > valueFilter.maxPrice.value) {
					return false
				}
			}


			// console.log(item.categories)
			return true;
		})
		console.log(productFilter)
		let perProducts = productFilter.slice(
			(currentPage - 1) * itemPerPage,
			(currentPage - 1) * itemPerPage + itemPerPage,
		)
		renderProductSearch(perProducts);
		renderPagination(productFilter);
		count.innerText = productFilter.length;
	})
}

// Check if the current page is search.html and render results accordingly
if (window.location.pathname.includes('search.html')) {
	const searchQuery = new URLSearchParams(window.location.search).get('query');
	// const item = document.querySelectorAll('.category')
	if (searchQuery) {
		inputSearch.value = decodeURIComponent(searchQuery);
		let valueSearch = storedProducts.filter(value => value.name.toUpperCase().includes(inputSearch.value.toUpperCase()));
		let perProducts = valueSearch.slice(
			(currentPage - 1) * itemPerPage,
			(currentPage - 1) * itemPerPage + itemPerPage,
		)
		renderProductSearch(perProducts)
		count.innerText = valueSearch.length;
		renderPagination(valueSearch)
		applyFilter(valueSearch)

	} else {
		renderProductSearch(perProducts);
		count.innerText = storedProducts.length;
		applyFilter(storedProducts)
		renderPagination(storedProducts);
	}
}



var categories = [
	{
		id: "literature",
		name: "Văn học",
	},
	{
		id: "children-book",
		name: "Thiếu nhi",
	},
	{
		id: "textbook",
		name: "Sách giáo khoa",
	},
	{
		id: "foreign-language-book",
		name: "Sách ngoại ngữ",
	}
];

let formatVND = new Intl.NumberFormat('vi-VN', {
	style: 'currency',
	currency: 'VND',
});

function renderProductItems(products, wrapDiv) {
	if (products.length === 0) {
		const contentDiv = document.createElement('div');
		contentDiv.innerText = 'Không tìm thấy sản phẩm';
		wrapDiv.appendChild(contentDiv);
	} else {
		products.forEach(productArray => {
			const productDiv = document.createElement('div');
			productDiv.classList.add('views-row');
			const urlPath = location.href;
			const splitPath = urlPath.split('/');
			if (splitPath[splitPath.length - 1] !== 'index.html') {
				productDiv.classList.add('width-33');
			}

			productDiv.innerHTML = `
			<div class="view-row-content" >
				<div class="view-field-image" >
					<a href="#"><img src="${productArray.img}" alt="${productArray.name}"></a>
					<div class="product-buttons">
						<div class="action quick-view">
						<span class="tool-tip">Xem chi tiết</span>
						<button class="btn-action btn-quick-view" onclick="renderViewDetailProduct(${productArray.productId})"></button>
						</div>
						<div class="action add-to-cart">
						<span class="tool-tip">Thêm vào giỏ hàng</span>
						<button class="btn-action btn-add-to-cart" onclick="addTocCart(${productArray.productId
				})"></button>
						</div>
					</div>
				</div>
				<div class="content-wrapper">
				<div class="view-field-category"><span>${productArray.categories}</span></div>
				<div class="view-field-title"><a href="#">${productArray.name}</a></div>
				<div class="view-field-author"><span>Tác giả: </span><span class="author-title">${productArray.author}</span></div>
				<div class="view-field-price"><p>${formatVND.format(productArray.price)}</p></div>
				</div>
			</div>`;
			wrapDiv.appendChild(productDiv);
		});
	}
}

function renderProductList() {
	let storedProducts = localStorage.getItem('List-products') ? JSON.parse(localStorage.getItem('List-products')) : [];

	let literatureProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Văn học") {
			literatureProductList.push(product);
		}
	});
	let childrenBookProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Thiếu nhi") {
			childrenBookProductList.push(product);
		}
	});
	let textbookProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Sách giáo khoa") {
			textbookProductList.push(product);
		}
	});
	let foreignLanguageBookProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Sách ngoại ngữ") {
			foreignLanguageBookProductList.push(product);
		}
	});

	const main_content = document.getElementById('main-content');

	categories.forEach(category => {
		const categorySection = document.createElement('section');
		categorySection.classList.add('section', 'section-product-list');
		categorySection.id = category.id;

		const categoryHeader = document.createElement('div');
		categoryHeader.classList.add('header-content');
		categoryHeader.innerText = category.name;
		categorySection.appendChild(categoryHeader);

		const categoryContent = document.createElement('div');
		categoryContent.classList.add('view-content-wrapper');

		let tempProducts = [];
		if (category.name === "Văn học") {
			tempProducts = literatureProductList;
		} else if (category.name === "Thiếu nhi") {
			tempProducts = childrenBookProductList;
		} else if (category.name === "Sách giáo khoa") {
			tempProducts = textbookProductList;
		} else if (category.name === "Sách ngoại ngữ") {
			tempProducts = foreignLanguageBookProductList;
		}

		const startIndex = 0;
		const endIndex = Math.min(startIndex + 4, tempProducts.length);
		renderProductItems(tempProducts.slice(startIndex, endIndex), categoryContent);

		const showMoreButton = document.createElement('button');
		showMoreButton.classList.add('btn-show-more');
		showMoreButton.innerText = 'Xem thêm';

		let nextIndex = endIndex;

		showMoreButton.addEventListener('click', function () {
			const nextEndIndex = Math.min(nextIndex + 4, tempProducts.length);
			renderProductItems(tempProducts.slice(nextIndex, nextEndIndex), categoryContent);
			nextIndex = nextEndIndex;

			if (nextIndex >= tempProducts.length) {
				showMoreButton.style.display = 'none';
			}
		});

		if (endIndex >= tempProducts.length) {
			showMoreButton.style.display = 'none';
		}

		categorySection.appendChild(categoryContent);
		categorySection.appendChild(showMoreButton);
		main_content.appendChild(categorySection);

	});
}

function renderProductByType(type, currentPage, priceRange) {
	renderFilterLeft(type, priceRange);
	let storedProducts = localStorage.getItem('List-products') ? JSON.parse(localStorage.getItem('List-products')) : [];
	let literatureProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Văn học") {
			literatureProductList.push(product);
		}
	});
	let childrenBookProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Thiếu nhi") {
			childrenBookProductList.push(product);
		}
	});
	let textbookProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Sách giáo khoa") {
			textbookProductList.push(product);
		}
	});
	let foreignLanguageBookProductList = [];
	storedProducts.forEach(product => {
		if (product.categories === "Sách ngoại ngữ") {
			foreignLanguageBookProductList.push(product);
		}
	});

	let products = [];
	if (type === 'literature') {
		products = literatureProductList;
	} else if (type === 'children-book') {
		products = childrenBookProductList;
	} else if (type === 'textbook') {
		products = textbookProductList;
	} else if (type === 'foreign-language-book') {
		products = foreignLanguageBookProductList;
	} else {
		products = storedProducts;
	}


	if (priceRange === null) {
		// products = storedProducts;
	} else {
		const tempPrice = priceRange.split('-');
		const minPrice = parseInt(tempPrice[0] + '000');
		const maxPrice = parseInt(tempPrice[1] + '000');
		products = products.filter(product => {
			if (tempPrice[1] === 'Infinity') {
				return product.price >= minPrice;
			} else {
				return product.price >= minPrice && product.price <= maxPrice;
			}
		});
	}

	const main_content = document.getElementById('main-content');
	const contentDiv = document.getElementById('contentDiv');
	const rightDiv = document.createElement('div');
	rightDiv.id = 'right';

	const productWrap = document.createElement('div');
	productWrap.classList = 'product-wrap';
	const section = document.createElement('section');
	section.classList.add('section', 'section-product-list');
	section.style.marginTop = '0';
	const categoryContent = document.createElement('div');
	categoryContent.classList.add('view-content-wrapper');

	const itemsPerPage = 6;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const tempProducts = products.slice(startIndex, endIndex);
	renderProductItems(tempProducts, categoryContent);
	section.appendChild(categoryContent);
	productWrap.appendChild(section);
	rightDiv.appendChild(productWrap);
	createPaginationbuttons(rightDiv, products, currentPage);
	contentDiv.appendChild(rightDiv);
	main_content.appendChild(contentDiv);
}

function changeCategory(type) {
	const urlParams = new URLSearchParams(window.location.search);
	urlParams.set('page', 1);
	type === ''
		? urlParams.delete('type')
		: urlParams.set('type', type);
	urlParams.delete('page');
	urlParams.set('page', 1);
	window.location.search = urlParams;
}

function changePriceRange(priceRange) {
	const urlParams = new URLSearchParams(window.location.search);
	priceRange === ''
		? urlParams.delete('priceRange')
		: urlParams.set('priceRange', priceRange.min + '-' + priceRange.max);
	urlParams.delete('page');
	urlParams.set('page', 1);
	window.location.search = urlParams;
}

function renderFilterLeft(type, price) {
	const contentDiv = document.createElement('div');
	contentDiv.id = 'contentDiv';
	const leftDiv = document.createElement('div');
	leftDiv.id = 'left';
	const accordionDiv = document.createElement('div');
	accordionDiv.id = 'accordion';

	// nhóm sản phẩm
	const filterDiv = document.createElement('div');
	filterDiv.classList.add('filter');
	filterDiv.innerText = 'Nhóm sản phẩm';
	const catePriceDiv = document.createElement('div');
	catePriceDiv.classList.add('catePrice');

	categories.forEach(category => {
		const categoryDiv = document.createElement('div');
		categoryDiv.classList.add('filter-item');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = category.id;
		checkbox.name = category.name;
		checkbox.value = category.name;
		if (type === category.id) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}
		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				changeCategory(category.id);
			} else {
				changeCategory('');
			}
		});
		const label = document.createElement('label');
		label.htmlFor = category.id;
		label.innerText = category.name;

		categoryDiv.appendChild(checkbox);
		categoryDiv.appendChild(label);
		catePriceDiv.appendChild(categoryDiv);
	});

	accordionDiv.appendChild(filterDiv);
	accordionDiv.appendChild(catePriceDiv);
	leftDiv.appendChild(accordionDiv);
	contentDiv.appendChild(leftDiv);

	//Giá
	const priceDiv = document.createElement('div');
	priceDiv.classList.add('filter');
	priceDiv.innerText = 'Giá';
	const priceRangeDiv = document.createElement('div');
	priceRangeDiv.classList.add('catePrice');

	const priceRanges = [
		{ id: 'under-100', name: 'Dưới 100.000', min: 0, max: 100.000 },
		{ id: '100-200', name: '100.000 - 200.000', min: 100.000, max: 200.000 },
		{ id: '200-300', name: '200.000 - 300.000', min: 200.000, max: 300.000 },
		{ id: '300-400', name: '300.000 - 400.000', min: 300.000, max: 400.000 },
		{ id: 'above-400', name: 'Trên 400.000', min: 400.000, max: Infinity },
	];

	priceRanges.forEach(priceRange => {
		const priceDiv = document.createElement('div');
		priceDiv.classList.add('filter-item');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'priceRange';
		checkbox.name = priceRange.name;
		checkbox.value = priceRange.id;

		const temp = priceRange.min + '-' + priceRange.max;
		if (temp === price) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}

		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				changePriceRange(priceRange);
			} else {
				changePriceRange('');
			}
		});

		const label = document.createElement('label');
		label.htmlFor = priceRange.id;
		label.innerText = priceRange.name;

		priceDiv.appendChild(checkbox);
		priceDiv.appendChild(label);
		priceRangeDiv.appendChild(priceDiv);
	});

	accordionDiv.appendChild(priceDiv);
	accordionDiv.appendChild(priceRangeDiv);
	leftDiv.appendChild(accordionDiv);
	contentDiv.appendChild(leftDiv);

	const main_content = document.getElementById('main-content');
	main_content.style.marginTop = '50px';
	main_content.appendChild(contentDiv);

	const urlPath = location.href;
	const splitPath = urlPath.split('/');
	if (splitPath[splitPath.length - 1] === 'cart.html') {
		contentDiv.style.display = 'none';
	} else {
		contentDiv.style.display = 'flex';
	}
}

function changePage(currentPage) {
	const urlParams = new URLSearchParams(window.location.search);
	const page = urlParams.get('page');
	if (page == currentPage) {
		return;
	} else {
		urlParams.delete('page');
		urlParams.set('page', currentPage);
	}
	window.location.search = urlParams;
}

function createPaginationbuttons(wrapper, productList, currentPage) {
	if (productList && productList.length > 0) {
		const itemsPerPage = 6;
		const totalPages = Math.ceil(productList.length / itemsPerPage);
		const paginationContainer = document.createElement('div');
		paginationContainer.classList.add('pagination');

		//add previous button
		const prev = document.createElement('button');
		prev.innerText = '<';
		prev.addEventListener('click', () => {
			changePage(parseInt(currentPage) - 1);
		});
		prev.classList.add('pagination-button');
		if (parseInt(currentPage) === 1) {
			prev.classList.add('disabled');
			prev.setAttribute('disabled', 'true');
		} else {
			prev.classList.remove('disabled');
		}
		paginationContainer.appendChild(prev);

		for (let i = 1; i <= totalPages; i++) {
			const button = document.createElement('button');
			button.classList.add('pagination-button');
			button.innerText = i;
			if (i == currentPage) {
				button.classList.add('active');
			} else {
				button.classList.remove('active');
			}
			button.addEventListener('click', () => {
				changePage(i);
			});
			paginationContainer.appendChild(button);
		}

		// add next button
		const next = document.createElement('button');
		next.innerText = '>';
		next.addEventListener('click', () => {
			changePage(parseInt(currentPage) + 1);
		});
		next.classList.add('pagination-button');
		if (parseInt(currentPage) === totalPages) {
			next.classList.add('disabled');
			next.setAttribute('disabled', 'true');
		} else {
			next.classList.remove('disabled');
		}
		paginationContainer.appendChild(next);
		wrapper.appendChild(paginationContainer);
	}
}


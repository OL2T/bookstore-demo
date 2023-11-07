function createProduct() {
  if(localStorage.getItem('product')===null){
	 let productArray = [
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},
		{productId:10042, categories:'Văn học',  author:'Nguyễn Hồng', publishingHouse:'NXB Văn Học',  img:'images/sachvanhoc/BiVo_NguyenHong.jpg', name:'Bỉ Vỏ', price:349000},

		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},
		{productId:10042, categories:'Thiếu nhi', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name:'Alice ở xứ sở thần tiên', price:449000},

		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},
		{productId:10042, categories:'Sách giáo khoa', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachgiaokhoa/AmNhac1.jpg', name:'Sách âm nhạc 1', price:449000},

		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},
		{productId:10042, categories:'Sách ngoại ngữ', author:'Lewis Carroll, MinaLima', publishingHouse:'NXB Văn Học', img:'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name:'301 câu đàm thoại tiếng Hoa', price:449000},

	 ];
	 localStorage.setItem('List-products',JSON.stringify(productArray));
  }
}
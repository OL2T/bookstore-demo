function createProduct() {
	if (localStorage.getItem('List-products') === null) {
		let productArray = [
			{ productId: 10000, categories: 'Văn học', author: 'Nguyễn Hồng', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/BiVo_NguyenHong.jpg', name: 'Bỉ Vỏ', price: 349000 },
			{ productId: 10001, categories: 'Văn học', author: 'Phan Đức Lộc', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/ToiSeBay.jpg', name: 'Tôi Sẽ Bay', price: 290000 },
			{ productId: 10002, categories: 'Văn học', author: 'H.BEERCHER STOWE', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/TupLeuBacTom.jpg', name: 'Túp Lều Bác Tôm', price: 453000 },
			{ productId: 10003, categories: 'Văn học', author: 'Vũ Trọng Phụng', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/SoDo_VuTrongPhung.jpg', name: 'Số Đỏ', price: 264000 },
			{ productId: 10004, categories: 'Văn học', author: 'Nguyễn Công Hoan', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/BuocDuongCung_NguyenCongHoan.jpg', name: 'Bước Đường Cùng', price: 249000 },
			{ productId: 10005, categories: 'Văn học', author: 'Trần Đình Sử', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/DocVanHocVan_TranDinhSu.jpg', name: 'Đọc Văn Học Văn', price: 162000 },
			{ productId: 10006, categories: 'Văn học', author: 'Sơn Tùng', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/CuocChiaLyTrenBenNhaRong_SonTung.jpg', name: 'Cuộc Chia Ly Trên Bến Nhà Rồng', price: 206000 },
			{ productId: 10007, categories: 'Văn học', author: 'Trần Thúy Lành', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/LongSon_TranThuyLanh.gif', name: 'Lồng Son', price: 381000 },
			{ productId: 10008, categories: 'Văn học', author: 'Nguyễn Công Hoan', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/TruyenNganChonLoc_NguyenCongHoan.png', name: 'Truyện Ngắn Chọn Lọc', price: 390000 },
			{ productId: 10009, categories: 'Văn học', author: 'Vẽ Hạnh Phúc', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/ToBinhYenVeHanhPhuc.png', name: 'Tô Bình Yên -Vẽ Hạnh Phúc-', price: 170000 },
			{ productId: 10010, categories: 'Văn học', author: 'Hồ Xuân Hương', publishingHouse: 'NXB Văn Học', img: 'images/sachvanhoc/TuyenTapThoHoXuanHuong.jpg', name: 'Thơ Hồ Xuân Huong', price: 132000 },
			{ productId: 10011, categories: 'Văn học', author: 'Hội đồng KHXH TPHCM', publishingHouse: 'NXB Tổng hợp TPHCM', img: 'images/sachvanhoc/DiaChiVanHoaTPHCM.jpg', name: 'Địa Chí Văn Hoá TPHCM', price: 81000 },
			{ productId: 10012, categories: 'Văn học', author: 'Phạm Thị Thanh Nga - Nguyễn Thị Thanh Hiền - Trần Tiến Thành', publishingHouse: 'NXB Giáo Dục Việt Nam', img: 'images/sachvanhoc/BoiDuongHSGMonNguVanLop9.jpg', name: 'Bồi Dưỡng HSG Môn Ngữ Văn Lớp 9', price: 194000 },
			{ productId: 10013, categories: 'Văn học', author: 'Nguyễn Thành Thi', publishingHouse: 'NXB Tổng hợp TPHCM', img: 'images/sachvanhoc/ChuyenDeHocTapNguVan11.png', name: 'Chuyên Đề Học Tập Ngữ Văn 11', price: 181000 },
			{ productId: 10014, categories: 'Văn học', author: 'Phương Lựu', publishingHouse: 'NXB Tổng hợp TPHCM', img: 'images/sachvanhoc/LiLuanVanHoc_tap1.jpg', name: 'Lí Luận Văn Học Tập 1', price: 352000 },
			{ productId: 10015, categories: 'Văn học', author: 'Lã Nhâm Thìn', publishingHouse: 'NXB Tổng hợp TPHCM', img: 'images/sachvanhoc/GiaoTrinhVanHocTrungDaiVietNam.jpg', name: 'Giáo Trình Văn Học Trung Đại Việt Nam Tập 1', price: 297000 },


			{ productId: 11000, categories: 'Thiếu nhi', author: 'Lewis Carroll, MinaLima', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/AliceOXuSoThanTien_Phan3.jpg', name: 'Alice ở xứ sở thần tiên', price: 449000 },
			{ productId: 11001, categories: 'Thiếu nhi', author: 'Kelin Hawkes, Michael Jan Black ', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/ChickenCheeks.jpg', name: 'Chicken Cheeks', price: 549000 },
			{ productId: 11002, categories: 'Thiếu nhi', author: 'La Hi', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/ChiecKhauTrangBietDem.jpg', name: 'Chiếc Khẩu Trang Biết Đếm', price: 469000 },
			{ productId: 11003, categories: 'Thiếu nhi', author: 'Phi Tân', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/CoTichCuaBa.jpg', name: 'Cổ Tích Của Ba', price: 395000 },
			{ productId: 11004, categories: 'Thiếu nhi', author: 'T-Books', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/CoVaCao.jpg', name: 'Cò Và Cáo', price: 255000 },
			{ productId: 11005, categories: 'Thiếu nhi', author: 'Bùi Phương Tâm', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/DungLaTet.jpg', name: 'Đúng Là Tết', price: 267000 },
			{ productId: 11006, categories: 'Thiếu nhi', author: 'Antoine De Saint-Exupery', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/HoangTuBe.jpg', name: 'Hoàng Tử Bé', price: 162000 },
			{ productId: 11007, categories: 'Thiếu nhi', author: 'Michiko Kaito', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/MaruVaHatDua.jpg', name: 'Maru Và Hạt Dưa', price: 193000 },
			{ productId: 11008, categories: 'Thiếu nhi', author: 'Nhiều Tác Giả', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/NgoanNgoan.png', name: 'Ngoan Ngoãn', price: 324000 },
			{ productId: 11009, categories: 'Thiếu nhi', author: 'Rosie Dickins', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/NhungCauChuyenCoTichHayNhatTheGioi.jpg', name: 'Những Câu Chuyện Cổ Tích Hay Nhất Thế Giới', price: 126000 },
			{ productId: 11010, categories: 'Thiếu nhi', author: 'Edmodo De Amicis', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/NhungTamLongCaoCa.jpg', name: 'Những Tấm Lòng Cao Cả', price: 93000 },
			{ productId: 11011, categories: 'Thiếu nhi', author: 'Nguyên Hương', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/NhungTruyenHayVietChoThieuNhi.jpg', name: 'Những Truyện Hay Viết Cho Thiếu Nhi ', price: 64000 },
			{ productId: 11012, categories: 'Thiếu nhi', author: 'Nguyễn Thị Thanh Bình', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/QueNgoai.jpg', name: 'Quê Ngoại', price: 173000 },
			{ productId: 11013, categories: 'Thiếu nhi', author: 'Huỳnh Thái Ngọc', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/ThoBayMau.jpg', name: 'Thỏ Bảy Màu Và Những Người Nghĩ Nó Là Bạn', price: 76000 },
			{ productId: 11014, categories: 'Thiếu nhi', author: 'Vẽ Hạnh Phúc', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/ToBinhYenVeHanhPhuc.png', name: 'Tô Bình Yên -Vẽ Hạnh Phúc-', price: 170000 },
			{ productId: 11014, categories: 'Thiếu nhi', author: 'Lê Đức Dương', publishingHouse: 'NXB Văn Học', img: 'images/sachthieunhi/cavoi.jpg', name: 'Ca Voi Eren đến Hòn Mun', price: 216000 },


			{ productId: 12000, categories: 'Sách giáo khoa', author: 'Lewis Carroll, MinaLima', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/AmNhac1.jpg', name: 'Sách âm nhạc 1', price: 49000 },
			{ productId: 12001, categories: 'Sách giáo khoa', author: 'Hồ Ngọc Khải', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/AmNhac8.png', name: 'Âm Nhạc 8', price: 17000 },
			{ productId: 12002, categories: 'Sách giáo khoa', author: 'Hồ Ngọc Khải', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/AmNhac10.png', name: 'Âm Nhạc 10', price: 24000 },
			{ productId: 12003, categories: 'Sách giáo khoa', author: 'Hồ Ngọc Khải', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/amnhac11.png', name: 'Âm Nhạc 11', price: 36000 },
			{ productId: 12004, categories: 'Sách giáo khoa', author: 'Bộ Giáo dục và đào tạo', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/HinhHoc11.jpg', name: 'Hình Học 11', price: 58000 },
			{ productId: 12005, categories: 'Sách giáo khoa', author: 'Cao Cự Giác', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/hoahoc10.png', name: 'Hóa Học 10', price: 25000 },
			{ productId: 12006, categories: 'Sách giáo khoa', author: 'Nguyễn Thị Nhung - Nguyễn Xuân Tiên', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/MiThuat6.jpg', name: 'Mĩ Thuật 6', price: 19000 },
			{ productId: 12007, categories: 'Sách giáo khoa', author: 'Nguyễn Thị May', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/MiThuat8.png', name: 'Mĩ Thuật 8', price: 47000 },
			{ productId: 12008, categories: 'Sách giáo khoa', author: 'Bùi Mạnh Hùng', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/NguVan6.jpg', name: 'Ngữ Văn 6 (tập 2)', price: 52000 },
			{ productId: 12009, categories: 'Sách giáo khoa', author: 'Nguyễn Thành Thi', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/NguVan10.png', name: 'Ngữ Văn 10 (tập 1)', price: 31000 },
			{ productId: 12010, categories: 'Sách giáo khoa', author: 'Trần Nam Dũng', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/Toan1.jpg', name: 'Toán 1', price: 14000 },
			{ productId: 12011, categories: 'Sách giáo khoa', author: 'Bộ Giáo dục và đào tạo', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/Toan4.jpg', name: 'Toán 4', price: 32000 },
			{ productId: 12012, categories: 'Sách giáo khoa', author: 'Bộ Giáo dục và đào tạo', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/Toan9.jpg', name: 'Toán 9 (tập 1)', price: 45000 },
			{ productId: 12013, categories: 'Sách giáo khoa', author: 'Trần Nam Dũng', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/Toan4tap1.png', name: 'Toán 4 (tập 1)', price: 29000 },
			{ productId: 12014, categories: 'Sách giáo khoa', author: 'Đỗ Đức Thái', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/Toan10tap1.png', name: 'Toán 10 (tập 1)', price: 34000 },
			{ productId: 12015, categories: 'Sách giáo khoa', author: 'Lê Thị Hạnh Dung', publishingHouse: 'NXB Văn Học', img: 'images/sachgiaokhoa/vatli9.jpg', name: 'Vật Lí 9', price: 18000 },



			{ productId: 13000, categories: 'Sách ngoại ngữ', author: 'Lewis Carroll, MinaLima', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/301CauDamThoaiTiengHoa.jpg', name: '301 câu đàm thoại tiếng Hoa', price: 449000 },
			{ productId: 13001, categories: 'Sách ngoại ngữ', author: 'Huyền Windy', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/5000_Tu_Tieng_Anh_Thong_Dung_Nhat.jpg', name: '5000 Từ tiếng anh thông dụng nhất', price: 352000 },
			{ productId: 13002, categories: 'Sách ngoại ngữ', author: 'Trang Anh', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/Cam_Nang_Cau_Truc_Tieng_Anh.jpg', name: 'Cẩm nang cấu trúc tiếng anh', price: 346000 },
			{ productId: 13003, categories: 'Sách ngoại ngữ', author: 'Lê Hoàng Dũng', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/CoursebookTiengAnhLop11.jpg', name: 'Tiếng Anh 11', price: 231000 },
			{ productId: 13004, categories: 'Sách ngoại ngữ', author: 'Trần Mạnh Tường', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/Ngu_Phap_Tieng_Anh_Li_Thuyet_Va_Bai_Tap.jpg', name: 'Ngữ pháp tiếng anh', price: 169000 },
			{ productId: 13005, categories: 'Sách ngoại ngữ', author: 'Cho Hang Rok', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/tienghan.png', name: 'Tiếng Hàn tổng hợp', price: 257000 },
			{ productId: 13006, categories: 'Sách ngoại ngữ', author: 'Hải Quỳnh', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/tuhoctiengnhat.png', name: 'Tự học tiếng nhật cấp tốc', price: 128000 },
			{ productId: 13007, categories: 'Sách ngoại ngữ', author: 'Bộ giáo dục và đào tạo', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/tiengtrung.jpg', name: 'Tiếng Trung Quốc 9', price: 364000 },
			{ productId: 13008, categories: 'Sách ngoại ngữ', author: 'Du Mẫn Hồng - Nguyễn Thành Yến', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/ielts.jpg', name: 'Enrich your Ielts vocabulary', price: 419000 },
			{ productId: 13009, categories: 'Sách ngoại ngữ', author: 'Bộ giáo dục và đào tạo', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/tiengtrungnc.jpg', name: 'Tiếng Trung Quốc nâng cao 11', price: 159000 },
			{ productId: 13010, categories: 'Sách ngoại ngữ', author: 'Nguyễn Thị Hà Bắc', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/hctienganhhieuqua.jpg', name: 'Tự học Tiếng Anh', price: 222000 },
			{ productId: 13011, categories: 'Sách ngoại ngữ', author: 'Trần Hải Quỳnh', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/hoctiengnhat.png', name: 'Tự học Tiếng Nhật dành cho người mới bắt đầu', price: 369000 },
			{ productId: 13012, categories: 'Sách ngoại ngữ', author: 'Learn By Heart', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/tienganhphuongphaptunhien.jpg', name: 'Natural English A2', price: 149000 },
			{ productId: 13013, categories: 'Sách ngoại ngữ', author: 'Raymond Tsai', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/tienganhgiaotiep.jpg', name: 'Học Tiếng Anh giao tiếp chỉ trong 30 ngày', price: 155000 },
			{ productId: 13014, categories: 'Sách ngoại ngữ', author: 'Hồng Đức', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/2000tutienganh.jpg', name: 'Tự học 2000 từ vựng tiếng anh theo chủ đề', price: 84000 },
			{ productId: 13015, categories: 'Sách ngoại ngữ', author: 'Hoàng Thanh Hải', publishingHouse: 'NXB Văn Học', img: 'images/sachngoaingu/10ngoaingu.jpg', name: 'Cách học 10 ngoại ngữ', price: 277000 },

		];
		localStorage.setItem('List-products', JSON.stringify(productArray));
	}
}

createProduct();
var rightbtn = document.getElementById("chevron-right");
var leftbtn = document.getElementById("chevron-left");
var imgNumber = document.querySelectorAll('.slide-wrapper img').length;
var index = 0;

rightbtn.addEventListener("click", function () {
    index += 1;
    if (index > imgNumber - 1) {
        index = 0;
    }
    document.querySelector(".slide-wrapper").style.right = index * 100 + "%";
});

leftbtn.addEventListener("click", function () {
    index -= 1;
    if (index < 0) {
        index = imgNumber - 1;
    }
    document.querySelector(".slide-wrapper").style.right = index * 100 + "%";
});

function slideAuto() {
    index += 1;
    if (index > imgNumber - 1) {
        index = 0;
    }
    document.querySelector(".slide-wrapper").style.right = index * 100 + "%";
}

setInterval(slideAuto, 3000);

// window.onload = function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const type = urlParams.get('type');
//     const priceRange = urlParams.get('priceRange');
//     const page = urlParams.get('page') || 1;
//     if (type || priceRange || page) {
//         const banner = document.getElementById('banner');
//         banner.style.display = 'none';
//     }
// }
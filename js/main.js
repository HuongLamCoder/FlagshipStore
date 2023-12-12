//Back to top button
window.onscroll = function() {
    let backToTop = document.querySelector('.back-to-top');
    //Kiểm tra xem vị trí cuộn dọc của trang có lón hơn 100px hay không
    //document.documentElement.scrollTop trả về vị trí cuộn dọc của phần tử <html>
    if(document.documentElement.scrollTop > 100) {
        backToTop.classList.add('active');
    }
    else {
        backToTop.classList.remove('active');
    }
}

//Tự động ẩn header khi cuộn trang
const headerNav = document.querySelector('.header-bottom');
let lastScrollY =  window.scrollY;  //lưu lại vị trí cuộn trang đầu tiên

window.addEventListener('scroll', () => {
    //Kiểm tra xem vị trí cuộn trang hiện tại có lớn hơn vị trí cuộn trang lần trước hay không (nghĩa là đang cuộn xuống)
   if(lastScrollY < window.scrollY) {
       headerNav.classList.add('hide');
   }
    else {
         headerNav.classList.remove('hide');
    }
    lastScrollY = window.scrollY;
});


//Start: Close popup
const body = document.querySelector('body');
let modalContainer = document.querySelectorAll('.modal');
let modalbox = document.querySelectorAll('.mdl-cnt');
let formLogin = document.querySelector('.forms');

//Tắt popup modal khi click vào vùng bên ngoài
function closeModal() {
    //duyệt qua từng phần tử trong classList và xóa thuộc tính class open
    modalContainer.forEach(function(item) {
        item.classList.remove('open');
    })
    body.style.overflow = 'auto';
}

modalContainer.forEach(function(item) {
    item.addEventListener('click', closeModal);
})

modalbox.forEach(function(item) {
    //ngăn chặn sự kiện click vào modalbox sẽ lan sang modalContainer (sự kiện nổi bọt)
    item.addEventListener('click', function(e) {
        e.stopPropagation();
    })
});
//End: Close popup

// Start: Signup & Login form
    //Chuyển đổi giữa signup và login
let signup = document.querySelector('.signup-link');
let login = document.querySelector('.login-link');
//trỏ đến phần tử có class là modal-container trong class signup-login
let container = document.querySelector('.signup-login .modal-container');

login.addEventListener('click', function() {
    container.classList.add('active');
});

signup.addEventListener('click', function() {
    container.classList.remove('active');
});

    //Hiển thị form khi click vào button
let signupBtn = document.getElementById('signup');
let loginBtn = document.getElementById('login');
let fromMsg = document.querySelector('.modal.signup-login');

signupBtn.addEventListener('click', () => {
    //Thêm class open vào form signup-login
    fromMsg.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = 'hidden';
});

loginBtn.addEventListener('click', () => {
    document.querySelector('.form-message-check-login').innerHTML = '';
    //Thêm class open vào form signup-login
    fromMsg.classList.add('open');
    container.classList.add('active');
    body.style.overflow = 'hidden';
});

    //Đăng ký tài khoản
let signupButton = document.getElementById('signup-btn');
let loginButton = document.getElementById('login-btn');
    //Đăng ký
signupButton.addEventListener('click', () => {
    event.preventDefault();
    let fullnameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phoneNumber').value;
    let passwordUser = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;
    //Kiểm tra hợp lệ
    let validName = false;
    let validPhone = false;
    let validPassword = false;
    let validConfirmPassword = false;
    if(fullnameUser === '') {   //nếu tên rỗng
        document.querySelector('.form-message-name').innerHTML = "Vui lòng nhập họ và tên";
        //focus lại khung input name
        document.getElementById('fullname').focus();
    }
    else if (fullnameUser.length < 3) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = "Họ và tên phải có nhiều hơn 3 kí tự";
    }
    else {
        //Xóa thông báo lỗi đã hiển thị trước đó
        document.querySelector('.form-message-name').innerHTML = '';
        validName = true;
    }

    let phoneReg = /^0[0-9]{9,10}$/;
    if(phoneUser === '') {   //nếu số điện thoại rỗng
        document.querySelector('.form-message-phone').innerHTML = "Vui lòng nhập số điện thoại";
        document.getElementById('phoneNumber').focus();
    }
    else if (!phoneReg.test(phoneUser)) {
        document.querySelector('.form-message-phone').innerHTML = "Số điện thoại không hợp lệ";
        document.getElementById('phoneNumber').value = '';
    }
    else {
        document.querySelector('.form-message-phone').innerHTML = '';
        validPhone = true;
    }

    if(passwordUser === '') {   //nếu mật khẩu rỗng
        document.querySelector('.form-message-password').innerHTML = "Vui lòng nhập mật khẩu";
        document.getElementById('password').focus();
    }
    else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = "Mật khẩu phải có ít nhất 6 kí tự";
        document.getElementById('password').value = '';
    }
    else {
        document.querySelector('.form-message-password').innerHTML = '';
        validPassword = true;
    }

    if(passwordConfirm === '') {   //nếu mật khẩu rỗng
        document.querySelector('.form-message-password-confirm').innerHTML = "Vui lòng nhập lại mật khẩu";
        document.getElementById('password_confirmation').focus();
    }
    else if (passwordConfirm !== passwordUser) {
        document.querySelector('.form-message-password-confirm').innerHTML = "Mật khẩu không khớp";
        document.getElementById('password_confirmation').value = '';
    }
    else {
        document.querySelector('.form-message-password-confirm').innerHTML = '';
        validConfirmPassword = true;
    }

    if(!checkSignup) {
        document.querySelector('.form-message-checkbox').innerHTML = "Vui lòng đồng ý với điều khoản";
    }
    else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }

    //Nếu tất cả điều kiện đều hợp lệ thì tạo 1 đối tượng user
    if(validName && validPhone && validPassword && validConfirmPassword && checkSignup) {
        if(passwordUser === passwordConfirm) {
            let user = {
                fullname: fullnameUser,
                phoneNumber: phoneUser,
                password: passwordUser,
                status: 1,  //1 là tài khoản đang hoạt động, 0 là tài khoản bị khóa
                join: new Date(),
                cart: [],
                userType: 0
            }

            //Lấy dữ liệu account từ localStorage
            let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
            //Kiểm tra xem số điện thoại đã tồn tại hay chưa
            let isPhoneExist = accounts.some(account => {
               return account.phoneNumber === user.phoneNumber;     //số điện thoại đã tồn tại
            });

            if(!isPhoneExist) {
                //Thêm user vào mảng accounts
                accounts.push(user);
                //Lưu lại mảng accounts vào localStorage
                localStorage.setItem('accounts', JSON.stringify(accounts));
                localStorage.setItem('currentUser', JSON.stringify(user));  //Lưu user hiện tại vào localStorage
                toast({
                    title: 'Thành công',
                    message: 'Đã tạo tài khoản thành công!',
                    type: 'success',
                    duration: 3000
                });
                closeModal();   //Đóng popup
                kiemTraDangNhap();
                kiemTraAdmin();
            }
            else {
                toast({
                    title: 'Đăng ký tài khoản thất bại',
                    message: 'Số điện thoại này đã tồn tại!',
                    type: 'error',
                    duration: 3000
                });
            }
        }
        else {
            toast({
                title: 'Thất bại',
                message: 'Mật khẩu không khớp!',
                type: 'error',
                duration: 3000
            });
        }

    }
});

    //Đăng nhập
loginButton.addEventListener('click', () => {
    event.preventDefault();
    let phoneLogin = document.getElementById('phone-login').value;
    let passwordLogin = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    let phoneReg = /^0[0-9]{9,10}$/;
    //Kiểm tra hợp lệ
    let validPhone = false;
    let validPassword = false;
    if(phoneLogin === '') {
        document.querySelector('.form-message.phonelog').innerHTML = "Vui lòng nhập số điện thoại";
        document.getElementById('phone-login').focus();
    }
    else if(!phoneReg.test(phoneLogin)) {
        document.querySelector('.form-message.phonelog').innerHTML = "Số điện thoại không hợp lệ";
        document.getElementById('phone-login').value = '';
    }
    else {
        document.querySelector('.form-message.phonelog').innerHTML = '';
        validPhone = true;
    }

    if(passwordLogin === '') {
        document.querySelector('.form-message-check-login').innerHTML = "Vui lòng nhập mật khẩu";
        document.getElementById('password-login').focus();
    }
    else if(passwordLogin.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = "Mật khẩu phải có ít nhất 6 kí tự";
        document.getElementById('password-login').value = '';
    }
    else {
        document.querySelector('.form-message-check-login').innerHTML = '';
        validPassword = true;
    }

    if(validPhone && validPassword) {
        //Tìm vị trí của user trong mảng accounts
        let viTri = accounts.findIndex(account => account.phoneNumber === phoneLogin);

        if (viTri === -1) {
            toast({
                title: 'Lỗi',
                message: 'Tài khoản của bạn không tồn tại!',
                type: 'error',
                duration: 3000
            });
        }
        else if(accounts[viTri].password === passwordLogin) {
            //Kiểm tra xem tài khoản có bị khóa hay không
            if(accounts[viTri].status === 0) {
                toast({
                    title: 'Không thể đăng nhập',
                    message: 'Tài khoản của bạn đã bị khóa!',
                    type: 'warning',
                    duration: 3000
                });
            }
            else {
                //Lưu user hiện tại vào localStorage
                localStorage.setItem('currentUser', JSON.stringify(accounts[viTri]));
                toast({
                    title: 'Thành công',
                    message: 'Đăng nhập thành công!',
                    type: 'success',
                    duration: 3000
                });
                closeModal();   //Đóng popup
                kiemTraDangNhap();
                kiemTraAdmin();
            }
        }
        else {
            toast({
                title: 'Cảnh báo',
                message: 'Mật khẩu không chính xác!',
                type: 'warning',
                duration: 3000
            });
        }
    }
});

    //Kiểm tra xem có tài khoản đang đăng nhập hay không
function kiemTraDangNhap() {
    //Lấy user hiện tại từ localStorage
    let currentUser = localStorage.getItem('currentUser');
    if(currentUser != null) {
        let user = JSON.parse(currentUser);
        //Hiển thị tên tài khoản ở header (đăng nhập/ đăng ký)
        document.querySelector('.auth-container').innerHTML = `
            <span class="text-register-login">Tài khoản</span>
            <span class="text-account">${user.fullname}
                <i class="fa-solid fa-solid fa-caret-down"></i>
            </span>
        `;

        //Hiển thị menu của tài khoản
        document.querySelector('.header-top-right-menu').innerHTML = `
            <li>
                <a href="javascript:" onclick="showOrderHistory()">
                    <i class="fa-regular fa-bag-shopping"></i>
                    Đơn hàng đã mua
                </a>
            </li>
            <li class="border">
                <a href="javascript:" id="logout">
                    <i class="fa-regular fa-arrow-right-from-bracket"></i>
                    Đăng xuất
                </a>
            </li>
        `;

        //Đăng xuất
        document.querySelector('#logout').addEventListener('click', logout);
    }
}

    //Đăng xuất
function logout() {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    //Lấy user hiện tại từ localStorage
    let user = JSON.parse(localStorage.getItem('currentUser'));
    //Tìm vị trí của user trong mảng accounts
    let viTri = accounts.findIndex(account => account.phone === user.phone);
    //lưu đơn hàng của user hiện tại vào localStorage
    accounts[viTri].cart.length = 0;
    for (let i = 0; i < user.cart.length; i++) {
        accounts[viTri].cart[i] = user.cart[i];     //lưu từng sản phẩm trong giỏ hàng vào account
    }
    //Lưu lại mảng accounts vào localStorage
    localStorage.setItem('accounts', JSON.stringify(accounts));
    //Xóa user hiện tại trong localStorage
    localStorage.removeItem('currentUser');
    //chuyển hướng trình duyệt về trang chủ
    window.location.href = 'index.html';
}

    //Kiểm tra xem tài khoản đăng nhập có phải là admin hay không
function kiemTraAdmin() {
    //Lấy user hiện tại từ localStorage
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user && user.userType === 1) {
        let node = document.createElement(`li`);
        node.innerHTML = `
            <a href="./admin.html">
                <i class="fa-light fa-gear"></i>
                Quản lý cửa hàng
            </a>
        `;
        //prepend(): Thêm node vào đầu tiên của thẻ ul
        document.querySelector('.header-top-right-menu').prepend(node);
    }
}

window.onload = kiemTraDangNhap();
window.onload = kiemTraAdmin();
//End: Signup & Login form

// Start: Render Products
function vndFormat(price) {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

function renderProducts(showProducts) {
    let productHTML = '';
    if(showProducts.length === 0) {
        document.getElementById('home-title').style.display = 'none';
        productHTML = `
            <div class="no-result">
                <div class="no-result-h">Không tìm thấy sản phẩm</div>
                <div class="no-result-p">Xin lỗi, sản phẩm bạn đang tìm kiếm không tồn tại</div>
                <div class="no-result-i">
                    <i class="fa-light fa-face-sad-cry"></i>
                </div>
            </div>
        `;
    }
    else {
        document.getElementById('home-title').style.display = 'block';
        showProducts.forEach((product) => {
            productHTML += `
                <div class="col-product">
                    <article class="card-product">
                        <div class="card-header">
                            <a href="#" class="card-image-link" onclick="detailProduct(${product.productId})">
                                <img src="${product.productImg}" alt="${product.productName}" class="card-image">
                            </a>
                        </div>
                        <div class="phone-info">
                            <div class="card-content">
                                <div class="card-title">
                                    <a href="#" class="card-title-link" onclick="detailProduct(${product.productId})">
                                        ${product.productName}
                                    </a>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="product-price">
                                    <span class="current-price">
                                        ${vndFormat(product.productPrice)}
                                    </span>
                                </div>
                                <div class="product-buy">
                                    <button class="card-button order-item" onclick="detailProduct(${product.productId})">
                                        <i class="fa-regular fa-cart-arrow-down"></i>
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        });
    }
    document.getElementById('home-products').innerHTML = productHTML;
}
//End: Render Products

//Start: Pagination (phân trang)
let perPage = 12;   //số sản phẩm hiển thị trên 1 trang
let currentPage = 1;    //trang hiện tại
let totalPage = 0;  //tổng số trang
let perProducts = [];    //mảng chứa các sản phẩm hiển thị trên 1 trang

function displayListProducts(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    //productShow: mảng chứa các sản phẩm hiển thị trên 1 trang
    //slice(): trả về 1 mảng mới chứa các phần tử được lấy ra từ mảng ban đầu
    let productShow = productAll.slice(start, end);
    renderProducts(productShow);
}

    //Pagination
function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:">${page}</a>`;
    //Nếu trang là trang hiện tại thì thêm class active
    if(page === currentPage) {
        node.classList.add('active');
    }
    node.addEventListener('click', () => {
        //Khi click vào 1 trang khác tranh hiện tại thì cập nhật lại currentPage
        currentPage = page;
        //Hiển thị sản phẩm
        displayListProducts(productAll, perPage, currentPage);
        //Xóa class active của các trang hiện tại cũ
        let currentActivePages = document.querySelectorAll('.page-nav-item.active');
        for(let i = 0; i < currentActivePages.length; i++) {
            currentActivePages[i].classList.remove('active');
        }
        //Thêm class active vào trang hiện tại mới
        node.classList.add('active');
        document.getElementById('home-service').scrollIntoView();
    });
    return node;
}

function pagination(productAll, perPage) {
    //Xóa các phân trang cũ
    document.querySelector('.page-nav-list').innerHTML = '';
    //Tính tổng số trang
    //Math.ceil(): làm tròn lên
    let page_count = Math.ceil(productAll.length / perPage);
    for(let i = 1; i <= page_count; i++) {
        //Tạo nút phân trang và thêm vào ul có class là page-nav-list
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}

    //Hàm hiển thị sản phẩm trang chủ
function showHomeProducts(products) {
    let productAll = products.filter(item => parseInt(item.productStatus) === 1)
    displayListProducts(productAll, perPage, currentPage);
    pagination(productAll, perPage, currentPage);
}
window.onload = showHomeProducts(JSON.parse(localStorage.getItem('products')));
// End: Pagination (phân trang)

// Start: Increase and decrease quantity
function decreasingNumber(element) {
    let qty = element.querySelector('.input-qty');
    if(parseInt(qty.value) > qty.min) {     //thuộc tính value của thẻ input trả về kiểu string
        qty.value = parseInt(qty.value) - 1;
    }
    else {
        qty.value = qty.min;
    }
}

function increasingNumber(element) {
    let qty = element.querySelector('.input-qty');
    if(parseInt(qty.value) < qty.max) {
        qty.value = parseInt(qty.value) + 1;
    }
    else {
        qty.value = qty.max;
    }
}
//End:  Increase and decrease quantity


// Start: Show Product Detail
function detailProduct(id) {
    let modal = document.querySelector('.modal.product-detail');
    let products = JSON.parse(localStorage.getItem('products'));
    event.preventDefault();
    let infoProduct = products.find(product => product.productId === id);
    let modalHTML =  `
        <div class="modal-left">
            <div class="modal-header">
                <img src="${infoProduct.productImg}" alt="" class="product-img">
            </div>
        </div>
        <div class="modal-right">
            <div class="modal-body">
                <h2 class="product-title">${infoProduct.productName}</h2>
                <div class="product-control">
                    <div class="price-box">
                    <span class="product-price">
                        Giá:
                        <span>${vndFormat(infoProduct.productPrice)}</span>
                    </span>
                    </div>
                    <div class="buttons_added">
                        <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this.parentNode)">
                        <input class="input-qty" type="number" max="100" min="1" value="1">
                        <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this.parentNode)">
                    </div>
                </div>
                <div class="product-description">
                    <div class="product-description-specs">
                        <h4>Thông số cấu hình: </h4>
                        <ul>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                Chip:
                                <span>${infoProduct.productSpecs.chip}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                RAM:
                                <span>${infoProduct.productSpecs.ram}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                Dung lượng:
                                <span>${infoProduct.productSpecs.storage}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                Màn hình:
                                <span>${infoProduct.productSpecs.screen}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                Camera sau:
                                <span>${infoProduct.productSpecs.rearCam}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                Camera trước:
                                <span>${infoProduct.productSpecs.frontCam}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-check"></i>
                                Pin:
                                <span>${infoProduct.productSpecs.battery}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="notebox">
                    <p class="notebox-title">Ghi chú</p>
                    <textarea name="" id="popup-detail-note" class="text-note" placeholder="Nhập thông tin cần lưu ý..."></textarea>
                </div>
                <div class="modal-footer">
                    <div class="price-total">
                        <span class="thanhTien">Thành tiền</span>
                        <span class="price">${vndFormat(infoProduct.productPrice)}</span>
                    </div>
                    <div class="modal-footer-control">
                        <button class="button-datHangNgay" data-product="${infoProduct.productId}">Đặt hàng ngay</button>
                        <button class="button-dat" id="add-cart">
                            <i class="fa-light fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('#product-detail-content').innerHTML = modalHTML;
    modal.classList.add('open');
    body.style.overflow = 'hidden';

    //Cập nhật thành tiền khi tăng giảm số lượng sản phẩm
    let incDecBtns = document.querySelectorAll('.is-form');
    let qty = document.querySelector('.product-control .input-qty');
    let priceText = document.querySelector('.price');
    incDecBtns.forEach(element => {
       element.addEventListener('click', () => {
            let price = infoProduct.productPrice * parseInt(qty.value);
            priceText.innerHTML = vndFormat(price);
       });
    });

    //Thêm sản phẩm vào giỏ hàng
    let productBtn = document.querySelector('.button-dat');
    productBtn.addEventListener('click', () => {
        //Kiểm tra xem người dùng đã đăng nhập hay chưa
        if(JSON.parse(localStorage.getItem('currentUser')) != null) {
            addToCart(infoProduct.productId);
        }
        else {
            toast({
                title: 'Không thể mua hàng',
                message: 'Bạn cần đăng nhập để thực hiện chức năng mua hàng!',
                type: 'error',
                duration: 3000
            });
        }
    });
    //Đặt hàng ngay
    buyNow();
}
//End: Show Product Detail

// Start: Advanced search
    //Mở tìm kiếm nâng cao
document.querySelector('.filter-btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.advanced-search').classList.toggle('open');
    document.getElementById('home-service').scrollIntoView();
});

document.querySelector('.form-search-input').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('home-service').scrollIntoView();
});

    //Đóng tìm kiếm nâng cao
function closeAdvancedSearch(category) {
    document.querySelector('.advanced-search').classList.toggle('open');
}

    //Tìm kiếm nâng cao
var productAll = JSON.parse(localStorage.getItem('products')).filter(item => parseInt(item.productStatus) === 1);
function searchProducts(mode) {
    let valueSearchInput = document.querySelector('.form-search-input').value;
    let valueCategory = document.getElementById('advanced-search-category-select').value;
    let minPrice = document.getElementById('min-price').value;
    let maxPrice = document.getElementById('max-price').value;
    if(parseInt(minPrice) > parseInt(maxPrice) && minPrice !== '' && maxPrice !== '') {
        toast({
            title: 'Lỗi',
            message: 'Giá tối thiểu phải nhỏ hơn giá tối đa!',
            type: 'error',
            duration: 3000
        });
    }
    //Tìm kiếm theo hãng của sản phẩm
    //Gán mảng productAll cho biến result nếu category là Tất cả (mặc định ban đầu)
    let result = valueCategory === 'Tất cả' ? productAll : productAll.filter(item => {
        return item.productBrand=== valueCategory;
    });

    //Tìm kiếm theo tên sản phẩm (search bar)
    result = valueSearchInput === '' ? result : result.filter(item => {
        return item.productName.toString().toLowerCase().includes(valueSearchInput.toString().toLowerCase());
    });

    //Tìm kiếm theo giá
    if(minPrice == "" && maxPrice != "") {
        result = result.filter(item => item.productPrice <= maxPrice);
    }
    else if(minPrice != "" && maxPrice == "") {
        result = result.filter(item => item.productPrice >= minPrice);
    }
    else if(minPrice != "" && maxPrice != "") {
        result = result.filter(item => item.productPrice >= minPrice && item.productPrice <= maxPrice);
    }

    document.getElementById('home-service').scrollIntoView();

    switch(mode) {
        case 0:
            result = JSON.parse(localStorage.getItem('products'));
            document.querySelector('.form-search-input').value = '';
            document.getElementById('advanced-search-category-select').value = 'Tất cả';
            document.getElementById('min-price').value = '';
            document.getElementById('max-price').value = '';
            break;
        case 1:
            //Sắp xếp theo giá tăng dần (lấy giá tiền của a - b, nếu dương thì đổi chỗ)
            result.sort((a,b) => a.productPrice - b.productPrice);
            break;
        case 2:
            //Sắp xếp theo giá giảm dần (lấy giá tiền của b - a, nếu dương thì đổi chỗ)
            result.sort((a,b) => b.productPrice - a.productPrice);
            break;
    }
    showHomeProducts(result);
}
//End: Advanced search

//Start: Hiển thị theo danh mục
function showCategory(category) {
    document.getElementById('home').classList.remove('hide');
    document.getElementById('order-history').classList.remove('open');

    let productSearch = productAll.filter(value => {
        return value.productBrand === category;
    });
    let currentPageSearch = 1;
    displayListProducts(productSearch, perPage, currentPageSearch);
    pagination(productSearch, perPage, currentPageSearch);
    document.getElementById('home-service').scrollIntoView();
}
//End: Hiển thị theo danh mục

// Start: Giỏ hàng
    //Thêm sản phẩm vào giỏ hàng
function addToCart(index) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let quantity = document.querySelector('.input-qty').value;
    let productDetailNote = document.querySelector('#popup-detail-note').value;
    let note = productDetailNote === '' ? 'Không có ghi chú' : productDetailNote; //nếu ghi chú rỗng thì gán mặc định là 'Không có ghi chú'
    //Tạo 1 đối tượng product chứa thông tin sản phẩm trong giỏ hàng
    let productCart = {
        productId: index,
        productQty: parseInt(quantity),
        productNote: note
    };
    //Tìm vị trí của sản phẩm trong giỏ hàng
    let viTri = currentUser.cart.findIndex(item => item.productId === productCart.productId);
    //Nếu sản phẩm chưa tồn tại trong giỏ hàng thì thêm vào mảng cart của người dùng
    if(viTri === -1) {
        currentUser.cart.push(productCart);
    }
    else {
        //Nếu sản phẩm đã tồn tại trong giỏ hàng thì cập nhật lại số lượng
        currentUser.cart[viTri].productQty =  parseInt(currentUser.cart[viTri].productQty) + parseInt(productCart.productQty);
    }
    //Lưu người dùng hiện tại vào localStorage và cập nhật lại số lượng
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAmount();
    closeModal();
}

    //Close cart
function closeCart() {
    document.querySelector('.modal-cart').classList.remove('open');
    body.style.overflow = 'auto';
    updateAmount();
}

    //Open cart
function openCart() {
    showCart();
    document.querySelector('.modal-cart').classList.add('open');
    body.style.overflow = 'hidden';
}

    //getProduct
function getProduct(item) {
    let products = JSON.parse(localStorage.getItem('products'));
    //find() trả về phần tử đầu tiên trong mảng thỏa mãn điều kiện
    let infoProductCart = products.find(product => product.productId === item.productId);
    let productCart = {    //tạo 1 đối tượng productCart(dùng ... - spread operator để sao chép các thuộc tính)
      ...infoProductCart,   //sao chép các thuộc tính của infoProductCart
      ...item               //sao chép các thuộc tính của item
    };
    return productCart;     //đối tượng productCart sẽ có các thuộc tính của infoProductCart và item (nếu trùng tên thì item sẽ ghi đè lên infoProductCart)
}
window.onload = updateAmount();
window.onload = updateTotalPrice();

    //Hàm tính tổng tiền giỏ hàng
function getCartTotal() {
    //Lấy user hiện tại từ localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let totalCartPrice = 0;
    if(currentUser != null) {
        currentUser.cart.forEach(item => {
           let product = getProduct(item);  //lấy thông tin sản phẩm
              totalCartPrice += product.productPrice * product.productQty;  //tính tổng tiền giỏ hàng
        });
    }
    return totalCartPrice;
}
    //Hàm lấy số lượng hàng trong giỏ
function getAmountCart() {
    //Lấy user hiện tại từ localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let amountCart = currentUser.cart.length;   //số lượng sản phẩm trong giỏ hàng
    return amountCart;
}

    //Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateAmount() {
    if(JSON.parse(localStorage.getItem('currentUser')) != null) {
        document.querySelector('.count-product-cart').innerHTML = getAmountCart();
    }
}

    //Hàm cập nhật tổng tiền của gỉỏ hàng
function updateTotalPrice() {
    document.querySelector('.text-total-price').innerHTML = vndFormat(getCartTotal());
}

    //Hàm xóa 1 sản phẩm trong giỏ hàng
function deteleCartItem(id, element) {
    let cardParent = element.parentNode.parentNode;     //.cart-item
    cardParent.remove();    //xóa sản phẩm khỏi giỏ hàng (xóa class cart-item)
    //Lấy user hiện tại từ localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //Tìm vị trí của sản phẩm trong giỏ hàng
    let viTri = currentUser.cart.findIndex(item => item.productId === id);
    //Xóa sản phẩm khỏi giỏ hàng
    //splice(): thêm hoặc xóa các phần tử trong mảng, trả về mảng các phần tử đã bị xóa (nếu không có thì trả về mảng rỗng)
    currentUser.cart.splice(viTri, 1);  //xóa 1 phần tử từ vị trí viTri trong mảng cart

    //Nếu giỏ hàng trống thì hiển thị trống
    if(currentUser.cart.length === 0) {
        document.querySelector('.empty-cart').style.display = 'flex';
        document.querySelector('button.payment').classList.add('disabled');
    }
    //Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    //Cập nhật lại tổng tiền giỏ hàng
    updateTotalPrice();
}

    //Lưu thông tin giỏ hàng của người dùng hiện tại vào localStorage
function saveAmountCart() {
    let cartAmountBtn = document.querySelectorAll('.cart-item-control .is-form');
    let listProduct = document.querySelectorAll('.cart-item');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    cartAmountBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            //Lấy id của sản phẩm
            //[index/2] vì mỗi sản phẩm có 2 nút tăng giảm số lượng
            let id = listProduct[parseInt(index / 2)].getAttribute('data-id');
            let productInCart = currentUser.cart.find(product => {     //tìm sản phẩm có id trùng với sản phẩm đang được tăng/giảm số lượng
                return product.productId === parseInt(id);
            });
            productInCart.productQty = parseInt(listProduct[parseInt(index / 2)].querySelector('.input-qty').value);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateTotalPrice();
        });
    });
}

    //showCart
function showCart() {
    if(localStorage.getItem('currentUser') != null) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser.cart.length !== 0) {
            document.querySelector('.empty-cart').style.display = 'none';
            document.querySelector('button.payment').classList.remove('disabled');
            let productCartHTML = '';
            currentUser.cart.forEach(item => {
                let product = getProduct(item);     //lấy thông tin sản phẩm
                productCartHTML += `
                    <li class="cart-item" data-id="${product.productId}">
                        <div class="cart-item-info">
                            <p class="cart-item-title">${product.productName}</p>
                            <span class="cart-item-price price" data-price="${product.productPrice}">
                                ${vndFormat(product.productPrice)}
                            </span>
                        </div>
                        <p class="product-note">
                            <i class="fa-light fa-pencil"></i>
                            <span>${product.productNote}</span>
                        </p>
                        <div class="cart-item-control">
                            <button class="cart-item-delete" onclick="deteleCartItem(${product.productId}, this)">Xóa</button>
                            <div class="buttons_added">
                                <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this.parentNode)">
                                <input class="input-qty" max="100" min="1" name="" type="number" value="${product.productQty}">
                                <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this.parentNode)">
                            </div>
                        </div>
                    </li>
                `;
            });
            //Gán productCartHTML vào sau thẻ ul.cart-list
            document.querySelector('.cart-list').innerHTML = productCartHTML;
            //Cập nhật giỏ hàng
            updateTotalPrice();
            //Lưu thông tin giỏ hàng của người dùng hiện tại vào localStorage
            saveAmountCart();
        }
        else {
            document.querySelector('.empty-cart').style.display = 'flex';
        }
    }
    let modalCart = document.querySelector('.modal-cart');
    let containerCart = document.querySelector('.cart-container');
    let buyMore = document.querySelector('.buy-more');
    modalCart.onclick = function () {
        closeCart();    //Đóng giỏ hàng khi click bên ngoài giỏ hàng
    };
    buyMore.onclick = function () {
        closeCart();    //Đóng giỏ hàng khi click nút mua thêm
    };
    containerCart.onclick = function (event) {
        event.stopPropagation();   //ngăn chặn sự kiện click bị lan ra ngoài
    };
}
// End: Giỏ hàng

// Start: Checkout
const PHI_VAN_CHUYEN = 30000;
let priceFinal = document.getElementById('checkout-cart-price-final');

    //Hiển thị sản phẩm trong giỏ hàng
function showProductCart() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let listOrder = document.getElementById('list-order-checkout'); //thẻ div chứa các thông tin sản phẩm trong giỏ hàng
    let listOrderHTML = '';
    currentUser.cart.forEach(productCart => {  //duyệt qua từng sản phẩm trong giỏ hàng
        let product = getProduct(productCart);     //lấy thông tin từng sản phẩm trong giỏ hàng
        listOrderHTML += `
            <div class="product-total">
                <div class="count">${product.productQty}x</div>   
                <div class="product-info">
                    <div class="product-name">${product.productName}</div>
                </div>
            </div>
        `;
    });
    listOrder.innerHTML = listOrderHTML;
}

    //Hiển thị sản phẩm muốn mua ngay
function showProductBuyNow(product) {
    let listOrder = document.getElementById('list-order-checkout'); //thẻ div chứa các thông tin sản phẩm trong giỏ hàng
    let listOrderHTML = `
        <div class="product-total">
            <div class="count">${product.productQty}x</div>   
            <div class="product-info">
                <div class="product-name">${product.productName}</div>
            </div>
        </div>
    `;
    listOrder.innerHTML = listOrderHTML;
}

    //Open page checkout
let paymentBtn = document.querySelector('.payment');
let checkoutPage = document.querySelector('.checkout-page');

paymentBtn.addEventListener('click', () => {
    checkoutPage.classList.add('active');    //hiển thị trang thanh toán
    checkout(1);    //xử lý thanh toán
    closeCart();    //Đóng giỏ hàng
    body.style.overflow = 'hidden';
});

    //Close page checkout
function closeCheckout() {
    checkoutPage.classList.remove('active');
    body.style.overflow = 'auto';
}

    //Lấy giá sản phẩm
function getProductPrice(id) {
    let products = JSON.parse(localStorage.getItem('products'));    //lấy mảng sản phẩm từ localStorage
    //Lấy ra sản phẩm có id bằng với id cần tìm
    let product = products.find(item => {
        return parseInt(item.productId) === id;
    });
    //Trả về giá của sản phẩm
    return product.productPrice;
}

    //Đặt hàng ngay
function buyNow() {
    let productInfo = document.getElementById('product-detail-content');    //modal chi tiết sản phẩm
    let buyNowBtn = productInfo.querySelector('.button-datHangNgay');   //nút đặt hàng ngay
    buyNowBtn.addEventListener('click', () => {
        if(localStorage.getItem('currentUser')) {   //Nếu người dùng đã đăng nhập
            let id = buyNowBtn.getAttribute('data-product');    //lấy id của sản phẩm đang xem
            let quantities = parseInt(productInfo.querySelector('.buttons_added .input-qty').value);    //lấy số lượng sản phẩm
            let noteValue = productInfo.querySelector('#popup-detail-note').value;    //lấy ghi chú sản phẩm
            let note = noteValue === '' ? 'Không có ghi chú' : noteValue; //nếu ghi chú rỗng thì gán mặc định là 'Không có ghi chú'
            let products = JSON.parse(localStorage.getItem('products'));    //lấy mảng sản phẩm từ localStorage
            let product = products.find(item => parseInt(id) === item.productId);    //lấy ra sản phẩm có id bằng với id cần tìm
            // console.log(product);
            product.productQty = parseInt(quantities);    //gán số lượng sản phẩm vào thuộc tính productQty của product
            product.productNote = note;   //gán ghi chú sản phẩm vào thuộc tính productNote của product
            checkoutPage.classList.add('active');    //hiển thị trang thanh toán
            checkout(2, product);   //xử lý thanh toán với option "Mua ngay"
            closeCart();
            body.style.overflow = 'hidden';
        }
        else {
            toast({
                title: 'Không thể mua hàng',
                message: 'Bạn cần đăng nhập để thực hiện chức năng mua hàng!',
                type: 'error',
                duration: 3000
            });
        }
    });
}

    //Thanh toán (main)
function checkout(option, product) {
    //Xử lý ngày giao nhận hàng
    let homNay = new Date();
    let ngayMai = new Date();
    let ngayMot = new Date();
    let ngayKia = new Date();
    ngayMai.setDate(homNay.getDate() + 1);
    ngayMot.setDate(homNay.getDate() + 2);
    ngayKia.setDate(homNay.getDate() + 3);

    let dateOrderHTML = `
        <a href="javascript:" class="pick-date active" data-date="${homNay}">
            <span class="text">Hôm nay</span>
            <span class="date">${homNay.getDate()}/${homNay.getMonth() + 1}</span>
        </a>
        <a href="javascript:" class="pick-date" data-date="${ngayMai}">
            <span class="text">Ngày mai</span>
            <span class="date">${ngayMai.getDate()}/${ngayMai.getMonth() + 1}</span>
        </a>
        <a href="javascript:" class="pick-date" data-date="${ngayMot}">
            <span class="text">Ngày mốt</span>
            <span class="date">${ngayMot.getDate()}/${ngayMot.getMonth() + 1}</span>
        </a>
        <a href="javascript:" class="pick-date" data-date="${ngayKia}">
            <span class="text">Ngày kia</span>
            <span class="date">${ngayKia.getDate()}/${ngayKia.getMonth() + 1}</span>
        </a>
    `;
    document.querySelector('.date-order').innerHTML = dateOrderHTML;    //gán dateOrderHTML vào thẻ .date-order
    //Xử lý ngày giao hàng
    let pickDate = document.getElementsByClassName('pick-date');
    for(let i = 0; i < pickDate.length; i++) {
        pickDate[i].onclick = function () {
            document.querySelector('.pick-date.active').classList.remove('active'); //xóa class active của ngày giao hàng cũ
            this.classList.add('active');   //thêm class active vào ngày giao hàng đang chọn
        };
    }

    let totalBillOrder = document.querySelector('.total-bill-order');   //thẻ div chứa tổng tiền đơn hàng
    let totalBillOrderHTML;
    //Xử lý đơn hàng
    switch(option) {
        //TH1: Thanh toán sản phẩm trong giỏ hàng
        case 1:
            //Hiển thị thông tin sản phẩm trong giỏ hàng
            showProductCart();
            //Tính tổng tiền sản phẩm
            totalBillOrderHTML = `
                <div class="priceFlx">
                    <div class="text">
                        Tiền hàng
                        <span class="count">${getAmountCart()} sản phẩm</span>
                    </div>
                    <div class="price-detail">
                        <span id="checkout-cart-total">${vndFormat(getCartTotal())}</span>
                    </div>
                </div>
                <div class="priceFlx chk-ship">
                    <div class="text">Phí vận chuyển</div>
                    <div class="price-detail chk-shipping-fee">
                        <span>${vndFormat(PHI_VAN_CHUYEN)}</span>
                    </div>
                </div>
            `;
            //Tính tổng tiền đơn hàng
            priceFinal.innerHTML = vndFormat(getCartTotal() + PHI_VAN_CHUYEN);
            break;
        //TH2: Mua sản phẩm ngay
        case 2:
            showProductBuyNow(product); //Hiển thị thông tin sản phẩm muốn mua ngay
            //Tính tiền sản phẩm
            totalBillOrderHTML = `
                <div class="priceFlx">
                    <div class="text">
                        Tiền hàng
                        <span class="count">${product.productQty} món</span>
                    </div>
                    <div class="price-detail">
                        <span id="checkout-cart-total">
                            ${vndFormat(product.productQty * product.productPrice)}
                        </span>
                    </div>
                </div>
                <div class="priceFlx chk-ship">
                    <div class="text">Phí vận chuyển</div>
                    <div class="price-detail chk-shipping-fee">
                        <span>${vndFormat(PHI_VAN_CHUYEN)}</span>
                    </div>
                </div>
            `;
            //Tính tổng tiền đơn hàng
            priceFinal.innerHTML = vndFormat(product.productQty * product.productPrice + PHI_VAN_CHUYEN);
            break;
    }
    //Tính tiền sản phẩm
    totalBillOrder.innerHTML = totalBillOrderHTML;

    //Xử lý hình thức giao nhận hàng
    let deliveryMthd = document.querySelector('#giao-tan-noi');
    let pickupMthd = document.querySelector('#tu-den-lay');
    let pickupGroup = document.querySelector('#tudenlay-group');
    console.log(pickupGroup)
    let chkShip = document.querySelectorAll('.chk-ship');

    //Tự đến lấy
    pickupMthd.addEventListener('click', () => {
        deliveryMthd.classList.remove('active'); //xóa class active trước của giao tận nơi (nếu có)
        pickupMthd.classList.add('active');
        chkShip.forEach(item => {
            item.style.display = 'none';    //ẩn các lựa chọn ngày giờ giao hàng và địa chỉ nhận hàng
        });
        pickupGroup.style.display = 'block';  //hiển thị lựa chọn chi nhánh lấy hàng
        switch(option) {
            case 1: //Thánh toán đơn hàng trong giỏ
                priceFinal.innerHTML = vndFormat(getCartTotal());
                break;
            case 2: //Thanh toán đơn hàng mua ngay
                priceFinal.innerHTML = vndFormat(product.productQty * product.productPrice);
                break;
        }
    });

    //Giao tận nơi
    deliveryMthd.addEventListener('click', () => {
        pickupMthd.classList.remove('active'); //xóa class active trước của tự đến lấy (nếu có)
        pickupGroup.style.display = 'none';    //ẩn lựa chọn chi nhánh lấy hàng
        deliveryMthd.classList.add('active');
        chkShip.forEach(item => {
            item.style.display = 'flex';   //hiển thị các lựa chọn ngày giờ giao hàng và địa chỉ nhận hàng
        });
        switch(option) {
            case 1: //Thánh toán đơn hàng trong giỏ
                priceFinal.innerHTML = vndFormat(getCartTotal() + PHI_VAN_CHUYEN);
                break;
            case 2: //Thanh toán đơn hàng mua ngay
                priceFinal.innerHTML = vndFormat(product.productQty * product.productPrice + PHI_VAN_CHUYEN);
                break;
        }
    });

    //Khi ấn nút đặt hàng
    document.querySelector('.complete-checkout-btn').onclick = function () {
        switch(option) {
            case 1: //Thanh toán đơn hàng trong giỏ
                handlerOrder();
                break;
            case 2: //Thanh toán đơn hàng mua ngay
                handlerOrder(product);
                break;
        }
    };
}

    //Xử lý đơn hàng
function handlerOrder(product) {
    let deliveryAddress = "";   //địa chỉ giao hàng
    let deliveryMethod = "";    //hình thức giao hàng
    let deliveryTime = "";      //ngày giao hàng
    let deliveryOption = document.querySelector('#giao-tan-noi');    //giao tận nơi
    let pickupOption = document.querySelector('#tu-den-lay');  //tự đến lấy
    let deliveryNow = document.querySelector('#giao-ngay');    //giao ngay
    let deliveryLater = document.querySelector('#delivery-time');  //giao sau
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //Hình thức giao hàng và địa chỉ nhận hàng
    if(deliveryOption.classList.contains('active')) {   //nếu đơn hàng giao tận nơi
        deliveryAddress = document.getElementById('dia-chi-nhan').value;
        deliveryMethod = deliveryOption.innerText;  //"Giao tận nơi"
    }
    if(pickupOption.classList.contains('active')) { //nếu đơn hàng tự đến lấy
        let chiNhanh1 = document.querySelector('#chinhanh-1');
        let chiNhanh2 = document.querySelector('#chinhanh-2');
        let chiNhanh3 = document.querySelector('#chinhanh-3');
        //Lấy địa chỉ chi nhánh lấy hàng
        if(chiNhanh1.checked) {
            deliveryAddress = "273 An Dương Vương, Phường 3, Quận 5";
        }
        if(chiNhanh2.checked) {
            deliveryAddress = "105 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3";
        }
        if(chiNhanh3.checked) {
            deliveryAddress = "4 Tôn Đức Thắng, Phường Bến Nghé, Quận 1";
        }
        deliveryMethod = pickupOption.innerText;    //"Tự đến lấy"
    }

    //Thời gian nhận hàng
    if(deliveryNow.checked) {
        deliveryTime = "Hỏa tốc (2h)";
    }
    if(deliveryLater.checked) {
        deliveryTime = document.querySelector('.choose-time').value;    //lấy giờ giao hàng
    }

    //Xử lý thông tin đơn hàng
    let orderDetails = localStorage.getItem('orderDetails') === null ? [] : JSON.parse(localStorage.getItem('orderDetails'));   //lấy mảng orderDetails từ localStorage (nếu không có thì khởi tạo 1 mảng orderDetails rỗng)
    let orders = localStorage.getItem('orders') === null ? [] : JSON.parse(localStorage.getItem('orders'));   //lấy mảng orders từ localStorage (nếu không có thì khởi tạo 1 mảng order rỗng)
    let orderId = createOrderId(orders);  //tạo id cho đơn hàng
    let totalPrice = 0; //tổng tiền đơn hàng
    if(product === undefined) {  //nếu người dùng thanh toán sản phẩm trong giỏ hàng
        currentUser.cart.forEach(item => {  //item là 1 sản phẩm trong giỏ hàng
            item.orderId = orderId; //thêm thuộc tính orderId cho sản phẩm trong giỏ hàng
            item.price = getProductPrice(item.productId);   //thêm thuộc tính price cho sản phẩm trong giỏ hàng
            totalPrice += item.productQty * item.price;     //tính tổng tiền đơn hàng
            orderDetails.push(item);    //thêm sản phẩm vào mảng orderDetails
        });
    }
    else {  //nếu người dùng thanh toán sản phẩm mua ngay
        product.orderId = orderId;
        product.price = getProductPrice(product.productId);
        totalPrice += product.productQty * product.price;
        orderDetails.push(product);
    }

    //Xử lý thông tin người nhận
    let receiverName = document.querySelector('#ten-nguoi-nhan').value; //tên người nhận
    let receiverPhone = document.querySelector('#sdt-nhan').value;  //số điện thoại người nhận

    if(receiverName === "" || receiverPhone === "" || deliveryAddress === "") {
        toast({
            title: 'Không thể đặt hàng',
            message: 'Vui lòng nhập đầy đủ thông tin nhận hàng!',
            type: 'error',
            duration: 3000
        });
    }
    else {
        //Tạo đối tượng chi tiết đơn hàng (orderDetail)
        let orderDetail =  {
            orderId: orderId,
            customer: currentUser.phoneNumber,
            deliveryMethod: deliveryMethod,
            deliveryDate: document.querySelector('.pick-date.active').getAttribute('data-date'),
            deliveryTime: deliveryTime, //thời gian giao hàng
            orderNote: document.querySelector('.note-order').value,
            receiverName: receiverName,
            receiverPhone: receiverPhone,
            deliveryAddress: deliveryAddress,
            orderTime: new Date(),  //thời gian đặt hàng
            orderTotal: totalPrice,
            orderStatus: 0,     //trạng thái đơn hàng
        };

        orders.unshift(orderDetail); //thêm đối tượng orderDetail vào đầu mảng order (unshift(): thêm 1 hoặc nhiều phần tử vào đầu mảng và trả về độ dài mới của mảng)
        if(product == null) {   //nếu người dùng đã thanh toán sản phẩm trong giỏ hàng
            currentUser.cart = [];    //xóa giỏ hàng
        }

        //Lưu lại thông tin vào localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        //Hiển thị thông báo
        toast({
            title: 'Đặt hàng thành công',
            message: 'Đơn hàng của bạn đã được đặt thành công!',
            type: 'success',
            duration: 3000
        });
        setTimeout(() => {
            window.location = "./index.html";  //chuyển về trang chủ
        }, 2000);
    }
}

    //Tạo id cho đơn hàng
function createOrderId(arr) {
    let id = arr.length + 1;
    let check = arr.find(item => item.orderId === 'DH' + id);
    while(check != null) {
        id++;
        check = arr.find(item => item.orderId === 'DH' + id);
    }
    return 'DH' + id;
}
//End: Checkout

// Start: Order History & Order Detail
    //Chuyển đổi giữa trang chủ và lịch sử đơn hàng
function showOrderHistory() {
    window.scrollTo({top: 0, behavior: 'smooth'});  //cuộn lên đầu trang
    document.getElementById('home').classList.add('hide');
    document.getElementById('order-history').classList.add('open');
    //Hiển thị danh sách đơn hàng đã đặt
    renderOrderHistory();
}

    //Hàm lấy thông tin đơn đặt hàng
function getOrderDetails(orderId) {
    let orderDetails = JSON.parse(localStorage.getItem('orderDetails'));    //lấy mảng orderDetails từ localStorage
    let orderDetail = [];   //mảng chứa các chi tiết đơn hàng của một đơn hàng (một đơn hàng có nhiều chi tiết đơn hàng)
    orderDetails.forEach(item => {  //duyệt qua từng chi tiết đơn hàng
        if(orderId === item.orderId) {  //nếu id của đơn hàng trùng với id của chi tiết đơn hàng
            orderDetail.push(item); //thêm thông tin đơn hàng vào mảng orderDetail
        }
    });
    return orderDetail; //trả về mảng orderDetail
}

    //Hàm hiển thị thông tin sản phẩm trong đơn hàng
function getProductInfo(id) {
    let products = JSON.parse(localStorage.getItem('products'));    //lấy mảng sản phẩm từ localStorage
    return products.find(item => parseInt(item.productId) === id);    //trả về đối tượng sản phẩm có id bằng với id cần tìm
}

    //Hàm hiển thị lịch sử đơn đặt hàng
function renderOrderHistory() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];   //lấy mảng orders từ localStorage (nếu không có thì khởi tạo 1 mảng orders rỗng)
    let orderHTML = '';
    let arrOrder = [];  //mảng chứa thông tin đơn hàng

    //Thêm thông tin đơn hàng vào mảng arrOrder
    for(let i = 0; i < orders.length; i++) {
        if(orders[i].customer === currentUser.phoneNumber) { //nếu số điện thoại của người dùng trùng với số điện thoại của đơn hàng
            arrOrder.push(orders[i]);    //thêm đơn đặt hàng vào mảng arrOrder
        }
    }

    //Hiển thị lịch sử đơn đặt hàng
    if(arrOrder.length === 0) { //nếu không có đơn đặt hàng nào
        orderHTML = `
            <div class="empty-order-section">
                <img src="./assets/img/empty-order.png" alt="" class="empty-order-img">
                <p>
                    Bạn chưa có đơn hàng nào
                    <i class="fa-light fa-face-sad-cry"></i>
                </p>
            </div>
        `;
    }
    else {
        arrOrder.forEach(item => {  //duyệt qua từng đơn đặt hàng
            let productHTML = `<div class="order-history-group">`;    //mỗi group chứa một thông tin sản phẩm đặt
            let orderDetails = getOrderDetails(item.orderId);  //lấy các chi tiết đơn hàng của một đơn hàng
            orderDetails.forEach(productOrderDetail => {    //duyệt qua từng chi tiết đơn hàng
                let productInfo = getProductInfo(productOrderDetail.productId);   //lấy thông tin sản phẩm
                productHTML += `
                    <div class="order-history">
                        <div class="order-history-left">
                            <img src="${productInfo.productImg}" alt="">
                            <div class="order-history-info">
                                <h4>${productInfo.productName}</h4>
                                <p class="order-history-note">
                                    <i class="fa-light fa-pen"></i>
                                    ${productOrderDetail.productNote}
                                </p>
                                <p class="order-history-quantity">${productOrderDetail.productQty}x</p>
                            </div>
                        </div>
                        <div class="order-history-right">
                            <div class="order-history-price">
                                <span class="order-history-current-price">${vndFormat(productOrderDetail.price)}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            //Hiển thị trạng thái của đơn hàng
            let textOrderStatus = parseInt(item.orderStatus) === 1 ? 'Đã xử lý' : 'Đang xử lý';
            let classOrderStatus = parseInt(item.orderStatus) === 1 ? 'completed' : 'processing';

            //Hiển thị phần quản lý đơn hàng (xem trạng thái và chi tiết đơn hàng)
            productHTML += `
                <div class="order-history-control">
                    <div class="order-history-status">
                        <span class="order-history-status-span ${classOrderStatus}">${textOrderStatus}</span>
                        <button id="order-history-detail" onclick="showOrderDetail('${item.orderId}')">
                            <i class="fa-regular fa-eye"></i>
                            Xem chi tiết
                        </button>
                    </div>
                    <div class="order-history-total">
                        <span class="order-history-total-desc">Tổng tiền: </span>
                        <span class="order-history-total-price">
                            ${vndFormat(item.orderTotal)}
                        </span>
                    </div>
                </div>
            `;
            productHTML += `</div>`;    //đóng thẻ div.order-history-group
            orderHTML += productHTML;   //thêm productHTML vào orderHTML
        });
    }
    document.querySelector('.order-history-section').innerHTML = orderHTML;    //gán orderHTML vào thẻ .order-history-section
}

    //Hàm định dạng ngày tháng năm
function formatDate(date) {
    let formatDate = new Date(date);    //chuyển đổi date thành kiểu Date
    let dd = formatDate.getDate();  //lấy ngày
    let mm = formatDate.getMonth() + 1; //lấy tháng
    let yyyy = formatDate.getFullYear();    //lấy năm

    if(dd < 10) {   //nếu ngày nhỏ hơn 10 thì thêm số 0 vào trước
        dd = '0' + dd;
    }
    if(mm < 10) {   //nếu tháng nhỏ hơn 10 thì thêm số 0 vào trước
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

    //Xem chi tiết đơn hàng
function showOrderDetail(id) {
    let orders = JSON.parse(localStorage.getItem('orders'));   //lấy mảng order từ localStorage
    let detailOrder = orders.find(item => item.orderId === id);    //tìm đơn hàng có id bằng với id cần tìm
    document.querySelector('.modal.detail-order').classList.add('open');    //hiển thị modal chi tiết đơn hàng
    body.style.overflow = 'hidden';
    //Hiển thị thông tin giao hàng
    let detailOrderHTML = `
        <ul class="detail-order-group">
            <li class="detail-order-item">
                <span class="detail-order-item-left">
                    <i class="fa-light fa-calendar-days"></i>
                    Ngày đặt hàng
                </span>
                <span class="detail-order-item-right">${formatDate(detailOrder.orderTime)}</span>
            </li>
            <li class="detail-order-item">
                <span class="detail-order-item-left">
                    <i class="fa-light fa-person-carry-box"></i>
                    Hình thức giao nhận
                </span>
                <span class="detail-order-item-right">${detailOrder.deliveryMethod}</span>
            </li>
            <li class="detail-order-item">
                <span class="detail-order-item-left">
                    <i class="fa-light fa-calendar-clock"></i>
                    Ngày nhận hàng
                </span>
                <span class="detail-order-item-right">
                    ${(detailOrder.deliveryTime === "" ? "" : (detailOrder.deliveryTime + ' - ')) + formatDate(detailOrder.deliveryDate)}
                </span>
            </li>
            <li class="detail-order-item">
                <span class="detail-order-item-left">
                    <i class="fa-light fa-location-dot"></i>
                    Địa chỉ nhận hàng
                </span>
                <span class="detail-order-item-right">${detailOrder.deliveryAddress}</span>
            </li>
            <li class="detail-order-item">
                <span class="detail-order-item-left">
                    <i class="fa-light fa-person"></i>
                    Người nhận hàng
                </span>
                <span class="detail-order-item-right">${detailOrder.receiverName}</span>
            </li>
            <li class="detail-order-item">
                <span class="detail-order-item-left">
                    <i class="fa-light fa-circle-phone"></i>
                    Số điện thoại nhận hàng
                </span>
                <span class="detail-order-item-right">${detailOrder.receiverPhone}</span>
            </li>
        </ul>
    `;
    document.querySelector('.detail-order-content').innerHTML = detailOrderHTML;    //gán detailOrderHTML vào thẻ .detail-order-content
}
//End: Order History & Order Detail




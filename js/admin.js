const body = document.querySelector('body');
//Kiểm tra quyền truy cập
function checkLogin() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || parseInt(currentUser.userType) === 0) {
        document.querySelector('body').innerHTML = `
        <div class="access-denied-section">
            <img src="./assets/img/do-not-enter.png" alt="DO NOT ENTER!" class="access-denied-img">
        </div>
        `;
        let result = confirm('Bạn không có quyền truy cập vào trang này! Bạn có muốn quay về trang chủ?');
        if(result) {
            window.location = './index.html';
            // window.location = 'index.html';
            // window.location.href = 'index.html';
        }
        else {
            window.history.back();  //quay lại trang trước đó trong lịch sử trình duyệt (nếu có)
        }
    } else {
        document.getElementById('admin-name').innerHTML = currentUser.fullname;
        document.getElementById('admin-name').setAttribute('title', currentUser.fullname);
    }
}

window.onload = checkLogin();

//Tự động ẩn header khi cuộn trang
const header = document.querySelector('.header');
let lastScrollY =  window.scrollY;  //lưu lại vị trí cuộn trang đầu tiên

window.addEventListener('scroll', () => {
    //Kiểm tra xem vị trí cuộn trang hiện tại có lớn hơn vị trí cuộn trang lần trước hay không (nghĩa là đang cuộn xuống)
    if(lastScrollY < window.scrollY) {
        header.classList.add('hide');
    }
    else {
        header.classList.remove('hide');
    }
    lastScrollY = window.scrollY;
});

//Back-to-top
window.onscroll = () => {
    let backToTop = document.querySelector('.back-to-top');
    if(document.documentElement.scrollTop > 100) {
        backToTop.classList.add('active');
    }
    else {
        backToTop.classList.remove('active');
    }
}

//Logout admin account
document.getElementById('logout-admin').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location = './index.html';
});

//Start: Close and open sidebar
const menuIconBtn = document.querySelector('.menu-icon-btn');
const sidebar = document.querySelector('.sidebar');
menuIconBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');   //toggle: nếu có class open thì xóa, nếu không có thì thêm vào
});

//End: Close and open sidebar

// Start: Đổi sang định dạng tiền VNĐ
function vndFormat(price) {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}
//End: Đổi sang định dạng tiền VNĐ

// Start: Chuyển đổi section khi click vào sideabar
const sidebars = document.querySelectorAll('.sidebar-list-item.tab-content');
const sections = document.querySelectorAll('.section');

for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].addEventListener('click', () => {
        document.querySelector('.sidebar-list-item.active').classList.remove('active');
        document.querySelector('.section.active').classList.remove('active');
        sidebars[i].classList.add('active');
        sections[i].classList.add('active');
    });
}
// End: Chuyển đổi section khi click vào sideabar

//Start: Hiển thị danh sách sản phẩm
function showListProduct(products) {
    let productHTML = "";
    if(products.length === 0) {
        productHTML = `
            <div class="no-result">
                <div class="no-result-icon">
                    <i class="fa-light fa-face-sad-cry"></i>
                </div>
                <div class="no-result-description">
                    Rất tiếc, sản phẩm không tồn tại!
                </div>
            </div>
        `;
    }
    else {
        products.forEach(product => {
            let controlBtn = product.productStatus === 1 ?
                `<button class="hide-btn" onclick="hideProduct(${product.productId})">
                    <i class="fa-regular fa-eye-slash"></i>
                    Ẩn
                 </button>`
                :
                `<button class="unhide-btn" onclick="changeProductStatus(${product.productId})">
                    <i class="fa-regular fa-eye"></i>
                    Hiện
                 </button>`
            productHTML += `
                <div class="list">
                    <div class="list-left">
                        <img src="${product.productImg}" alt="${product.productName}">
                        <div class="list-info">
                            <h4>${product.productName}</h4>
                            <div class="product-category-info">
                                Hãng: <span class="product-category">${product.productBrand}</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-right">
                        <div class="product-price">
                            ${vndFormat(product.productPrice)}
                        </div>
                        <div class="list-control">
                            <div class="list-tool">
                                <button class="edit-btn" onclick="editProduct(${product.productId})">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                ${controlBtn}
                            </div>
                        </div>
                        <div class="product-detail">
                            <button class="product-detail-btn" onclick="showSpecsDetail(${product.productId})">
                                <i class="fa-light fa-circle-info"></i>
                                Xem thông số
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    document.getElementById('show-product').innerHTML = productHTML;
}

    //Phân trang (pagination)
let perPage = 8;
let currentPage = 1;
let totalPage = 0;
let productPerPage = [];

    //Phân trang cho mảng sản phẩm
function showProductPerPage(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    let productInPage = productAll.slice(start, end);
    showListProduct(productInPage);
}

    //Hiển thị pagination
function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:">${page}</a>`;
    if(currentPage === page) {
        node.classList.add('active');
    }
    node.addEventListener('click', () => {
        currentPage = page;
        showProductPerPage(productAll, perPage, currentPage);
        let currentActivePages = document.querySelectorAll('.page-nav-item.active');
        for(let i = 0; i < currentActivePages.length; i++) {
            currentActivePages[i].classList.remove('active');
        }
        node.classList.add('active');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    return node;
}

    //Pagination
function pagination(productAll, perPage) {
    document.querySelector('.page-nav-list').innerHTML = '';
    let pageCount = Math.ceil(productAll.length / perPage);
    for(let i = 1; i <= pageCount; i++) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}
    //Hiển thị sản phẩm
function showProducts() {
    let selectOpt = document.getElementById('category').value;
    let valueSearchInput = document.getElementById('form-search-product').value;
    let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    
    let result = selectOpt === 'Tất cả'
        ? products.filter(product => product.productStatus === 1)
        : selectOpt === 'Đã ẩn'
            ? products.filter(product => product.productStatus === 0)
            : products.filter(product => product.productBrand === selectOpt);

    result = valueSearchInput === '' ? result : result.filter(product => {
        return product.productName.toString().toLowerCase().includes(valueSearchInput.toString().toLowerCase());
    });
    
    showProductPerPage(result, perPage, currentPage);
    pagination(result, perPage, currentPage);
}

window.onload = showProducts();

    //Refresh lại danh sách
function refreshProduct() {
    let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    document.getElementById('category').value = 'Tất cả';
    document.getElementById('form-search-product').value = '';
    showProductPerPage(products, perPage, currentPage);
    pagination(products, perPage);
}

    //Chức năng ẩn sản phẩm khỏi danh sách
function hideProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let index = products.findIndex(product => product.productId === id);
    console.log(index);
    if(confirm('Bạn chắc chắn muốn ẩn sản phẩm này?') === true) {
        products[index].productStatus = 0;
        toast({
            title: 'Thành công!',
            message: 'Ẩn sản phẩm khỏi danh sách thành công!',
            type: 'success',
            duration: 2000
        });
    }
    localStorage.setItem('products', JSON.stringify(products));
    showProducts();
}

    //Chức năng hiện lại sản phẩm đã ẩn
function changeProductStatus(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let index = products.findIndex(product => {
        return product.productId === id;
    });
    if(confirm('Bạn có chắc chắn muốn hiện sản phẩm?') === true) {
        products[index].productStatus = 1;
        toast({
            title: 'Thành công!',
            message: 'Khôi phục sản phẩm thành công!',
            type: 'success',
            duration: 2000
        });
    }
    localStorage.setItem('products', JSON.stringify(products));
    showProducts();
}
//End: Hiển thị danh sách sản phẩm

// Start: Edit Product 
    // Close Popup Modal
let closeModalBtn = document.querySelectorAll('.modal-close');
let modal = document.querySelectorAll('.modal');

for(let i = 0; i < closeModalBtn.length; i++) {
    closeModalBtn[i].onclick = () => {
        body.style.overflow = 'auto';
        modal[i].classList.remove('open');  
    };
}
// End: Edit Product

// Start: Edit & Add product
var currentIndex;
    //Open Edit product modal
function editProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let index = products.findIndex(product => product.productId === id);
    currentIndex = index;
    console.log(currentIndex);
    body.style.overflow = 'hidden';
    //Ần các phần tử thuộc về phần thêm sản phẩm mới
    document.querySelectorAll('.add-product').forEach(item => {
        item.style.display = 'none'; 
    });
    //Hiển thị các phần tử thuộc phần chỉnh sửa sản phẩm
    document.querySelectorAll('.edit-product').forEach(item => {
        item.style.display = 'block'; 
    });
    //Hiển thị modal 
    document.querySelector('.add-product-modal').classList.add('open');
    //Gán giá trị cho các thuộc tính
    document.getElementById('image-preview').src = products[index].productImg;
    document.getElementById('product-name').value = products[index].productName;
    document.getElementById('product-category').value = products[index].productBrand;
    document.getElementById('product-price').value = products[index].productPrice;
    document.getElementById('chip').value = products[index].productSpecs.chip;
    document.getElementById('ram').value = products[index].productSpecs.ram;
    document.getElementById('storage').value = products[index].productSpecs.storage;
    document.getElementById('screen').value = products[index].productSpecs.screen;
    document.getElementById('rearCam').value = products[index].productSpecs.rearCam;
    document.getElementById('frontCam').value = products[index].productSpecs.frontCam;
    document.getElementById('battery').value = products[index].productSpecs.battery;
}

    //Open Add product modal
let addProductBtn = document.getElementById('btn-add-product');
addProductBtn.addEventListener('click', () => {
    body.style.overflow = 'hidden';
    //Ần các phần tử thuộc về phần thêm sản phẩm mới
    document.querySelectorAll('.add-product').forEach(item => {
        item.style.display = 'block';
    });
    //Hiển thị các phần tử thuộc phần chỉnh sửa sản phẩm
    document.querySelectorAll('.edit-product').forEach(item => {
        item.style.display = 'none';
    });
    //Hiển thị modal 
    document.querySelector('.add-product-modal').classList.add('open');
});

    //Thay đổi hình ảnh
function changeImage(input) {
    let reader = new FileReader(); 
    reader.onload = (e) => {    //onload: khi file đã được đọc xong
        document.getElementById('image-preview').src = e.target.result; //chứa dữ liệu của tệp đã được đọc
    };
    //readAsDataURL: để đọc tệp dưới dạng một chuỗi dữ liệu (data URL)
    reader.readAsDataURL(input.files[0]);   //tệp đầu tiên mà người dùng chọn
}

    //Trở lại giá trị mặc định
function setDefaultValue() {
    document.getElementById('image-preview').src = './assets/img/admin/blank-image.png';
    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('chip').value = '';
    document.getElementById('ram').value = '';
    document.getElementById('storage').value = '';
    document.getElementById('screen').value = '';
    document.getElementById('rearCam').value = '';
    document.getElementById('frontCam').value = '';
    document.getElementById('battery').value = '';
}

    //Update product info
let updateProductInfoBtn = document.getElementById('update-product-btn');
updateProductInfoBtn.addEventListener('click', (event) => {
     event.preventDefault();
     let products = JSON.parse(localStorage.getItem('products'));
     let id = products[currentIndex].productId;
     //Giá trị mới
    let newName = document.getElementById('product-name').value;
    let newImg = document.getElementById('image-preview').src;
    let newCategory = document.getElementById('product-category').value;
    let newPrice = document.getElementById('product-price').value;
    let newChip = document.getElementById('chip').value;
    let newRam = document.getElementById('ram').value;
    let newStorage = document.getElementById('storage').value;
    let newScreen = document.getElementById('screen').value;
    let newRearCam = document.getElementById('rearCam').value;
    let newFrontCam = document.getElementById('frontCam').value;
    let newBattery = document.getElementById('battery').value;

    if(!isNaN(newPrice)) {
        //Thay đổi thông tin
        let changedProduct = {
            productId: id,
            productStatus: 1,
            productBrand: newCategory,
            productName: newName,
            productImg: newImg,
            productSpecs: {
                chip: newChip,
                ram: newRam,
                storage: newStorage,
                screen: newScreen,
                rearCam: newRearCam,
                frontCam: newFrontCam,
                battery: newBattery,
            },
            productPrice: parseInt(newPrice)
        };
        //Xóa product đang chỉnh sửa khỏi mảng
        products.splice(currentIndex, 1);
        //Thêm product sau khi thay đổi giá trị vào mảng tại vị trí của product cũ
        products.splice(currentIndex, 0, changedProduct);
        localStorage.setItem('products', JSON.stringify(products));
        toast({
            title: 'Thành công',
            message: 'Sửa thông tin sản phẩm thành công',
            type: 'success',
            duration: 2000
        });
        setDefaultValue();
        //Đóng modal
        document.querySelector('.add-product-modal').classList.remove('open');
        body.style.overflow = 'auto';
        //Hiển thị lại sản phẩm (sau khi sửa)
        showProducts();
    }
    else {
        toast({
            title: 'Chú ý',
            message: 'Vui lòng nhập giá tiền là số',
            type: 'warning',
            duration: 3000
        });
    }
});

    //Add a new product
let addNewProduct = document.getElementById('add-product-btn');
addNewProduct.addEventListener('click', (e) => {
    e.preventDefault();
    let newName = document.getElementById('product-name').value;
    let newImg = document.getElementById('image-preview').src;
    let newCategory = document.getElementById('product-category').value;
    let newPrice = document.getElementById('product-price').value;
    let newChip = document.getElementById('chip').value;
    let newRam = document.getElementById('ram').value;
    let newStorage = document.getElementById('storage').value;
    let newScreen = document.getElementById('screen').value;
    let newRearCam = document.getElementById('rearCam').value;
    let newFrontCam = document.getElementById('frontCam').value;
    let newBattery = document.getElementById('battery').value;

    if( newName === '' ||
        newPrice === '' ||
        newChip === '' ||
        newRam === '' ||
        newStorage === '' ||
        newScreen === '' ||
        newRearCam === '' ||
        newFrontCam === '' ||
        newBattery === ''
    ) {
        toast({
            title: 'Chú ý',
            message: 'Vui lòng nhập đầy đủ thông tin!',
            type: 'warning',
            duration: 3000
        });
    }
    else {
        if(isNaN(newPrice)) {
            toast({
                title: 'Chú ý',
                message: 'Vui lòng nhập giá tiền đúng định dạng số',
                type: 'warning',
                duration: 3000
            });
        }
        else {
            let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
            let newProduct = {
                productId: createProductId(products),
                productStatus: 1,
                productBrand: newCategory,
                productName: newName,
                productImg: newImg,
                productSpecs: {
                    chip: newChip,
                    ram: newRam,
                    storage: newStorage,
                    screen: newScreen,
                    rearCam: newRearCam,
                    frontCam: newFrontCam,
                    battery: newBattery,
                },
                productPrice: parseInt(newPrice)
            }
            products.unshift(newProduct);   //Thêm newProduct vào đầu mảng products
            localStorage.setItem('products', JSON.stringify(products));
            toast({
                title: 'Thành công',
                message: 'Thêm sản sản phẩm thành công',
                type: 'success',
                duration: 2000
            });
            setDefaultValue();
            //Đóng modal
            document.querySelector('.add-product-modal').classList.remove('open');
            body.style.overflow = 'auto';
            //Hiển thị lại sản phẩm (sau khi sửa)
            showProducts();
        }
    }
});

document.querySelector('.modal-close.product-form').addEventListener('click', () =>{
    setDefaultValue();
});

    //Hàm tạo id
function createProductId(arr) {
    let id = arr.length;
    let check = arr.find(item => item.productId === id);
    if(check) {
        id++;
        check = arr.find(item => item.productId === id);
    }
    return id;
}
// End: Edit & Add product

// Start: Show Products Specs
function showSpecsDetail(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let product = products.find(product => product.productId === id);
    body.style.overflow = 'hidden';
    document.querySelector('.modal.detail-specs').classList.add('open');
    //Hiển thị thông tin cấu hình
    let detailSpecsHTML = `
        <ul class="detail-specs-group">
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-microchip" style="--fa-primary-color: #ff6000; --fa-secondary-color: #ff6000;"></i>
                    Chip
                </span>
                <span class="detail-specs-item-right">${product.productSpecs.chip}</span>
            </li>
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-memory" style="--fa-primary-color: #ff6000; --fa-primary-opacity: 0.4; --fa-secondary-color: #ff6000; --fa-secondary-opacity: 1;"></i>
                    RAM
                </span>
                <span class="detail-specs-item-right">${product.productSpecs.ram}</span>
            </li>
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-database" style="--fa-primary-color: #ff6000; --fa-primary-opacity: 0.4; --fa-secondary-color: #ff6000; --fa-secondary-opacity: 1;"></i>
                    Dung lượng
                </span>
                <span class="detail-specs-item-right">
                    ${product.productSpecs.storage}
                </span>
            </li>
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-arrow-up-right-and-arrow-down-left-from-center" style="--fa-primary-color: #ff6000; --fa-secondary-color: #ff6000;"></i>
                    Kích thước màn hình
                </span>
                <span class="detail-specs-item-right">${product.productSpecs.screen}</span>
            </li>
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-circle-camera" style="--fa-primary-color: #ff6000; --fa-secondary-color: #ff6000;"></i>
                    Camera sau
                </span>
                <span class="detail-specs-item-right">${product.productSpecs.rearCam}</span>
            </li>
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-camera-web" style="--fa-primary-color: #ff6000; --fa-secondary-color: #ff6000;"></i>
                    Camera trước
                </span>
                <span class="detail-specs-item-right">${product.productSpecs.frontCam}</span>
            </li>
            <li class="detail-specs-item">
                <span class="detail-specs-item-left">
                    <i class="fa-duotone fa-battery-three-quarters" style="--fa-primary-color: #ff6000; --fa-primary-opacity: 0.8; --fa-secondary-color: #ff6000; --fa-secondary-opacity: 1;"></i>
                    Pin
                </span>
                <span class="detail-specs-item-right">${product.productSpecs.battery}</span>
            </li>
        </ul>
    `;
    document.querySelector('.detail-specs-content').innerHTML = detailSpecsHTML;
}
// End: Show Products Specs

// Start: User
    //Định dạng ngày tháng
function dateFormat(date) {
    let df = new Date(date);
    let dd = df.getDate();
    let mm = df.getMonth() + 1;
    let yyyy = df.getFullYear();
    if(dd < 10) {
        dd  = '0' + dd;
    }
    if(mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

    //Hiển thị danh sách khách hàng (không bao gồm admin)
function showListUser(arr) {
    let accountHTML = '';
    if(arr.length === 0) {
        accountHTML = `<td colspan="5">Không có dữ liệu</td>`;
    }
    else {
        arr.forEach((account, index) => {
             let userStatus = account.status === 1 ?
                 `<span class="status-active-account">Hoạt động</span>`
                 :
                 `<span class="status-locked-account">Bị khóa</span>`;
             accountHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${account.fullname}</td>
                    <td>${account.phoneNumber}</td>
                    <td>${(dateFormat(account.join))}</td>
                    <td>
                        ${userStatus}
                    </td>
                    <td>
                        <button class="edit-btn" id="edit-account" onclick="openEditAccount('${account.phoneNumber}')">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button class="delete-btn" id="delete-account" onclick="deleteAccount(${account.phoneNumber})">
                            <i class="fa-regular fa-trash"></i>
                        </button>
                    </td>
                </tr>
             `;
        });
    }
    document.getElementById('show-user').innerHTML = accountHTML;
}

    //Hiển thị danh sách user
function showUser() {
    let status = parseInt(document.getElementById('user-status').value);
    let searchUserValue = document.getElementById('form-search-user').value;
    let dateStart = document.getElementById('time-start-user').value;
    let dateEnd = document.getElementById('time-end-user').value;

    if(dateEnd < dateStart && dateEnd !== '' && dateStart !== '') {
        toast({
            title: 'Chú ý',
            message: 'Ngày bắt đầu hoặc ngày kết thúc không đúng!',
            type: 'warning',
            duration: 3000
        });
        return;
    }

    let accounts = localStorage.getItem('accounts') ?
        JSON.parse(localStorage.getItem('accounts')).filter(account => account.userType === 0)
        :
        [];

    let result = status === 2 ? accounts : accounts.filter(account => account.status === status);

    result = searchUserValue === '' ? result : result.filter(account => {
        return  (account.fullname.toLowerCase().includes(searchUserValue.toLowerCase()))
                ||
                (account.phoneNumber.toString().toLowerCase().includes(searchUserValue.toLowerCase()));
    });

    if(dateStart !== '' && dateEnd === '') {
        result = result.filter((account) => {
            return new Date(account.join) >= new Date(dateStart).setHours(0, 0, 0);
        });
    }
    else if(dateStart === '' && dateEnd !== '') {
        result = result.filter((account) => {
            return new Date(account.join) <= new Date(dateEnd).setHours(23, 59, 59);
        });
    }
    else if(dateStart !== '' && dateEnd !== '') {
        result = result.filter(account => {
            return (new Date(account.join) >= new Date(dateStart).setHours(0, 0, 0)
                    &&
                    new Date(account.join) <= new Date(dateEnd).setHours(23, 59, 59));
        });
    }
    showListUser(result);
}

window.onload = showUser();

    //Refresh lại mục tìm kiếm
function refreshSearchUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType === 0) : [];
    showListUser(accounts);
    document.getElementById('user-status').value = 2;
    document.getElementById('form-search-user').value = '';
    document.getElementById('time-start-user').value = '';
    document.getElementById('time-end-user').value = '';
}

    //Xóa một account
function deleteAccount(phone) {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(account => account.phoneNumber === phone);
    if(confirm('Bạn chắc chắn muốn xóa tài khoản này?')) {
        accounts.splice(index, 1);
    }
    localStorage.setItem('accounts', JSON.stringify(accounts));
    showUser();
}

    //Reset signup form
function signupFromReset() {
    document.getElementById('fullname').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('password').value = ""
    document.querySelector('.form-message-name').innerHTML = '';
    document.querySelector('.form-message-phone').innerHTML = '';
    document.querySelector('.form-message-password').innerHTML = '';
}
document.querySelector('.modal.signup .modal-close').addEventListener('click', () => {
    signupFromReset();
});

    //Mở modal thêm khách hàng mới
let addAccount = document.getElementById('signup-btn');
function openCreateAccount() {
    document.querySelector('.signup').classList.add('open');
    document.querySelectorAll('.edit-account').forEach(item => {
        item.style.display = 'none';
    });
    document.querySelectorAll('.add-account').forEach(item => {
        item.style.display = 'block';
    });
}

    //Thêm một khách hàng mới
let phoneReg = /^0[0-9]{9,10}$/;
addAccount.addEventListener('click', (e) => {
    e.preventDefault();
    let fullnameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
        //Check validate
        let fullnameInput = document.getElementById('fullname');
        let formNameMsg = document.querySelector('.form-message-name');
        let formPhoneMsg = document.querySelector('.form-message-phone');
        let formPasswordMsg = document.querySelector('.form-message-password');

        if (fullnameUser === '') {
            formNameMsg.innerHTML = 'Vui lòng nhập họ và tên';
            fullnameInput.focus();
        }
        else if (fullnameUser.length < 3){
            fullnameInput.value = '';
            formNameMsg.innerHTML = 'Họ và tên phải nhiều hơn 3 ký tự';
        }
        else {
            formNameMsg.innerHTML = '';
        }

        if (phoneUser === '') {
            formPhoneMsg.innerHTML = 'Vui lòng nhập số điện thoại!';
            document.getElementById('phone').value = '';
        }
        else if (!phoneReg.test(phoneUser)) {
            formPhoneMsg.innerHTML = 'Vui lòng nhập số điện thoại hợp lệ!';
            document.getElementById('phone').value = '';
        }
        else {
            formPhoneMsg.innerHTML = '';
        }

        if (passwordUser.length === 0) {
            formPasswordMsg.innerHTML = 'Vui lòng nhập mật khẩu';
        } else if (passwordUser.length < 6) {
            formPasswordMsg.innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
            document.getElementById('password').value = '';
        }
        else {
            formPasswordMsg.innerHTML = '';
        }

    if (fullnameUser && phoneUser && passwordUser) {
        let user = {
            fullname: fullnameUser,
            phoneNumber: phoneUser,
            password: passwordUser,
            status: 1,
            join: new Date(),
            cart: [],
            userType: 0
        }

        let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
        let checkLoop = accounts.some(account => account.phoneNumber === user.phoneNumber);

        if(!checkLoop) {
            accounts.push(user);
            localStorage.setItem('accounts', JSON.stringify(accounts));
            toast({
                title: 'Thành công',
                message: 'Thêm tài khoản thành công',
                type: 'success',
                duration: 2000
            });
            document.querySelector('.signup').classList.remove('open');
            showUser();
            signupFromReset();
        }
        else {
            toast({
                title: 'Thất bại',
                message: 'Số điện thoại đã tồn tại',
                type: 'error',
                duration: 3000
            });
        }
    }
});

    //Chỉnh sửa thông tin user
let updateAccount = document.getElementById('btn-update-account');
    //Mở modal chỉnh sửa tài khoản
let indexFlag;
function openEditAccount(phone) {
    console.log(phone);
    document.querySelector('.signup').classList.add('open');
    document.querySelectorAll('.edit-account').forEach(item => {
        item.style.display = 'block';
    });
    document.querySelectorAll('.add-account').forEach(item => {
        item.style.display = 'none';
    });

    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(account => account.phoneNumber === phone);

    indexFlag = index;

    document.getElementById('fullname').value = accounts[index].fullname;
    document.getElementById('phone').value = accounts[index].phoneNumber;
    document.getElementById('password').value = accounts[index].password;
    document.getElementById('user-status-input').checked = accounts[index].status === 1 ? true : false;
}
    //Ấn nút updateAccount
updateAccount.addEventListener('click', (e) => {
    e.preventDefault();
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let fullname = document.getElementById('fullname').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    let checkLoop = accounts.some(account => account.phoneNumber === phone);
    if (fullname === '' || phone === '' || password === '') {
        toast({
            title: 'Chú ý',
            message: 'Vui lòng nhập đầy đủ thông tin',
            type: 'warning',
            duration: 3000
        });
    }
    else if(phone !== accounts[indexFlag].phoneNumber && checkLoop) {
        toast({
            title: 'Chú ý',
            message: 'Số điện thoại đã tồn tại',
            type: 'warning',
            duration: 3000
        });
    }
    else {
        accounts[indexFlag].fullname = fullname;
        accounts[indexFlag].phoneNumber = phone;
        accounts[indexFlag].password = password;
        accounts[indexFlag].status = document.getElementById('user-status-input').checked ? 1 : 0;
        localStorage.setItem('accounts', JSON.stringify(accounts));
        toast({
            title: 'Thành công',
            message: 'Cập nhật tài khoản thành công',
            type: 'success',
            duration: 2000
        });
        document.querySelector('.signup').classList.remove('open');
        signupFromReset();
        showUser();
    }
});
// End: User

// Start: Order
function showOrder(arr) {
    let orderHTML = '';
    if(arr.length === 0) {
        orderHTML = `<td colspan="6">Không có đơn hàng nào</td>`;
    }
    else {
        arr.forEach(order => {
            let orderStatus = order.orderStatus === 0 ?
                `<span class="status-no-complete">Chưa xử lý</span>`
                :
                `<span class="status-completed">Đã xử lý</span>`;
            let date = dateFormat(order.orderTime);
            orderHTML += `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.customer}</td>
                    <td>${date}</td>
                    <td>${vndFormat(order.orderTotal)}</td>
                    <td>
                        ${orderStatus}
                    </td>
                    <td class="control">
                        <button class="detail-btn" onclick="orderDetail('${order.orderId}')">
                            <i class="fa-regular fa-eye"></i>
                            Chi tiết
                        </button>
                    </td>
                </tr>
            `;
        });
    }
    document.getElementById('show-order').innerHTML = orderHTML;
}
let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
window.onload = showOrder(orders);

    //Tìm kiếm đơn hàng
function searchOrder() {
    let status = parseInt(document.getElementById('order-status').value);
    let orderSearch = document.getElementById('form-search-order').value;
    let dateStart = document.getElementById('time-start-order').value;
    let dateEnd = document.getElementById('time-end-order').value;

    if(dateEnd < dateStart && dateEnd !== '' && dateStart !== '') {
        toast({
            title: 'Chú ý',
            message: 'Ngày bắt đầu hoặc ngày kết thúc không đúng!',
            type: 'warning',
            duration: 3000
        });
        return;
    }
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

    let result = status === 2 ? orders : orders.filter(order => {
        return order.orderStatus === status;
    });

    result = orderSearch === '' ? result : result.filter(order => {
        return  (order.orderId.toString().toLowerCase().includes(orderSearch.toLowerCase()))
                ||
                (order.customer.toString().toLowerCase().includes(orderSearch.toLowerCase()));
    });

    if(dateStart !== '' && dateEnd === '') {
        result = result.filter(order => {
            return new Date(order.orderTime) >= new Date(dateStart).setHours(0, 0, 0);
        });
    }
    else if(dateStart === '' && dateEnd !== '') {
        result = result.filter(order => {
            return new Date(order.orderTime) <= new Date(dateEnd).setHours(23, 59, 59);
        });
    }
    else if(dateStart !== '' && dateEnd !== '') {
        result = result.filter(order => {
            return  (new Date(order.orderTime) <= new Date(dateEnd).setHours(23, 59, 59))
                    &&
                    (new Date(order.orderTime) >= new Date(dateStart).setHours(0, 0, 0));
        });
    }
    showOrder(result);
}
    //Reset lại lựa chọn tìm kiếm
function resetOrderSearch() {
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
    document.getElementById('order-status').value = 2;
    document.getElementById('form-search-order').value = '';
    document.getElementById('time-start-order').value = '';
    document.getElementById('time-end-order').value = '';
    showOrder(orders);
}

    //Get order detail
function getOrderDetail(id) {
    let orderDetails = localStorage.getItem('orderDetails') ? JSON.parse(localStorage.getItem('orderDetails')) : [];
    let orderDetail = [];
    orderDetails.forEach(od => {
        if(od.orderId === id) {
            orderDetail.push(od);
        }
    });
    return orderDetail;
}

    //Show order detail
function orderDetail(id) {
    document.querySelector('.modal.detail-order').classList.add('open');
    body.style.overflow = 'hidden';

    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
    let products = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('products')) : [];
    //Lấy hóa đơn
    let order = orders.find(order => order.orderId === id);
    //Lấy chi tiết hóa đơn
    let orderDetail = getOrderDetail(id);
    let orderDetailHTML = `
        <div class="modal-detail-left">
            <div class="order-item-group">
    `;
    orderDetail.forEach(od => {
        let product = products.find(product => product.productId === od.productId);
        orderDetailHTML += `
            <div class="order-product">
                <div class="order-product-left">
                    <img src="${product.productImg}" alt="">
                    <div class="order-product-info">
                        <h4>${product.productName}</h4>
                        <p class="order-product-note">
                            <i class="fa-light fa-pen"></i>
                            ${od.productNote}
                        </p>
                        <p class="order-product-quantity">SL: ${od.productQty}</p>
                    </div>
                </div>
                <div class="order-product-right">
                    <div class="order-product-price">
                        <span class="order-product-current-price">${vndFormat(product.productPrice)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    orderDetailHTML += `
            </div>
        </div>
    `;
    orderDetailHTML += `
        <div class="modal-detail-right">
            <ul class="detail-order-group">
                <li class="detail-order-item">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-calendar-days"></i>
                        Ngày đặt hàng
                    </span>
                    <span class="detail-order-item-right">${dateFormat(order.orderTime)}</span>
                </li>
                <li class="detail-order-item">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-person-carry-box"></i>
                        Hình thức giao nhận
                    </span>
                    <span class="detail-order-item-right">${order.deliveryMethod}</span>
                </li>
                <li class="detail-order-item">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-calendar-clock"></i>
                        Ngày nhận hàng
                    </span>
                    <span class="detail-order-item-right">
                        ${(order.deliveryTime === '' ? '' : (order.deliveryTime + ' - ')) + dateFormat(order.deliveryDate)}
                    </span>
                </li>
                <li class="detail-order-item">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-location-dot"></i>
                        Địa chỉ nhận hàng
                    </span>
                    <span class="detail-order-item-right">${order.deliveryAddress}</span>
                </li>
                <li class="detail-order-item">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-person"></i>
                        Người nhận hàng
                    </span>
                    <span class="detail-order-item-right">${order.receiverName}</span>
                </li>
                <li class="detail-order-item">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-circle-phone"></i>
                        Số điện thoại nhận hàng
                    </span>
                    <span class="detail-order-item-right">${order.receiverPhone}</span>
                </li>
                <li class="detail-order-item col">
                    <span class="detail-order-item-left">
                        <i class="fa-light fa-note-sticky"></i> 
                        Ghi chú
                    </span>
                    <p class="detail-order-item-b">${order.orderNote}</p>
                </li>
            </ul>
        </div>
    `;
    document.querySelector('.modal-detail-order').innerHTML = orderDetailHTML;

    let classOrderStatusBtn = order.orderStatus === 0 ? 'no-complete-btn' : 'completed-btn';
    let txtOrderStatusBtn = order.orderStatus === 0 ? 'Chưa xử lý' : 'Đã xử lý';
    document.querySelector('.modal-detail-bottom').innerHTML = `
        <div class="modal-bottom-left">
            <div class="total-price">
                <span class="total-price-text">Thành tiền</span>
                <span class="price">${vndFormat(order.orderTotal)}</span>
            </div>
        </div>
        <div class="modal-bottom-right">
            <button class="modal-detail-btn ${classOrderStatusBtn}" onclick="changeOrderStatus('${order.orderId}', this)">
                ${txtOrderStatusBtn}
            </button>
        </div>
    `;
}

    //Change order status
function changeOrderStatus(id, element) {
    let orders = JSON.parse(localStorage.getItem('orders'));
    let order = orders.find(order => order.orderId === id);
    order.orderStatus = 1;
    element.classList.remove('no-complete-btn');
    element.classList.add('completed-btn');
    element.innerHTML = 'Đã xử lý';
    localStorage.setItem('orders', JSON.stringify(orders));
    showOrder(orders);
}
// End: Order

// Start: Sale report (statistical)
    //Tạo một đối tượng để lưu các thông tin sản phẩm đã được mua
function createObj() {
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
    let orderDetails = localStorage.getItem('orderDetails') ? JSON.parse(localStorage.getItem('orderDetails')) : [];
    let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    let objArr = [];    //Mảng chứa tất cả sản phẩm trong orderDetails
    
    orderDetails.forEach(orderDetail => {
         let product = products.find(product => orderDetail.productId === product.productId);
         let object = {};
         object.productId = orderDetail.productId;
         object.orderId = orderDetail.orderId;
         object.price = orderDetail.price;
         object.quantity = orderDetail.productQty;
         object.category = product.productBrand;
         object.name = product.productName;
         object.image = product.productImg;
         object.orderTime = (orders.find(order => order.orderId === orderDetail.orderId)).orderTime;
         objArr.push(object);
    });
    return objArr;
}

    //Hiển thị thống kê theo tìm kiếm
function searchReports(mode) {
    let categoryValue = document.getElementById('report-category').value;
    let searchInputValue = document.getElementById('form-search-report').value;
    let dateStart = document.getElementById('time-start-report').value;
    let dateEnd = document.getElementById('time-end-report').value;

    if (dateStart > dateEnd && dateStart !== '' && dateEnd !== '') {
        toast({
            title: 'Chú ý',
            message: 'Vui lòng chọn ngày tháng tìm kiếm hợp lệ',
            type: 'warning',
            duration: 3000
        });
        return;
    }

    let detailArr = createObj();
    let result = categoryValue === 'Tất cả' ? detailArr : detailArr.filter(item => {
        return item.category === categoryValue;
    });

    result = searchInputValue === '' ? result : result.filter(item => {
        return item.name.toLowerCase().includes(searchInputValue.toLowerCase());
    });

    if(dateStart !== '' && dateEnd === '') {
        result = result.filter(item => {
            return new Date(item.orderTime) >= new Date(dateStart).setHours(0, 0, 0);
        });
    }
    else if(dateStart === '' && dateEnd !== '') {
        result = result.filter(item => {
            return new Date(item.orderTime) <= new Date(dateEnd).setHours(23, 59, 59);
        });
    }
    else if(dateStart !== '' && dateEnd !== '') {
        result = result.filter(item => {
            return  ((new Date(item.orderTime) >= new Date(dateStart).setHours(0, 0, 0))
                    &&
                    (new Date(item.orderTime) <= new Date(dateEnd).setHours(23, 59, 59)));
        });
    }
    //Hiển thị bảng thống kê
    showReports(result, mode);
}
    //Hàm tổng hợp số liệu của các sản phẩm
function mergeObjectReport(arr) {
    let result = [];
    arr.forEach(item => {
        //Tìm kiếm các sản phẩm giống nhau
        //Không có thì trả về undefined
        let check = result.find(i => i.productId === item.productId);
        if(check) {
            check.quantity = parseInt(check.quantity) + parseInt(item.quantity);    //Tính tổng số lượng đã bán của các sản phẩm trùng nhau
            check.revenue += parseInt(item.price) * parseInt(item.quantity);    //Thêm thuộc tính revenue (doanh thu)
        }
        else {
            const newItem = {...item};
            newItem.revenue = newItem.price * newItem.quantity;
            result.push(newItem);
        }
    });
    return result;
}

    //Hàm thống kê số lượng sản phẩm đã bán, doanh thu, đơn hàng chưa xử lý, đơn hàng đã xử lý
function countOrderStatus() {
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
    let orderQty = {
        completed: 0,
        notCompleted: 0
    };
    orders.reduce((acc, order) => {
        if(order.orderStatus === 0) {
            acc.notCompleted++;
        }
        else if(order.orderStatus === 1) {
            acc.completed++;
        }
        return acc;
    }, orderQty);
    return orderQty;
}

    //Hàm show thống kê tổng quan
function showOverview(arr) {
    document.getElementById('revenue').innerText = vndFormat(arr.reduce((sum, curr) => (sum + parseInt(curr.revenue)), 0));
    document.getElementById('quantity-product').innerText = arr.reduce((sum, curr) => (sum + parseInt(curr.quantity)), 0);
    document.getElementById('quantity-not-completed-order').innerText = countOrderStatus().notCompleted;
    document.getElementById('quantity-completed-order').innerText = countOrderStatus().completed;
}

function showReports(arr, mode) {
    console.log(arr);
    let orderHTML = '';
    let mergeObject = mergeObjectReport(arr);
    showOverview(mergeObject);
    
    switch(mode) {
        case 0: //Ấn nút reset
            mergeObject = mergeObjectReport(createObj());
            showOverview(mergeObject);
            document.getElementById('report-category').value = 'Tất cả';
            document.getElementById('form-search-report').value = '';
            document.getElementById('time-start-report').value = '';
            document.getElementById('time-end-report').value = '';
            break;
        case 1: //Ấn nút sắp xếp tăng dần
            mergeObject.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
            break;
        case 2: //Ấn nút sắp xếp giảm dần
            mergeObject.sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity));
            break;
    }
    //Hiển thị các dòng sản phẩm đã được mua
    for(let i = 0; i < mergeObject.length; i++) {
        orderHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>
                    <div class="product-img-title">
                        <img src="${mergeObject[i].image}" alt="" class="product-img-table">
                        <p>${mergeObject[i].name}</p>
                    </div>
                </td>
                <td>${mergeObject[i].quantity}</td>
                <td>${vndFormat(mergeObject[i].revenue)}</td>
                <td>
                    <button class="detail-btn product-order-detail-btn" data-id="${mergeObject[i].productId}">
                        <i class="fa-regular fa-eye"></i>
                        Chi tiết
                    </button>
                </td>
            </tr>
        `;
    }
    document.getElementById('show-report').innerHTML = orderHTML;
    //Xem các đơn hàng của sản phẩm
    document.querySelectorAll('.product-order-detail-btn').forEach(element => {
        let productId = parseInt(element.getAttribute('data-id'));
        element.addEventListener('click', () => {
            showProductOrderDetail(arr, productId); 
        });
    });
}
showReports(createObj());

    //Hiển thị danh sách các đơn hàng của sản phẩm
function showProductOrderDetail(arr, id) {
    let orderHTML = '';
    arr.forEach(item => {
        console.log(item)
         if(item.productId === id) {
             orderHTML += `
                <tr>
                    <td>${item.orderId}</td>
                    <td>${item.quantity}</td>
                    <td>${vndFormat(item.price)}</td>
                    <td>${vndFormat(item.price * item.quantity)}</td>
                    <td>${dateFormat(item.orderTime)}</td>
                </tr>
             `;
         }
    });
    document.getElementById('show-product-order-detail').innerHTML = orderHTML;
    document.querySelector('.modal.product-order-detail').classList.add('open');
    body.style.overflow = 'hidden';
}
// End: Sale report (statistical)

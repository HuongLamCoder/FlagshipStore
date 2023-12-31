//Phương thức của mảng
/*  
let array = [1, 2, 3, 4, 5];
let subArr = array.slice(2);   //slice(start, end) lấy các phần tử từ start đến end-1 (nếu chỉ có start thì lấy từ start đến hết)
subArr = array.splice(2);   //splice(start, deleteCount) xóa deleteCount phần tử từ vị trí start và trả về các phần tử đã xóa (nếu chỉ có start thì xóa từ start đến hết)
subArr = array.splice(2, 0, 6, 7);   //Thêm 6, 7 vào vị trí thứ 2 của array
console.log(array);
console.log(subArr);
*/

//Khi lấy dữ liệu từ localStorage thì kiểu number có được giữ nguyên hay không?
/*  
var object = {
    name: 'Nguyen Van A',
    age: 20,
    address: 'Ha Noi'
};
console.log(typeof object.age);
window.onload = () => {
    localStorage.setItem('object', JSON.stringify(object));
}
var lcobj = JSON.parse(localStorage.getItem('object'));
console.log(lcobj.age === 20);
*/

let product = {
    productId: 1,
    productStatus: 1,
    productBrand: "Samsung",
    productName: "Samsung Galaxy S23 Ultra 5G",
    productImg: "assets/img/productImg/001.jpg",
    productSpecs: {
        chip: 'Snapdragon 8 Gen 2 for Galaxy',
        ram: '8GB',
        storage: '128GB',
        screen: '6.8 inch',
        rearCam: 'Chính 200 MP & Phụ 12 MP, 10 MP, 10 MP',
        frontCam: '12 MP',
        battery: '5000 mAh',
    },
    productPrice: 23990000,
    releaseDate: '09/2023'
}
console.log(new Date(product.releaseDate));



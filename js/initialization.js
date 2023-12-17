//Tạo và lưu danh sách sản phẩm vào localStorage
function createProducts() {
    if(localStorage.getItem('products') == null) {
        let productArray = [
            // Samsung
            {
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
                productPrice: 23990000
            },
            {
                productId: 2,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy S23 5G",
                productImg: "assets/img/productImg/002.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 2 for Galaxy',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 50 MP & Phụ 12 MP, 10 MP',
                    frontCam: '12 MP',
                    battery: '3900 mAh',
                },
                productPrice: 15990000
            },
            {
                productId: 3,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy Z Fold5 5G",
                productImg: "assets/img/productImg/003.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 2 for Galaxy',
                    ram: '12GB',
                    storage: '256GB',
                    screen: '7.6 inch',
                    rearCam: 'Chính 10 MP & Phụ 4 MP',
                    frontCam: '12 MP',
                    battery: '4400 mAh',
                },
                productPrice: 47990000
            },
            {
                productId: 4,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy Z Flip5 5G",
                productImg: "assets/img/productImg/004.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 2 for Galaxy',
                    ram: '12GB',
                    storage: '128GB',
                    screen: '7.2 inch',
                    rearCam: 'Chính 40 MP & Phụ 10 MP',
                    frontCam: '12 MP',
                    battery: '3900 mAh',
                },
                productPrice: 21990000
            },
            {
                productId: 5,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy S23+ 5G",
                productImg: "assets/img/productImg/005.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 2 for Galaxy',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.6 inch',
                    rearCam: 'Chính 40 MP & Phụ 10 MP',
                    frontCam: '12 MP',
                    battery: '4700 mAh',
                },
                productPrice: 22990000
            },
            {
                productId: 6,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy S22 Ultra 5G",
                productImg: "assets/img/productImg/006.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 1 for Galaxy',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.6 inch',
                    rearCam: 'Chính 40 MP & Phụ 10 MP',
                    frontCam: '12 MP',
                    battery: '4400 mAh',
                },
                productPrice: 16990000
            },
            {
                productId: 7,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy Z Fold4 5G",
                productImg: "assets/img/productImg/007.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 1 for Galaxy',
                    ram: '12GB',
                    storage: '512GB',
                    screen: '7.6 inch',
                    rearCam: 'Chính 50 MP & Phụ 14 MP',
                    frontCam: '10 MP',
                    battery: '4400 mAh',
                },
                productPrice: 29990000
            },
            {
                productId: 8,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy Z Flip4 5G",
                productImg: "assets/img/productImg/008.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 1 for Galaxy',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '7.2 inch',
                    rearCam: 'Chính 50 MP & Phụ 14 MP',
                    frontCam: '10 MP',
                    battery: '3900 mAh',
                },
                productPrice: 12990000
            },
            {
                productId: 9,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy S23 FE 5G",
                productImg: "assets/img/productImg/009.jpg",
                productSpecs: {
                    chip: 'Exynos 2200 8 nhân',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.4 inch',
                    rearCam: 'Chính 50 MP & Phụ 12 MP, 8 MP',
                    frontCam: '10 MP',
                    battery: '4500 mAh',
                },
                productPrice: 13390000
            },
            {
                productId: 10,
                productStatus: 1,
                productBrand: "Samsung",
                productName: "Samsung Galaxy S21 FE 5G",
                productImg: "assets/img/productImg/010.jpg",
                productSpecs: {
                    chip: 'Exynos 2100',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.4 inch',
                    rearCam: 'Chính 12 MP & Phụ 12 MP, 8 MP',
                    frontCam: '32 MP',
                    battery: '4500 mAh',
                },
                productPrice: 11990000
            },
            //Apple
            {
                productId: 11,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 15 Pro Max",
                productImg: "assets/img/productImg/011.jpg",
                productSpecs: {
                    chip: 'Apple A17 Pro',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 48 MP & Phụ 12 MP, 12 MP',
                    frontCam: '12 MP',
                    battery: '4422 mAh',
                },
                productPrice: 33990000
            },
            {
                productId: 12,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 15 Pro",
                productImg: "assets/img/productImg/012.jpg",
                productSpecs: {
                    chip: 'Apple A17 Pro',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 48 MP & Phụ 12 MP, 12 MP',
                    frontCam: '12 MP',
                    battery: '3274 mAh',
                },
                productPrice: 28890000
            },
            {
                productId: 13,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 15 Plus",
                productImg: "assets/img/productImg/013.jpg",
                productSpecs: {
                    chip: 'Apple A16 Bionic',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 48 MP & Phụ 12 MP, 12 MP',
                    frontCam: '12 MP',
                    battery: '4383 mAh',
                },
                productPrice: 25790000
            },
            {
                productId: 14,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 15",
                productImg: "assets/img/productImg/014.jpg",
                productSpecs: {
                    chip: 'Apple A16 Bionic',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 48 MP & Phụ 12 MP, 12 MP',
                    frontCam: '12 MP',
                    battery: '3932 mAh',
                },
                productPrice: 21990000
            },
            {
                productId: 15,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 14 Pro Max",
                productImg: "assets/img/productImg/015.jpg",
                productSpecs: {
                    chip: 'Apple A16 Bionic',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 48 MP & Phụ 12 MP, 12 MP',
                    frontCam: '12 MP',
                    battery: '4323 mAh',
                },
                productPrice: 27490000
            },
            {
                productId: 16,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 14 Pro",
                productImg: "assets/img/productImg/016.jpg",
                productSpecs: {
                    chip: 'Apple A16 Bionic',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 48 MP & Phụ 12 MP, 12 MP',
                    frontCam: '12 MP',
                    battery: '3200 mAh',
                },
                productPrice: 25190000
            },
            {
                productId: 17,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 14 Plus",
                productImg: "assets/img/productImg/017.jpg",
                productSpecs: {
                    chip: 'Apple A15 Bionic',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 12 MP & Phụ 12 MP',
                    frontCam: '12 MP',
                    battery: '4325 mAh',
                },
                productPrice: 21990000
            },
            {
                productId: 18,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 14",
                productImg: "assets/img/productImg/018.jpg",
                productSpecs: {
                    chip: 'Apple A15 Bionic',
                    ram: '6GB',
                    storage: '128GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 12 MP & Phụ 12 MP',
                    frontCam: '12 MP',
                    battery: '3279 mAh',
                },
                productPrice: 18990000
            },
            {
                productId: 19,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 13",
                productImg: "assets/img/productImg/019.jpg",
                productSpecs: {
                    chip: 'Apple A15 Bionic',
                    ram: '4GB',
                    storage: '128GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 12 MP & Phụ 12 MP',
                    frontCam: '12 MP',
                    battery: '3240 mAh',
                },
                productPrice: 16490000
            },
            {
                productId: 20,
                productStatus: 1,
                productBrand: "Apple",
                productName: "iPhone 12",
                productImg: "assets/img/productImg/020.jpg",
                productSpecs: {
                    chip: 'Apple A15 Bionic',
                    ram: '4GB',
                    storage: '64GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 12 MP & Phụ 12 MP',
                    frontCam: '12 MP',
                    battery: '2815 mAh',
                },
                productPrice: 13690000
            },
            //Oppo
            {
                productId: 21,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Find N3 5G",
                productImg: "assets/img/productImg/021.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 2',
                    ram: '16GB',
                    storage: '512GB',
                    screen: '7.82 inch',
                    rearCam: 'Chính 48 MP & Phụ 48 MP, 64 MP',
                    frontCam: '20 MP',
                    battery: '4805 mAh',
                },
                productPrice: 44990000
            },
            {
                productId: 22,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Find N3 Flip 5G",
                productImg: "assets/img/productImg/022.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8 Gen 2',
                    ram: '12GB',
                    storage: '256GB',
                    screen: '6.8 inch',
                    rearCam: 'Chính 50 MP & Phụ 48 MP, 32 MP',
                    frontCam: '20 MP',
                    battery: '4300 mAh',
                },
                productPrice: 22990000
            },
            {
                productId: 23,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Reno10 Pro+ 5G",
                productImg: "assets/img/productImg/023.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8+ Gen 1',
                    ram: '12GB',
                    storage: '256GB',
                    screen: '7.22 inch',
                    rearCam: 'Chính 50 MP & Phụ 64 MP, 8 MP',
                    frontCam: '32 MP',
                    battery: '4700 mAh',
                },
                productPrice: 19990000
            },
            {
                productId: 24,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Reno10 Pro 5G",
                productImg: "assets/img/productImg/024.jpg",
                productSpecs: {
                    chip: 'Snapdragon 778G',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 50 MP & Phụ 32 MP, 8 MP',
                    frontCam: '32 MP',
                    battery: '4600 mAh',
                },
                productPrice: 13990000
            },
            {
                productId: 25,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Reno10 5G",
                productImg: "assets/img/productImg/025.jpg",
                productSpecs: {
                    chip: 'MediaTek Dimensity 7050',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 32 MP & Phụ 8 MP',
                    frontCam: '20 MP',
                    battery: '5000 mAh',
                },
                productPrice: 9490000
            },
            {
                productId: 26,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Find N2 Flip 5G",
                productImg: "assets/img/productImg/026.jpg",
                productSpecs: {
                    chip: 'MediaTek 9000+',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.8 inch',
                    rearCam: 'Chính 50 MP & Phụ 8 MP',
                    frontCam: '32 MP',
                    battery: '4300 mAh',
                },
                productPrice: 17990000
            },
            {
                productId: 27,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Reno8 Pro 5G",
                productImg: "assets/img/productImg/027.jpg",
                productSpecs: {
                    chip: 'MediaTek 9000+',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.8 inch',
                    rearCam: 'Chính 50 MP & Phụ 8 MP',
                    frontCam: '20 MP',
                    battery: '4300 mAh',
                },
                productPrice: 13990000
            },
            {
                productId: 28,
                productStatus: 1,
                productBrand: "Oppo",
                productName: "OPPO Reno8 T 5G",
                productImg: "assets/img/productImg/028.jpg",
                productSpecs: {
                    chip: 'Helio G99',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.8 inch',
                    rearCam: 'Chính 32 MP & Phụ 8 MP',
                    frontCam: '20 MP',
                    battery: '3900 mAh',
                },
                productPrice: 8990000
            },
            //Xiaomi
            {
                productId: 29,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi 13T Pro 5G",
                productImg: "assets/img/productImg/029.jpg",
                productSpecs: {
                    chip: 'MediaTek Dimensity 9200+',
                    ram: '12GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 50 MP & Phụ 50 MP, 12 MP',
                    frontCam: '20 MP',
                    battery: '5000 mAh',
                },
                productPrice: 14990000
            },
            {
                productId: 30,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi 13T 5G",
                productImg: "assets/img/productImg/030.jpg",
                productSpecs: {
                    chip: 'MediaTek Dimensity 8200',
                    ram: '12GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 50 MP & Phụ 50 MP, 12 MP',
                    frontCam: '20 MP',
                    battery: '4000 mAh',
                },
                productPrice: 10990000
            },
            {
                productId: 31,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi 13T Lite 5G",
                productImg: "assets/img/productImg/031.jpg",
                productSpecs: {
                    chip: 'Snapdragon 7 Gen 1',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 50 MP & Phụ 8 MP, 2 MP',
                    frontCam: '32 MP',
                    battery: '4000 mAh',
                },
                productPrice: 9490000
            },
            {
                productId: 32,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi 12T 5G",
                productImg: "assets/img/productImg/032.jpg",
                productSpecs: {
                    chip: 'MediaTek Dimensity 8100',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP',
                    frontCam: '20 MP',
                    battery: '5000 mAh',
                },
                productPrice: 9490000
            },
            {
                productId: 33,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi Redmi Note 12 Pro 5G",
                productImg: "assets/img/productImg/033.jpg",
                productSpecs: {
                    chip: 'MediaTek Dimensity 1080',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP',
                    frontCam: '16 MP',
                    battery: '5000 mAh',
                },
                productPrice: 8490000
            },
            {
                productId: 34,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi Poco F4",
                productImg: "assets/img/productImg/034.jpg",
                productSpecs: {
                    chip: 'Qualcomm SM7150 Snapdragon 732G',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP',
                    frontCam: '16 MP',
                    battery: '5000 mAh',
                },
                productPrice: 7140000
            },
            {
                productId: 35,
                productStatus: 1,
                productBrand: "Xiaomi",
                productName: "Xiaomi 11T",
                productImg: "assets/img/productImg/035.jpg",
                productSpecs: {
                    chip: 'MediaTek Dimensity 1200-Ultra',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP',
                    frontCam: '16 MP',
                    battery: '5000 mAh',
                },
                productPrice: 8490000
            },
            //Huawei
            {
                productId: 36,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei P60 Pro",
                productImg: "assets/img/productImg/036.jpg",
                productSpecs: {
                    chip: 'Snapdragon 8+ Gen 1',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 48 MP & Phụ 48 MP, 13 MP',
                    frontCam: '13 MP',
                    battery: '4815 mAh',
                },
                productPrice: 14890000
            },
            {
                productId: 37,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova 10",
                productImg: "assets/img/productImg/037.jpg",
                productSpecs: {
                    chip: 'Qualcomm SM7325 Snapdragon 778G',
                    ram: '16GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 50 MP & Phụ 8 MP, 2 MP',
                    frontCam: '13 MP',
                    battery: '4000 mAh',
                },
                productPrice: 27990000
            },
            {
                productId: 38,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova 10 Pro",
                productImg: "assets/img/productImg/038.jpg",
                productSpecs: {
                    chip: 'Qualcomm SM7325 Snapdragon 778G',
                    ram: '16GB',
                    storage: '256GB',
                    screen: '6.7 inch',
                    rearCam: 'Chính 50 MP & Phụ 50 MP, 13 MP',
                    frontCam: '13 MP',
                    battery: '4500 mAh',
                },
                productPrice: 28990000
            },
            {
                productId: 39,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Pocket S",
                productImg: "assets/img/productImg/039.jpg",
                productSpecs: {
                    chip: 'Qualcomm SM7325 Snapdragon 778G',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 40 MP & Phụ 50 MP',
                    frontCam: '13 MP',
                    battery: '5000 mAh',
                },
                productPrice: 9000000
            },
            {
                productId: 40,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova 9 SE",
                productImg: "assets/img/productImg/040.jpg",
                productSpecs: {
                    chip: 'Snapdragon 680',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP, 2 MP',
                    frontCam: '13 MP',
                    battery: '4000 mAh',
                },
                productPrice: 8000000
            },
            {
                productId: 41,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova 10 SE",
                productImg: "assets/img/productImg/041.jpg",
                productSpecs: {
                    chip: 'Qualcomm Snapdragon 778G',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP, 2 MP',
                    frontCam: '13 MP',
                    battery: '4500 mAh',
                },
                productPrice: 11000000
            },
            {
                productId: 42,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova 10z",
                productImg: "assets/img/productImg/042.jpg",
                productSpecs: {
                    chip: 'HarmonyOS 2.0',
                    ram: '16GB',
                    storage: '256GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 2 MP, 2 MP',
                    frontCam: '13 MP',
                    battery: '4000 mAh',
                },
                productPrice: 14000000
            },
            {
                productId: 43,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova 7 SE",
                productImg: "assets/img/productImg/043.jpg",
                productSpecs: {
                    chip: 'HarmonyOS 1.0',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 4 MP, 2 MP, 2 MP',
                    frontCam: '13 MP',
                    battery: '4000 mAh',
                },
                productPrice: 8500000
            },
            {
                productId: 44,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova Mate Xs 2",
                productImg: "assets/img/productImg/044.jpg",
                productSpecs: {
                    chip: 'Snapdragon 888',
                    ram: '8GB',
                    storage: '256GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 4 MP, 2 MP, 2 MP',
                    frontCam: '13 MP',
                    battery: '4000 mAh',
                },
                productPrice: 9200000
            },
            {
                productId: 45,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei P30 Lite",
                productImg: "assets/img/productImg/045.jpg",
                productSpecs: {
                    chip: 'Snapdragon 888',
                    ram: '16GB',
                    storage: '256GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 4 MP, 4 MP',
                    frontCam: '13 MP',
                    battery: '4500 mAh',
                },
                productPrice: 19900000
            },
            {
                productId: 46,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei P30 Pro",
                productImg: "assets/img/productImg/046.jpg",
                productSpecs: {
                    chip: 'Snapdragon 888',
                    ram: '16GB',
                    storage: '512GB',
                    screen: '6.9 inch',
                    rearCam: 'Chính 108 MP & Phụ 8 MP, 4 MP, 4 MP',
                    frontCam: '13 MP',
                    battery: '5000 mAh',
                },
                productPrice: 23900000
            },
            {
                productId: 47,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei P30",
                productImg: "assets/img/productImg/047.jpg",
                productSpecs: {
                    chip: 'HiSilicon Kirin 980',
                    ram: '8GB',
                    storage: '128GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 40 MP & Phụ 16 MP, 8 MP',
                    frontCam: '32 MP',
                    battery: '3650 mAh',
                },
                productPrice: 16990000
            },
            {
                productId: 48,
                productStatus: 1,
                productBrand: "Huawei",
                productName: "Huawei Nova Y60",
                productImg: "assets/img/productImg/048.jpg",
                productSpecs: {
                    chip: 'MediaTek MT6765',
                    ram: '8GB',
                    storage: '64GB',
                    screen: '6.1 inch',
                    rearCam: 'Chính 20 MP & Phụ 8 MP, 4 MP',
                    frontCam: '20 MP',
                    battery: '5000 mAh',
                },
                productPrice: 7200000
            },
        ];

        //Xáo trộn mảng sản phẩm
        productArray.sort(() => Math.random() - 0.5);
        productArray.forEach((product, index) => {
            product.productId = index + 1;
        });

        //lưu danh sách sản phẩm vào localStorage
        localStorage.setItem('products', JSON.stringify(productArray));
    }
}

//Tạo và lưu tài khoản vào localStorage
function createAdminAccounts() {
    let accounts = localStorage.getItem('accounts');
    if(accounts == null) {
        accounts = [];
        accounts.push({
            fullname: 'Nguyễn Phạm Quỳnh Hương',
            phoneNumber: '0123456789',
            password: 'admin1',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1     //admin: 1, user: 0
        });
        accounts.push({
            fullname: 'Trần Tiến Phát',
            phoneNumber: '0987654321',
            password: 'admin2',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1
        });
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}

window.onload = createProducts();
window.onload = createAdminAccounts();

// Product images
import product1 from './product-01.jpg';
import product2 from './product-02.jpeg';
import product3 from './product-03.jpeg';
import product4 from './product-04.jpg';
import product5 from './product-05.jpg';
import product6 from './product-06.jpg';
import product7 from './product-07.jpg';
import product8 from './product-08.jpg';
import product9 from './product-09.jpg';
import product10 from './product-10.jpg';
import product11 from './product-11.jpg';
import product12 from './product-12.jpg';
import product13 from './product-13.jpg';
import product14 from './product-14.jpg';
import product15 from './product-15.jpg';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';
// import product from './product.png';

// UI assets
import edit from './edit_icon.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import cart_icon from './cart_icon.png';
import bin_icon from './bin_icon.png';
import dropdown_icon from './dropdown_icon.png';
import exchange_icon from './exchange_icon.png';
import menu_icon from './menu_icon.png';
import contact_icon from './contact_icon.png';
import cross_icon from './cross_icon.png';
import search_icon from './search_icon.png';
import profile_icon from './profile_icon.png';
import hero from './hero.jpg';
import star_icon from './star_icon.png';
import star_dull_icon from './star_dull.png';
import quality_icon from './quality_icon.png';
import support_icon from './support_icon.png';
import easypaisa from './easypaisa_icon.png';
import jazzcash from './jazzcash_icon.png';
import about_img from './about_img.jpg';
import size_chart from './size_chart.jpg';
import reset_icon from './reset_icon.png';

export const assets = {
  logo, logo_dark, 
  cart_icon,
  dropdown_icon,
  exchange_icon,
  bin_icon,
  menu_icon,
  contact_icon,
  cross_icon,
  search_icon,
  hero,
  profile_icon,
  star_icon, support_icon, quality_icon,star_dull_icon,
  easypaisa, jazzcash, about_img,
  edit, size_chart,reset_icon
};

export const demoProducts = [
  {
    _id: "denim01",
    name: "Classic Denim Jacket",
    sku: "CDJ-001",
    brand: "DenimCo",
    tags: "classic,denim,jacket,casual",
    shortDescription: "A timeless denim jacket with a comfortable fit.",
    longDescription:
      "This classic denim jacket features premium cotton fabric, button closures, and a versatile design perfect for any casual occasion. Durable and stylish, it pairs well with jeans or dresses.",
    price: 120,
    discount: 10,
    stockQuantity: 50,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [
      { file: product1, previewUrl: product1, type: "image" },
      { file: product4, previewUrl: product4, type: "image" },
    ],
    category: "Women",
    subCategory: "Denim",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { size: "S", color: "Blue", price: 120, stock: 10 },
      { size: "M", color: "Blue", price: 120, stock: 20 },
      { size: "L", color: "Blue", price: 120, stock: 15 },
      { size: "XL", color: "Blue", price: 120, stock: 5 },
    ],
    weight: 1.2,
    dimensions: { length: 60, width: 50, height: 5 },
    shippingClass: "Standard",
    metaTitle: "Classic Denim Jacket - DenimCo",
    metaDescription:
      "Shop the Classic Denim Jacket by DenimCo. Comfortable, stylish, and perfect for casual wear.",
    urlSlug: "classic-denim-jacket",
    imageAltText: "Classic Denim Jacket front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim02",
    name: "Ripped Denim Jacket",
    sku: "RDJ-002",
    brand: "UrbanWear",
    tags: "ripped,denim,jacket,edgy",
    shortDescription: "Edgy and fashionable ripped denim jacket.",
    longDescription:
      "Make a statement with this ripped denim jacket featuring distressed details and a modern fit. Perfect for casual outings and street style looks.",
    price: 130,
    discount: 0,
    stockQuantity: 30,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product2, previewUrl: product2, type: "image" }],
    category: "Men",
    subCategory: "Denim",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Black", price: 130, stock: 10 },
      { size: "M", color: "Black", price: 130, stock: 15 },
      { size: "L", color: "Black", price: 130, stock: 5 },
    ],
    weight: 1.3,
    dimensions: { length: 62, width: 52, height: 6 },
    shippingClass: "Express",
    metaTitle: "Ripped Denim Jacket - UrbanWear",
    metaDescription:
      "Shop the edgy Ripped Denim Jacket by UrbanWear. Distressed style for a bold look.",
    urlSlug: "ripped-denim-jacket",
    imageAltText: "Ripped Denim Jacket front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim03",
    name: "Denim Bomber Jacket",
    sku: "DBJ-003",
    brand: "KidsStyle",
    tags: "denim,bomber,jacket,kids",
    shortDescription: "Modern twist on the classic bomber jacket.",
    longDescription:
      "This denim bomber jacket for kids combines style and comfort with high-quality denim and a trendy design. Perfect for active youngsters.",
    price: 140,
    discount: 5,
    stockQuantity: 40,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product3, previewUrl: product3, type: "image" }],
    category: "Kids",
    subCategory: "Denim",
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", color: "Light Blue", price: 140, stock: 15 },
      { size: "L", color: "Light Blue", price: 140, stock: 15 },
      { size: "XL", color: "Light Blue", price: 140, stock: 10 },
    ],
    weight: 0.9,
    dimensions: { length: 55, width: 45, height: 4 },
    shippingClass: "Standard",
    metaTitle: "Denim Bomber Jacket for Kids - KidsStyle",
    metaDescription:
      "Shop the Denim Bomber Jacket for kids by KidsStyle. Stylish and comfortable.",
    urlSlug: "denim-bomber-jacket-kids",
    imageAltText: "Denim Bomber Jacket kids front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim04",
    name: "Denim Trucker Jacket",
    sku: "DTJ-004",
    brand: "DenimCo",
    tags: "denim,trucker,jacket,durable",
    shortDescription: "Durable and stylish trucker jacket.",
    longDescription:
      "This trucker jacket is made from durable denim fabric with a classic fit and multiple pockets. A must-have for any wardrobe.",
    price: 125,
    discount: 0,
    stockQuantity: 35,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product4, previewUrl: product4, type: "image" }],
    category: "Women",
    subCategory: "Denim",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Blue", price: 125, stock: 10 },
      { size: "M", color: "Blue", price: 125, stock: 15 },
      { size: "L", color: "Blue", price: 125, stock: 10 },
    ],
    weight: 1.1,
    dimensions: { length: 58, width: 48, height: 5 },
    shippingClass: "Standard",
    metaTitle: "Denim Trucker Jacket - DenimCo",
    metaDescription:
      "Shop the durable Denim Trucker Jacket by DenimCo. Classic style and multiple pockets.",
    urlSlug: "denim-trucker-jacket",
    imageAltText: "Denim Trucker Jacket front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim05",
    name: "Oversized Denim Jacket",
    sku: "ODJ-005",
    brand: "UrbanWear",
    tags: "oversized,denim,jacket,trendy",
    shortDescription: "Comfortable and trendy oversized denim jacket.",
    longDescription:
      "This oversized denim jacket is perfect for layering and offers a relaxed, trendy look. Made with soft denim fabric for comfort.",
    price: 135,
    discount: 15,
    stockQuantity: 45,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product5, previewUrl: product5, type: "image" }],
    category: "Men",
    subCategory: "Denim",
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", color: "Blue", price: 135, stock: 15 },
      { size: "L", color: "Blue", price: 135, stock: 20 },
      { size: "XL", color: "Blue", price: 135, stock: 10 },
    ],
    weight: 1.4,
    dimensions: { length: 65, width: 55, height: 6 },
    shippingClass: "Express",
    metaTitle: "Oversized Denim Jacket - UrbanWear",
    metaDescription:
      "Shop the trendy Oversized Denim Jacket by UrbanWear. Comfortable and perfect for layering.",
    urlSlug: "oversized-denim-jacket",
    imageAltText: "Oversized Denim Jacket front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim06",
    name: "Denim Blazer Jacket",
    sku: "DBZ-006",
    brand: "KidsStyle",
    tags: "denim,blazer,jacket,chic",
    shortDescription: "A chic denim blazer for sophistication.",
    longDescription:
      "This denim blazer jacket adds a touch of sophistication to any outfit. Perfect for kids who want to look stylish and smart.",
    price: 150,
    discount: 0,
    stockQuantity: 25,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product6, previewUrl: product6, type: "image" }],
    category: "Kids",
    subCategory: "Denim",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Dark Blue", price: 150, stock: 8 },
      { size: "M", color: "Dark Blue", price: 150, stock: 10 },
      { size: "L", color: "Dark Blue", price: 150, stock: 7 },
    ],
    weight: 1.0,
    dimensions: { length: 57, width: 47, height: 5 },
    shippingClass: "Standard",
    metaTitle: "Denim Blazer Jacket for Kids - KidsStyle",
    metaDescription:
      "Shop the chic Denim Blazer Jacket for kids by KidsStyle. Stylish and smart.",
    urlSlug: "denim-blazer-jacket-kids",
    imageAltText: "Denim Blazer Jacket kids front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim07",
    name: "Vintage Denim Jacket",
    sku: "VDJ-007",
    brand: "DenimCo",
    tags: "vintage,denim,jacket,classic",
    shortDescription: "Vintage-inspired denim jacket with unique wash.",
    longDescription:
      "This vintage denim jacket features a unique wash and classic fit, perfect for those who love retro style with modern comfort.",
    price: 145,
    discount: 5,
    stockQuantity: 40,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product7, previewUrl: product7, type: "image" }],
    category: "Women",
    subCategory: "Denim",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Faded Blue", price: 145, stock: 12 },
      { size: "M", color: "Faded Blue", price: 145, stock: 15 },
      { size: "L", color: "Faded Blue", price: 145, stock: 13 },
    ],
    weight: 1.3,
    dimensions: { length: 61, width: 51, height: 5 },
    shippingClass: "Standard",
    metaTitle: "Vintage Denim Jacket - DenimCo",
    metaDescription:
      "Shop the Vintage Denim Jacket by DenimCo. Retro style with modern comfort.",
    urlSlug: "vintage-denim-jacket",
    imageAltText: "Vintage Denim Jacket front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim08",
    name: "Denim Hooded Jacket",
    sku: "DHJ-008",
    brand: "UrbanWear",
    tags: "denim,hooded,jacket,casual",
    shortDescription: "Casual denim jacket with comfortable hood.",
    longDescription:
      "This denim hooded jacket offers casual style and comfort with a soft hood and durable denim fabric. Perfect for everyday wear.",
    price: 155,
    discount: 0,
    stockQuantity: 30,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product8, previewUrl: product8, type: "image" }],
    category: "Men",
    subCategory: "Leather",
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", color: "Blue", price: 155, stock: 10 },
      { size: "L", color: "Blue", price: 155, stock: 12 },
      { size: "XL", color: "Blue", price: 155, stock: 8 },
    ],
    weight: 1.5,
    dimensions: { length: 63, width: 53, height: 6 },
    shippingClass: "Express",
    metaTitle: "Denim Hooded Jacket - UrbanWear",
    metaDescription:
      "Shop the casual Denim Hooded Jacket by UrbanWear. Comfortable and stylish.",
    urlSlug: "denim-hooded-jacket",
    imageAltText: "Denim Hooded Jacket front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim09",
    name: "Denim Vest Jacket",
    sku: "DVJ-009",
    brand: "KidsStyle",
    tags: "denim,vest,jacket,sleeveless",
    shortDescription: "Sleeveless denim vest jacket for layering.",
    longDescription:
      "This sleeveless denim vest jacket is perfect for layering over shirts and sweaters. Durable and stylish for kids.",
    price: 110,
    discount: 0,
    stockQuantity: 20,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product9, previewUrl: product9, type: "image" }],
    category: "Kids",
    subCategory: "Denim",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Blue", price: 110, stock: 7 },
      { size: "M", color: "Blue", price: 110, stock: 8 },
      { size: "L", color: "Blue", price: 110, stock: 5 },
    ],
    weight: 0.7,
    dimensions: { length: 50, width: 40, height: 3 },
    shippingClass: "Standard",
    metaTitle: "Denim Vest Jacket for Kids - KidsStyle",
    metaDescription:
      "Shop the Denim Vest Jacket for kids by KidsStyle. Stylish and perfect for layering.",
    urlSlug: "denim-vest-jacket-kids",
    imageAltText: "Denim Vest Jacket kids front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim10",
    name: "Denim Sherpa Jacket",
    sku: "DSJ-010",
    brand: "DenimCo",
    tags: "denim,sherpa,jacket,warm",
    shortDescription: "Warm denim jacket lined with sherpa.",
    longDescription:
      "Stay warm with this sherpa-lined denim jacket. Soft and cozy lining combined with durable denim fabric for cold days.",
    price: 160,
    discount: 0,
    stockQuantity: 25,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product10, previewUrl: product10, type: "image" }],
    category: "Women",
    subCategory: "Denim",
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", color: "Blue", price: 160, stock: 10 },
      { size: "L", color: "Blue", price: 160, stock: 10 },
      { size: "XL", color: "Blue", price: 160, stock: 5 },
    ],
    weight: 1.6,
    dimensions: { length: 64, width: 54, height: 6 },
    shippingClass: "Express",
    metaTitle: "Denim Sherpa Jacket - DenimCo",
    metaDescription:
      "Shop the warm Denim Sherpa Jacket by DenimCo. Cozy and stylish for cold weather.",
    urlSlug: "denim-sherpa-jacket",
    imageAltText: "Denim Sherpa Jacket front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim11",
    name: "Denim Cropped Jacket",
    sku: "DCJ-011",
    brand: "UrbanWear",
    tags: "denim,cropped,jacket,trendy",
    shortDescription: "Trendy cropped denim jacket.",
    longDescription:
      "This cropped denim jacket pairs well with high-waisted pants and skirts. Stylish and perfect for a modern look.",
    price: 125,
    discount: 0,
    stockQuantity: 30,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product11, previewUrl: product11, type: "image" }],
    category: "Men",
    subCategory: "Denim",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Blue", price: 125, stock: 10 },
            { size: "M", color: "Blue", price: 125, stock: 15 },
      { size: "L", color: "Blue", price: 125, stock: 5 },
    ],
    weight: 1.1,
    dimensions: { length: 55, width: 45, height: 4 },
    shippingClass: "Standard",
    metaTitle: "Denim Cropped Jacket - UrbanWear",
    metaDescription:
      "Shop the trendy Denim Cropped Jacket by UrbanWear. Perfect for a modern look.",
    urlSlug: "denim-cropped-jacket",
    imageAltText: "Denim Cropped Jacket front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim12",
    name: "Denim Parka Jacket",
    sku: "DPJ-012",
    brand: "KidsStyle",
    tags: "denim,parka,jacket,stylish",
    shortDescription: "Stylish denim parka jacket with drawstring waist.",
    longDescription:
      "This denim parka jacket features a drawstring waist for a custom fit and a stylish design perfect for kids.",
    price: 170,
    discount: 0,
    stockQuantity: 20,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product12, previewUrl: product12, type: "image" }],
    category: "Kids",
    subCategory: "Denim",
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", color: "Blue", price: 170, stock: 7 },
      { size: "L", color: "Blue", price: 170, stock: 8 },
      { size: "XL", color: "Blue", price: 170, stock: 5 },
    ],
    weight: 1.3,
    dimensions: { length: 60, width: 50, height: 5 },
    shippingClass: "Standard",
    metaTitle: "Denim Parka Jacket for Kids - KidsStyle",
    metaDescription:
      "Shop the stylish Denim Parka Jacket for kids by KidsStyle. Custom fit and trendy.",
    urlSlug: "denim-parka-jacket-kids",
    imageAltText: "Denim Parka Jacket kids front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim13",
    name: "Denim Utility Jacket",
    sku: "DUJ-013",
    brand: "DenimCo",
    tags: "denim,utility,jacket,functional",
    shortDescription: "Functional denim utility jacket with multiple pockets.",
    longDescription:
      "This denim utility jacket offers multiple pockets for storage and a rugged design for everyday use.",
    price: 135,
    discount: 0,
    stockQuantity: 30,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product13, previewUrl: product13, type: "image" }],
    category: "Women",
    subCategory: "Leather",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Blue", price: 135, stock: 10 },
      { size: "M", color: "Blue", price: 135, stock: 12 },
      { size: "L", color: "Blue", price: 135, stock: 8 },
    ],
    weight: 1.2,
    dimensions: { length: 59, width: 49, height: 5 },
    shippingClass: "Standard",
    metaTitle: "Denim Utility Jacket - DenimCo",
    metaDescription:
      "Shop the functional Denim Utility Jacket by DenimCo. Multiple pockets and rugged design.",
    urlSlug: "denim-utility-jacket",
    imageAltText: "Denim Utility Jacket front view",
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "denim14",
    name: "Denim Military Jacket",
    sku: "DMJ-014",
    brand: "UrbanWear",
    tags: "denim,military,jacket,rugged",
    shortDescription: "Rugged denim military jacket with structured design.",
    longDescription:
      "This denim military jacket features a structured design and durable fabric for a rugged look.",
    price: 145,
    discount: 0,
    stockQuantity: 25,
    stockStatus: "In Stock",
    featured: false,
    active: true,
    mediaFiles: [{ file: product14, previewUrl: product14, type: "image" }],
    category: "Men",
    subCategory: "Leather",
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", color: "Green", price: 145, stock: 8 },
      { size: "L", color: "Green", price: 145, stock: 10 },
      { size: "XL", color: "Green", price: 145, stock: 7 },
    ],
    weight: 1.4,
    dimensions: { length: 62, width: 52, height: 6 },
    shippingClass: "Express",
    metaTitle: "Denim Military Jacket - UrbanWear",
    metaDescription:
      "Shop the rugged Denim Military Jacket by UrbanWear. Structured and durable.",
    urlSlug: "denim-military-jacket",
    imageAltText: "Denim Military Jacket front view",
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: "denim15",
    name: "Denim Trench Jacket",
    sku: "DTJ-015",
    brand: "KidsStyle",
    tags: "denim,trench,jacket,elegant",
    shortDescription: "Long denim trench jacket adding elegance.",
    longDescription:
      "This long denim trench jacket adds elegance to any outfit with its sleek design and quality fabric.",
    price: 180,
    discount: 0,
    stockQuantity: 20,
    stockStatus: "In Stock",
    featured: true,
    active: true,
    mediaFiles: [{ file: product15, previewUrl: product15, type: "image" }],
    category: "Kids",
    subCategory: "Leather",
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", color: "Blue", price: 180, stock: 7 },
      { size: "M", color: "Blue", price: 180, stock: 8 },
      { size: "L", color: "Blue", price: 180, stock: 5 },
    ],
    weight: 1.5,
    dimensions: { length: 70, width: 60, height: 7 },
    shippingClass: "Express",
    metaTitle: "Denim Trench Jacket - KidsStyle",
    metaDescription:
      "Shop the elegant Denim Trench Jacket by KidsStyle. Sleek and stylish.",
    urlSlug: "denim-trench-jacket",
    imageAltText: "Denim Trench Jacket front view",
    date: 1716634345448,
    bestseller: true,
  },
];
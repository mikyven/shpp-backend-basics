function Product(
  ID = "0",
  name = "",
  description = "",
  price = 0.0,
  brand = "",
  sizes = ["XS", "S", "M", "L", "XL", "XXL"],
  activeSize = "",
  quantity = 0,
  date = Date.now(),
  reviews = [
    {
      ID: "0",
      author: "",
      date: Date.now(),
      comment: "",
      rating: { service: 0, price: 0, rating: 0, quality: 0 },
    },
  ],
  images = [""]
) {
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.sizes = sizes;
  this.activeSize = activeSize;
  this.quantity = quantity;
  this.date = date;
  this.reviews = reviews;
  this.images = images;

  this.getID = () => this.ID;
  this.getName = () => this.name;
  this.getDescription = () => this.description;
  this.getPrice = () => this.price;
  this.getBrand = () => this.brand;
  this.getSizes = () => this.sizes;
  this.getActiveSize = () => this.activeSize;
  this.getQuantity = () => this.quantity;
  this.getDate = () => this.date;
  this.getReviews = () => this.reviews;
  this.getImages = () => this.images;

  this.getReviewByID = (id) => this.reviews.find((i) => i.ID === id);
  this.getImage = (value) =>
    value ? this.images.find((i) => i === value) : this.images[0];
  this.addSize = (newSize) => {
    this.sizes.push(newSize);
  };
  this.deleteSize = (removedSize) => {
    this.sizes = this.sizes.filter((i) => i !== removedSize);
  };
  this.addReview = (newReview) => {
    this.reviews.push(newReview);
  };
  this.deleteReview = (removedReviewID) => {
    this.reviews = this.reviews.filter((i) => i.ID !== removedReviewID);
  };
  this.getAverageRating = () => {
    return Math.round(
      this.reviews
        .map((i) => i.rating)
        .reduce(
          (acc, cur) =>
            acc + (cur.service + cur.price + cur.rating + cur.quality) / 4,
          0
        ) / 3
    );
  };
}

const myProducts = [
  new Product("1", "name", "desc", 1.5, "br", ["S", "M", "L"], "M", 2, null, [
    {
      ID: 1,
      author: "Vasia1",
      date: null,
      comment: "123",
      rating: { service: 3, price: 2, rating: 4, quality: 5 },
    },
    {
      ID: 2,
      author: "Vasia2",
      date: null,
      comment: "1234",
      rating: { service: 5, price: 1, rating: 2, quality: 2 },
    },
    {
      ID: 3,
      author: "Vasia3",
      date: null,
      comment: "12345",
      rating: { service: 1, price: 5, rating: 5, quality: 3 },
    },
  ]),
  new Product(
    "2",
    "nazva",
    "desopys",
    5.75,
    "Apple",
    ["XL"],
    "XL",
    15,
    null,
    []
  ),
  new Product("3", "nazvb", "dAbcd", 4, "Xiaomi", ["L"], "L", 312, null, []),
];

function searchProducts(products, search) {
  return products.filter((i) => {
    if (search.slice(-1) === "*") {
      const realSearch = search.slice(0, -1);
      return i.name.includes(realSearch) || i.description.includes(realSearch);
    } else {
      return i.name === search || i.description === search;
    }
  });
}

function sortProducts(products, sortRule) {
  if (!["price", "name", "ID"].includes(sortRule)) {
    return "This rule is not supported";
  }

  return products.sort((a, b) => {
    const aValue = a[sortRule];
    const bValue = b[sortRule];
    if (typeof aValue === "string" && aValue.length !== bValue.length) {
      return aValue.length - bValue.length;
    }
    return aValue - bValue;
  });
}

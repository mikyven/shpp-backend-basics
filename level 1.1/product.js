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
  reviews = [],
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

  this.setID = (value) => (this.ID = value);
  this.setName = (value) => (this.name = value);
  this.setDescription = (value) => (this.description = value);
  this.setPrice = (value) => (this.price = value);
  this.setBrand = (value) => (this.brand = value);
  this.setSizes = (value) => (this.sizes = value);
  this.setActiveSize = (value) => (this.activeSize = value);
  this.setQuantity = (value) => (this.quantity = value);
  this.setDate = (value) => (this.date = value);
  this.setReviews = (value) => (this.reviews = value);
  this.setImages = (value) => (this.images = value);

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

function Review(
  ID = "0",
  author = "",
  date = Date.now(),
  comment = "",
  rating = { service: 0, price: 0, rating: 0, quality: 0 }
) {
  this.ID = ID;
  this.author = author;
  this.date = date;
  this.comment = comment;
  this.rating = rating;
}

const searchProducts = (products, search) => {
  return products.filter((i) => {
    if (search.slice(-1) === "*") {
      const realSearch = search.slice(0, -1);
      return i.name.includes(realSearch) || i.description.includes(realSearch);
    } else {
      return i.name === search || i.description === search;
    }
  });
};

const sortProducts = (products, sortRule) => {
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
};

const myProducts = [
  new Product("1", "name", "desc", 1.5, "br", ["S", "M", "L"], "M", 2, null),
  new Product("2", "nazva", "desopys", 5.75, "Apple", ["XL"], "XL", 15, null),
  new Product("3", "nazvb", "dAbcd", 4, "Xiaomi", ["L"], "L", 312, null),
];

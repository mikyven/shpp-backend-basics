"use strict";

function AbstractProduct(
  id,
  name,
  description,
  price,
  quantity,
  reviews,
  images,
  date,
  brand
) {
  if (this.constructor == AbstractProduct) {
    throw new Error("Class is of abstract type and can't be instantiated");
  }

  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.quantity = quantity;
  this.reviews = reviews;
  this.images = images;
  this.date = date;
  this.brand = brand;

  this.getId = () => this.id;
  this.getName = () => this.name;
  this.getDescription = () => this.description;
  this.getPrice = () => this.price;
  this.getQuantity = () => this.quantity;
  this.getReviews = () => this.reviews;
  this.getImages = () => this.images;
  this.getDate = () => this.date;
  this.getBrand = () => this.brand;

  this.setId = (value) => (this.id = value);
  this.setName = (value) => (this.name = value);
  this.setDescription = (value) => (this.description = value);
  this.setPrice = (value) => (this.price = value);
  this.setQuantity = (value) => (this.quantity = value);
  this.setReviews = (value) => (this.reviews = value);
  this.setImages = (value) => (this.images = value);
  this.setDate = (value) => (this.date = value);
  this.setBrand = (value) => (this.brand = value);
}

Object.assign(AbstractProduct.prototype, {
  getFullInformation() {
    let str = "";
    for (const [key, value] of Object.entries(this)) {
      if (typeof value !== "function" || Array.isArray(value)) {
        str += `${key}: ${value},\n`;
      }
    }
    return str;
  },
  getPriceForQuantity(quantity) {
    return `$${(this.price * quantity).toFixed(2)}`;
  },
  getValue(key) {
    return this[key];
  },
  setValue(key, value) {
    this[key] = value;
    return this;
  },
});

function Clothes(material, color, ...productValues) {
  AbstractProduct.call(this, ...productValues);

  this.material = material;
  this.color = color;

  this.getMaterial = () => this.material;
  this.getColor = () => this.color;

  this.setMaterial = (value) => (this.material = value);
  this.setColor = (value) => (this.color = value);
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

function Electronics(warranty, power, ...productValues) {
  AbstractProduct.call(this, ...productValues);

  this.warranty = warranty;
  this.power = power;

  this.getWarranty = () => this.warranty;
  this.getPower = () => this.power;

  this.setWarranty = (value) => (this.warranty = value);
  this.setPower = (value) => (this.power = value);
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

const mongooseProduct = require("mongoose");

const ProductSchema = new mongooseProduct.Schema({
  name: String,
  price: String,
  desc: String,
  quantity: String,
  image: String,
});

const ProductModel = mongooseProduct.model(
  "product",
  ProductSchema,
  "products"
);

module.exports = ProductModel;

interface TourModel {}

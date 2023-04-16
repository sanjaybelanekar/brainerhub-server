const ProductModelController = require("../models/product.model");
const productMessages = require("../helpers/messages");

class ProductCTRL {
  static createProduct(req: any, res: any) {
    const product = req.body;

    if (req?.file) product.image = `products-images/${req?.file?.filename}`;

    new ProductModelController(product)
      .save()
      .then((result: any) => {
        res.status(201).send({
          message: productMessages?.productMessages?.created,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res.status(500).send({
          message: productMessages?.productMessages?.notCreated,
          error: err,
        });
      });
  } //createProduct

  static updateProduct(req: any, res: any) {
    const { id } = req?.params;
    const product = req.body;
    const filter: any = {};

    if (Number(id).toString() == "NaN") {
      filter._id = id;
    } else {
      filter.userId = Number(id);
    }

    if (req.file) product.image = `products-images/${req?.file?.filename}`;

    ProductModelController.updateOne(filter, product, { new: true })
      .then((result: any) => {
        res.status(200).send({
          message: productMessages?.productMessages?.updated,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res.status(500).send({
          message: productMessages?.productMessages?.notUpdated,
          error: err,
        });
      });
  } //updateProduct

  static deleteProduct(req: any, res: any) {
    const { id } = req?.params;

    const filter: any = {};

    if (Number(id).toString() == "NaN") {
      filter._id = id;
    } else {
      filter.userId = Number(id);
    }

    ProductModelController.deleteOne(filter)
      .then((result: any) => {
        res.status(200).send({
          message: productMessages?.productMessages?.deleted,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res.status(500).send({
          message: productMessages?.productMessages?.notDeleted,
          error: err,
        });
      });
  } //deleteProduct

  static getOneProduct(req: any, res: any) {
    const { id } = req?.params;

    const filter: any = {};

    if (Number(id).toString() == "NaN") {
      filter._id = id;
    } else {
      filter.userId = Number(id);
    }

    ProductModelController.findOne(filter)
      .then((result: any) => {
        if (result?._id == undefined) {
          res.status(404).send({
            message: productMessages?.productMessages?.productNotAvailable,
            data: null,
          });
          return;
        }

        res.status(200).send({
          message: productMessages?.productMessages?.getOne,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res.status(404).send({
          message: productMessages?.productMessages?.notGetOne,
          error: err,
        });
      });
  } //getOneProduct

  static getAllProducts(req: any, res: any) {
    let { query, skip, limit, length } = req.query;

    const filter: any = {};

    ProductModelController.find(filter)
      .skip(skip ? Number(skip) : 0)
      .limit(limit ? Number(limit) : Infinity)
      .then((result: any) => {
        if (result.length == 0) {
          res.status(404).send({
            message: productMessages?.productMessages?.productsNotAvailable,
            data: null,
          });
          return;
        }

        res.status(200).send({
          message: productMessages?.productMessages?.getAll,
          data: length ? result?.length : result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res.status(404).send({
          message: productMessages?.productMessages?.notGetAll,
          error: err,
        });
      });
  } //getAllProducts
}

module.exports = ProductCTRL;

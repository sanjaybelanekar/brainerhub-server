const ProductRouter = require("express").Router();
const multer = require("multer");
var { extname } = require("path");

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "v1/uploads/products-images");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
} = require("../controllers/product.controller");

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getOneProduct);
ProductRouter.delete("/:id", deleteProduct);
ProductRouter.put("/:id", upload.single("image"), updateProduct);
ProductRouter.post("/", upload.single("image"), createProduct);

module.exports = ProductRouter;

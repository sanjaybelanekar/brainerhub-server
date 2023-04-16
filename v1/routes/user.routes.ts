const UserRouter = require("express").Router();
const UserMulter = require("multer");
var { extname } = require("path");

const userStorage = UserMulter.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "v1/uploads/user-profiles");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const UserUpload = UserMulter({ storage: userStorage });

const {
  createUser,
  deleteUser,
  updateUser,
  getOneUser,
  getAllUsers,
} = require("../controllers/user.controller");

UserRouter.get("/", getAllUsers);
UserRouter.get("/:id", getOneUser);
UserRouter.delete("/:id", deleteUser);
UserRouter.put("/:id", UserUpload.single("avatar"), updateUser);
UserRouter.post("/", UserUpload.single("avatar"), createUser);

module.exports = UserRouter;

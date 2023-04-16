const UserModelController = require("../models/user.model");
const messages = require("../helpers/messages");
const { encrypt: encryptPass } = require("../helpers/encryption");

class UserCtrl {
  static createUser(req: any, res: any) {
    const user = req.body;

    if (req?.file) user.avatar = `user-profiles/${req?.file?.filename}`;
    if (user?.password) user.password = encryptPass(user?.password);

    new UserModelController(user)
      .save()
      .then((result: any) => {
        res.status(201).send({
          message: messages?.userMessages?.created,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res
          .status(500)
          .send({ message: messages?.userMessages?.notCreated, error: err });
      });
  } //createUser

  static updateUser(req: any, res: any) {
    const { id } = req?.params;
    const user = req.body;
    const filter: any = {};

    if (Number(id).toString() == "NaN") {
      filter._id = id;
    } else {
      filter.userId = Number(id);
    }

    if (req.file) user.avatar = `user-profiles/${req?.file?.filename}`;
    if (user?.password) user.password = encryptPass(user?.password);

    UserModelController.updateOne(filter, user, { new: true })
      .then((result: any) => {
        res.status(200).send({
          message: messages?.userMessages?.updated,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res
          .status(500)
          .send({ message: messages?.userMessages?.notUpdated, error: err });
      });
  } //updateUser

  static deleteUser(req: any, res: any) {
    const { id } = req?.params;

    const filter: any = {};

    if (Number(id).toString() == "NaN") {
      filter._id = id;
    } else {
      filter.userId = Number(id);
    }

    UserModelController.deleteOne(filter)
      .then((result: any) => {
        res.status(200).send({
          message: messages?.userMessages?.deleted,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res
          .status(500)
          .send({ message: messages?.userMessages?.notDeleted, error: err });
      });
  } //deleteUser

  static getOneUser(req: any, res: any) {
    const { id } = req?.params;

    const filter: any = {};

    if (Number(id).toString() == "NaN") {
      filter._id = id;
    } else {
      filter.userId = Number(id);
    }

    UserModelController.findOne(filter)
      .then((result: any) => {
        if (result?._id == undefined) {
          res.status(404).send({
            message: messages?.userMessages?.userNotAvailable,
            data: null,
          });
          return;
        }

        res.status(200).send({
          message: messages?.userMessages?.getOne,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res
          .status(404)
          .send({ message: messages?.userMessages?.notGetOne, error: err });
      });
  } //getOneUser

  static getAllUsers(req: any, res: any) {
    const { email } = req.query;

    const filter: any = {};

    if (email) filter.email = email;

    UserModelController.find(filter)
      .then((result: any) => {
        if (result.length == 0) {
          res.status(404).send({
            message: messages?.userMessages?.usersNotAvailable,
            data: null,
          });
          return;
        }

        res.status(200).send({
          message: messages?.userMessages?.getAll,
          data: result,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res
          .status(404)
          .send({ message: messages?.userMessages?.notGetAll, error: err });
      });
  } //getAllUsers
}

module.exports = UserCtrl;

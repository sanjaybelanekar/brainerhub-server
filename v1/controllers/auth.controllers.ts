const UserModelAuth = require("../models/user.model");
const {
  encrypt: encryptPassword,
  compare: comparePassword,
} = require("../helpers/encryption");
const {
  generateToken: getToken,
  verifyToken: testToken,
} = require("../helpers/token");
const { userFilter: filteredUser } = require("../helpers/user-utilities");
const _ = require("lodash");

class AuthCtrl {
  static userLogin(req: any, res: any) {
    const { email, password } = req.body;

    UserModelAuth.findOne({ email: email })
      .then((response: any) => {
        if (!response?._id) {
          res.status(404).send({ error: null, message: "No user Found..." });
        } else if (comparePassword(password, response?.password)) {
          //generate and send token

          const payload = {
            id: response?._id,
            email: response?.email,
          };

          const accessToken = getToken(payload, 60 * 60);
          const refreshToken = getToken(payload, 90 * 60);
          res.set("x-accessToken", accessToken);
          res.set("x-refreshToken", refreshToken);
          res.status(200).send({
            data: filteredUser(response),
            message: "Login Successful...",
          });
        } else {
          res
            .status(500)
            .send({ error: null, message: "Incorrect Password.." });
        }
      })
      .catch((err: any) => {
        console.error(err);
        res.status(404).send({ error: err, message: "Login Failed..." });
      });
  }

  static async validateAccessToken(req: any, res: any) {
    const token = req?.headers?.authorization
      ? req?.headers?.authorization
      : req?.body?.token;

    const payload = token && testToken(token);

    if (payload?.id) {
      try {
        res.status(200).send({
          message: "Token is valid",
          data: {
            id: payload?.id,
          },
        });
      } catch (e) {
        res.status(500).send({ message: "Server error..", error: null });
      }
    } else {
      if (payload == undefined) {
        res.status(408).send({ message: "Token Expired..", error: null });
      } else {
        res.status(403).send({ message: "Token is not valid..", error: null });
      }
    }
  }

  static refreshToken(req: any, res: any) {
    const { rToken } = req.body;

    const payload = rToken && testToken(rToken);

    if (payload?.id) {
      const newPayload = _.pick(payload, ["id", "email"]);

      //generate and send token
      const accessToken = getToken(newPayload, 15 * 60);
      const refreshToken = getToken(newPayload, 30 * 60);
      res.set("x-accessToken", accessToken);
      res.set("x-refreshToken", refreshToken);
      res.status(200).send({
        message: "Tokens generated",
        data: { accessToken, refreshToken },
      });
    } else {
      res.status(403).send({ message: "Invalid Token", error: null });
    }
  }
}

module.exports = AuthCtrl;

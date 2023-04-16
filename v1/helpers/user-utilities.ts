const lodash = require("lodash");

function userFilter(result: any) {
  return lodash.pick(result, ["_id", "userId", "name", "email"]);
}

function userFilterArray(arr: any) {
  return lodash.map(arr, (user: any) => userFilter(user));
}

function adminFilter(result: any) {
  return lodash.pick(result, [
    "userId",
    "name",
    "role",
    "avatar",
    "designation",
  ]);
}

function adminFilterArray(arr: any) {
  return lodash.map(arr, (user: any) => adminFilter(user));
}

module.exports = { userFilter, userFilterArray, adminFilter, adminFilterArray };

const mongoosedb = require("mongoose");
mongoosedb.set("strictQuery", true);

const url = `${process.env.URL}`;

mongoosedb.connect(url);

const conn = mongoosedb.connection;

conn.on("connected", () => {
  console.log("db connected..");
});

conn.on("disconnected", () => {
  console.log("db disconnected...");
});

conn.on("error", () => {
  console.log("db connection error..");
});

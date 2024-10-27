const express = require("express"); /* Accessing express module */
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

let portNumber = 5000;
require("dotenv").config({
  path: path.resolve(__dirname, "credentialsDontPost/.env"),
});
const app = express(); /* app is a request handler function */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var cors = require("cors");
app.use(cors());

const uri = process.env.MONGO_CONNECTION_STRING;

/* Our database and collection */
const databaseAndCollection = { db: "test", collection: "technica" };
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

app.listen(portNumber, function (err) {
  if (err) console.log(err);
  console.log(`Server is running at http://localhost:${portNumber}`);
});

app.get("/", (request, response) => {
  response.send("OK!");
});

app.get("/visualizations", (request, response) => {
  fetch("http://localhost:5001/api/visualizations", {
    method: "GET",
    headers: {
      Authorization: "Key TvrVFN2yW9NQ4t6IFLodeb5O3UR5bY0nAEL3wDVD",
    },
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      response.send(" text" + text);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/user-info", (request, response) => {
  console.log("Hello");
  response.send("candace");
});

app.post("/welcome", async (request, response) => {
  let data = {
    username: "candace",
  };
  try {
    await client.connect();
    const userExists = await client
      .db(databaseAndCollection.db)
      .collection(databaseAndCollection.collection)
      .findOne(data);

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ a: 1 }));
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

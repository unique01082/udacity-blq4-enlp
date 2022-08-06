var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

const API_KEY = "58e8a2dbab1cd7bdd0e7c0d5ed31efa7";

app.use(express.static(path.resolve("dist")));
app.use(cors());
app.use(bodyParser.json());

async function fetchData(url) {
  try {
    const response = await axios.get(
      "https://api.meaningcloud.com/sentiment-2.1",
      {
        params: {
          key: API_KEY,
          of: "json",
          txt: true,
          model: "general",
          lang: "en",
          url,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//POST request
app.post("/test", async (req, res) => {
  const data = await fetchData(req.body.url);
  res.send(data);
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

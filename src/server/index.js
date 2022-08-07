var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const FormData = require("form-data");

const app = express();

const API_KEY = "58e8a2dbab1cd7bdd0e7c0d5ed31efa7";

app.use(express.static(path.resolve("dist")));
app.use(cors());
app.use(bodyParser.json());

async function fetchData(url) {
  try {
    const formData = new FormData();
    formData.append("key", API_KEY);
    formData.append("url", url);
    formData.append("lang", "en");
    formData.append("txtf", "plain");
    formData.append("verbose", "n");
    formData.append("model", "general");
    formData.append("uw", "n");
    formData.append("rt", "n");
    formData.append("egp", "n");
    formData.append("dm", "s");
    formData.append("sdg", "l");
    const response = await axios.post(
      "https://api.meaningcloud.com/sentiment-2.1",
      formData,
      {
        headers: formData.getHeaders(),
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

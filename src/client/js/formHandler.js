import axios from "axios";
import { checkForUrl } from "./urlChecker";

const results = document.getElementById("results");

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  const isValidUrl = checkForUrl(formText);

  if (isValidUrl) {
    results.innerHTML = "Analyzing...";
    axios
      .post("http://localhost:8080/test", { url: formText })
      .then((res) => {
        results.innerHTML = JSON.stringify(res.data, null, 2);
      })
      .catch(() => {
        results.innerHTML = "Something went wrong...";
      });
  } else {
    alert("Invalid URL");
  }
}

export { handleSubmit };

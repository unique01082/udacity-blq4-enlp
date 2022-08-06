import axios from "axios";
import { checkForUrl } from "./urlChecker";

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  const isValidUrl = checkForUrl(formText);

  console.log("isValidUrl :>> ", isValidUrl);

  if (isValidUrl) {
    console.log("::: Form Submitted :::");
    axios.post("http://localhost:8080/test", { url: formText }).then((res) => {
      document.getElementById("results").innerHTML = JSON.stringify(
        res,
        null,
        2
      );
    });
  } else {
    alert("Invalid URL");
  }
}

export { handleSubmit };

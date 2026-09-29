// https://ai.google.dev/gemini-api/docs
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";

document.addEventListener("DOMContentLoaded", () => {
  const textButton = document.querySelector("#text-button");
  const imgButton = document.querySelector("#img-button");

  // on click
  textButton.addEventListener("click", async () => {
    textButton.style.display = "none";
    imgButton.style.display = "none";

    const mRes = await fetch("../data/misc.json");
    const mData = await mRes.json();

    // TODO: build prompt using row location
  });

  imgButton.addEventListener("click", async () => {
    textButton.style.display = "none";
    imgButton.style.display = "none";

    const aRes = await fetch("../data/astrolabe.json");
    const aData = await aRes.json();

    // TODO: build prompt using row image url
  });
});

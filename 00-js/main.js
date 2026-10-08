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
    const row = mData[0];
    const locList = JSON.stringify(row.location);

    const textPrompt = "given this list of locations, " +
      "extract the one that is a country " +
      "and return it as text: " +
      locList;
    const mPrompt = await buildPrompt(textPrompt);

    const llmRes = await fetch(GEMINI_URL, mPrompt);
    const resData = await llmRes.json();

    const resOutput = resData.steps.filter(x => x.type == "model_output")[0];
    console.log(resOutput.content[0].text);
  });

  imgButton.addEventListener("click", async () => {
    textButton.style.display = "none";
    imgButton.style.display = "none";

    const aRes = await fetch("../data/astrolabe.json");
    const aData = await aRes.json();

    // TODO: build prompt using row image url
  });
});

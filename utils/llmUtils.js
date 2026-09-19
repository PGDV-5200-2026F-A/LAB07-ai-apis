async function imageUrlToBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const readerResult = reader.result;
      const data = readerResult.split(',')[1];
      const mime_type = readerResult.split(':')[1].split(";")[0];
      resolve({ data, mime_type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function buildPrompt(text, imageUrls) {
  const input = [{ type: "text", text }];

  if (imageUrls && (typeof imageUrls === "string")) {
    imageUrls = [imageUrls];
  }

  if (imageUrls && Array.isArray(imageUrls)) {
    for (const url of imageUrls) {
      const { data, mime_type } = await imageUrlToBase64(url);
      input.push({ type: "image", mime_type, data });
    }
  }

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": LLM_KEY,
    },
    body: JSON.stringify({
      model: "gemini-3.1-flash-lite",
      input
    }),
  };
}

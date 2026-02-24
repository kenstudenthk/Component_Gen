const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export const callGemini = async (
  prompt,
  responseMimeType = "text/plain",
  schema = null,
) => {
  const model = "gemini-2.5-flash-preview-09-2025";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: responseMimeType,
    },
  };

  if (schema) {
    payload.generationConfig.responseSchema = schema;
  }

  const fetchWithRetry = async (retries = 5, delay = 1000) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const err = new Error(`HTTP error! status: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      return await response.json();
    } catch (err) {
      const isTransient =
        !err.status || err.status >= 500 || err.status === 429;
      if (retries > 0 && isTransient) {
        await new Promise((res) => setTimeout(res, delay));
        return fetchWithRetry(retries - 1, delay * 2);
      }
      throw err;
    }
  };

  const result = await fetchWithRetry();
  return result.candidates?.[0]?.content?.parts?.[0]?.text;
};

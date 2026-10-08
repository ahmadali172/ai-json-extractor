const REQUIRED_KEYS = ["name", "city", "item", "quantity", "deadline", "phone"];

async function extractOrder(text) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2",
      messages: [
        {
          role: "system",
          content:
            "You extract data from text. Reply with JSON only, using exactly these keys: name, city, item, quantity, deadline, phone.",
        },
        { role: "user", content: text },
      ],
      format: "json",
      stream: false,
      options: { temperature: 0 },
    }),
  });

  const data = await res.json();
  const answer = data.message.content;

  let order;
  try {
    order = JSON.parse(answer);
  } catch (err) {
    return { ok: false, error: "AI did not return valid JSON", answer: answer };
  }

  const missing = [];
  for (const key of REQUIRED_KEYS) {
    if (!(key in order)) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    return { ok: false, error: "Missing keys: " + missing.join(", "), answer: answer };
  }

  return { ok: true, order: order };
}

const result = await extractOrder(
  "Ali wants 3 red shirts delivered by Friday, phone 0300-1234567"
);
console.log(result);
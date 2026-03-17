// Your "Context" tab should look like this

// Inner‑Self core (by LewdLeah)
InnerSelf("context");

// QETEco economic add‑on (safe — no input triggers)
QETEco("context");

// Minimal pass‑through modifier (LewdLeah baseline)
const modifier = (text) => {
  // In AID sandbox, `stop` is a global; keep as-is
  return { text, stop };
};
modifier(text);

export const addClipboard = (value: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
    document.body.removeChild(textArea);
  }
};

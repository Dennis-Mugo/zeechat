import React, { useEffect, useState } from "react";

function TypeWriter({ text, style, scrollToBottom }) {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      if (count - 5 <= text.length) {
        setRendered(text.slice(0, count) + "●");
        if (scrollToBottom) {
          scrollToBottom();
        }
      }
    }, 80); //previously 40ms

    return () => clearInterval(interval);
  }, [text]);
  return <h2 style={{ ...style }}>{rendered}</h2>;
}

export default TypeWriter;

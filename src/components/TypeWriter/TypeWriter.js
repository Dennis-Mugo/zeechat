import React, { useEffect, useState } from "react";

function TypeWriter({ text, style }) {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count <= text.length) {
        setRendered(text.slice(0, count) + "●");
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);
  return <h2 style={{ ...style }}>{rendered}</h2>;
}

export default TypeWriter;

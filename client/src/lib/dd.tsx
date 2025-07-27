import React from "react";

export function dd(data: any) {
  // Log to console for debugging
  console.log("DD Dump:", data);

  // Render the dumped data and stop further rendering
  return (
    <pre
      style={{
        background: "#222",
        color: "#fff",
        padding: "1rem",
        fontSize: "1rem",
        borderRadius: "8px",
        overflow: "auto",
        zIndex: 9999,
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

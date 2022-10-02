import React, { useEffect, useState } from "react";

function App() {
  function length(a: number | string): number {
    return a.toString().length;
  }

  console.log(length("Asdf"));

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
      }}
    >
      <div>asd</div>
    </div>
  );
}

export default App;

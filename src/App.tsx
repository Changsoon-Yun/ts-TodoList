import React, { useEffect, useState } from "react";

function App() {
  type PositionX = { x: number };
  type PositionY = { y: number };

  type PositionXY = PositionX & PositionY;

  let position: PositionXY = { x: 10, y: 10 };

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

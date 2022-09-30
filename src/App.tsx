import React, { useEffect, useState } from "react";

function App() {
  type Member = {
    [key: string]: string;
  };
  let john: Member = { name: "kim", age: "23" };

  console.log(john);

  function a(x: number): number {
    return x * 2;
  }
  console.log(a(2));
  return (
    <>
      <div>typescript 기초</div>
    </>
  );
}

export default App;

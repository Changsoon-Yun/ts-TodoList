import React from "react";
import "./App.css";

function App() {
	type ObjectType = {name?: string; phone: number; email: string; adult: boolean};

	let test: ObjectType = {name: "kim", phone: 123, email: "abc@naver.com", adult: false};

	return <div className="App"></div>;
}

export default App;

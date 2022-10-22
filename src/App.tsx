import React, { useEffect, useState } from "react";
import Layout from "./components/common/Layout";
import Router from "./shared/Router";
import Header from "./components/common/Header";

function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;

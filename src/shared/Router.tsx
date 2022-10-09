import React from "react";
import Main from "./../pages/Main";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default Router;

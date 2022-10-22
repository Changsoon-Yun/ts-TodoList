import React from "react";

type HeaderType = {
  headText: string;
  leftChild: JSX.Element;
  rightChild: JSX.Element;
};

const Header = ({ headText, leftChild, rightChild }: HeaderType) => {
  return (
    <div className="flex justify-between p-2 bg-white rounded-md ">
      <div>{leftChild}</div>
      <h2>{headText}</h2>
      <div>{rightChild}</div>
    </div>
  );
};

export default Header;

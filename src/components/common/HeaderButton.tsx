import React from "react";

type HeaderButtonType = {
  text: string;
  onClick: () => void;
};

const HeaderButton = ({ text, onClick }: HeaderButtonType) => {
  return <button onClick={onClick}>{text}</button>;
};

export default HeaderButton;

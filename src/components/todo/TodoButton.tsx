import React from "react";

type TodoButtonType = {
  text: string;
  onClick: () => void;
};

const TodoButton = ({ text, onClick }: TodoButtonType) => {
  return (
    <button onClick={onClick} className="border border-black p-2">
      {text}
    </button>
  );
};

export default TodoButton;

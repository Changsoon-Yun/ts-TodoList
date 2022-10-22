import { Input } from "postcss";
import React, { useRef, useState } from "react";

const TodoList = ({
  data,
  deleteTodoList,
  updateTodoList,
}: {
  data: { title: string; id: number };
  deleteTodoList: (id: number) => void;
  updateTodoList: (data: { title: string; id: number }) => void;
}) => {
  const textArea_ref = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [edit, setEdit] = useState<boolean>(false);
  const [text, Text] = useState(data.title);
  return (
    <div className="flex rounded-md bg-white m-2 p-2 items-center">
      {edit ? (
        <textarea
          className="flex-1"
          value={text}
          onChange={(e) => {
            Text(e.target.value);
          }}
          ref={textArea_ref}
        ></textarea>
      ) : (
        <div className="flex-1">{data.title}</div>
      )}
      <button
        onClick={() => {
          deleteTodoList(data.id);
        }}
        className="border border-black p-2"
      >
        삭제하기
      </button>
      {edit ? (
        <button
          onClick={() => {
            updateTodoList({ title: textArea_ref.current.value, id: data.id });
            setEdit(false);
          }}
          className="border border-black p-2"
        >
          수정완료
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="border border-black p-2"
        >
          수정하기
        </button>
      )}
    </div>
  );
};

export default TodoList;

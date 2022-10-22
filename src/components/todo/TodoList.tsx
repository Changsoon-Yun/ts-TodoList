import { Input } from "postcss";
import React, { useRef, useState } from "react";
import Header from "./../common/Header";
import TodoButton from "./TodoButton";

const TodoList = ({
  data,
  deleteTodoList,
  updateTodoList,
  doneUpdateTodoList,
}: {
  data: { title: string; id: number; date: string; done: boolean };
  deleteTodoList: (id: number) => void;
  updateTodoList: (data: {
    title: string;
    id: number;
    date: string;
    done: boolean;
  }) => void;
  doneUpdateTodoList: (data: {
    title: string;
    id: number;
    date: string;
    done: boolean;
  }) => void;
}) => {
  const textArea_ref = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [edit, setEdit] = useState<boolean>(false);
  const [text, Text] = useState(data.title);
  return (
    <>
      {!data.done && (
        <div className="flex rounded-md bg-white m-2 p-2 items-center">
          {edit ? (
            <textarea
              className="flex-1"
              value={text}
              onChange={(e) => {
                Text(e.target.value);
              }}
              ref={textArea_ref}
            />
          ) : (
            <div className="flex-1">{data.title}</div>
          )}
          {!edit && (
            <TodoButton
              text={"완료하기"}
              onClick={() => {
                doneUpdateTodoList({
                  title: data.title,
                  id: data.id,
                  date: data.date,
                  done: true,
                });
              }}
            />
          )}
          <TodoButton
            text={"삭제하기"}
            onClick={() => {
              deleteTodoList(data.id);
            }}
          />
          <TodoButton
            text={edit ? "수정완료" : "수정하기"}
            onClick={
              edit
                ? () => {
                    updateTodoList({
                      title: textArea_ref.current.value,
                      id: data.id,
                      date: data.date,
                      done: data.done,
                    });
                    setEdit(false);
                  }
                : () => {
                    setEdit(true);
                  }
            }
          />
        </div>
      )}
    </>
  );
};

export default TodoList;

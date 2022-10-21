import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { todosApi } from "./../hooks/todosApi";
import instance from "./../hooks/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const Main = () => {
  const todoInput = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: todoLists } = useQuery(
    "get/todos",
    () => instance.get("/todos"),
    {
      onSuccess: (todoLists) => {
        console.log("onSuccess", todoLists);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    }
  );

  const addTodoQuery = useMutation(
    "addTodos",
    (data: { title: string | undefined }) => instance.post("/todos", data),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  const deleteTodoQuery = useMutation(
    "deleteTodos",
    (data: any) => instance.delete(`/todos/${data}`),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  const addTodoList = (): void => {
    if (
      todoInput.current?.value !== undefined &&
      todoInput.current?.value?.length < 1
    ) {
      console.log("hello");
    }
    addTodoQuery.mutate({ title: todoInput?.current?.value });
  };

  const deleteTodoList = (id: number): void => {
    deleteTodoQuery.mutate(id);
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1">
        <h2>오늘 할일</h2>
        <p>10월 9일 일요일</p>
        {todoLists?.data.map((data: { title: string; id: number }) => (
          <div key={data.id} className="flex">
            <div className="bg-black text-white mr-5 p-2">{data.title}</div>
            <button
              onClick={() => {
                deleteTodoList(data.id);
              }}
              className="border border-black p-2"
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full absolute bottom-0">
        <input
          className="border border-black border-solid h-10 p-2"
          ref={todoInput}
          type="text"
        />
        <button className="" onClick={addTodoList}>
          추가하기
        </button>
      </div>
    </div>
  );
};

export default Main;

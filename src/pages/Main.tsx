import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { todosApi } from "./../hooks/todosApi";
import instance from "./../hooks/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from "react-query";
import TodoList from "../components/todo/TodoList";

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
    (data: { title: string | undefined; date: string }) =>
      instance.post("/todos", data),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  const deleteTodoQuery = useMutation(
    "deleteTodos",
    (data: number) => instance.delete(`/todos/${data}`),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  const updateTodoQuery = useMutation(
    "updateTodos",
    (data: { title: string; id: number }) =>
      instance.patch(`/todos/${data.id}`, data),
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
      alert("빈칸입니다");
      return;
    }
    addTodoQuery.mutate({
      title: todoInput.current?.value,
      date: "2022-10-23",
    });
  };

  const deleteTodoList = (id: number): void => {
    deleteTodoQuery.mutate(id);
  };

  const updateTodoList = (data: { title: string; id: number }) => {
    updateTodoQuery.mutate(data);
  };

  return (
    <div className="main-todo relative h-full flex flex-col">
      <div className="flex-1">
        <h2>오늘 할일</h2>
        <p>10월 9일 일요일</p>
        {todoLists?.data.map((data: { title: string; id: number }) => (
          <TodoList
            key={data.id}
            data={data}
            deleteTodoList={deleteTodoList}
            updateTodoList={updateTodoList}
          />
        ))}
      </div>
      <div className="flex w-full absolute bottom-0 bg-white">
        <input
          className="flex-1 border border-black border-solid h-10 p-2"
          ref={todoInput}
          type="text"
        />
        <button className="border border-black p-2" onClick={addTodoList}>
          추가하기
        </button>
      </div>
    </div>
  );
};

export default Main;

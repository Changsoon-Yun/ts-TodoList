import axios from "axios";
import { db } from "../firebase";
import React, { useEffect, useRef, useState } from "react";
import instance from "./../hooks/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from "react-query";
import TodoList from "../components/todo/TodoList";
import dayjs from "dayjs";
import Header from "./../components/common/Header";
import HeaderButton from "../components/common/HeaderButton";
import { useNavigate } from "react-router";

const Main = () => {
  const todoInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const { isLoading, data: todoLists } = useQuery(
  //   "get/todos",
  //   () => {
  //     getDocs(collection(db, "todoList")).then((res) => console.log(res));
  //   },
  //   {
  //     staleTime: 20000,
  //     onSuccess: (todoLists) => {
  //       console.log("onSuccess", todoLists);
  //     },
  //     onError: (error) => {
  //       console.log("onError", error);
  //     },
  //   }
  // );

  const { isLoading, data: todoLists } = useQuery(
    "get/todos",
    () => instance.get("/todos"),
    {
      staleTime: 20000,
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
    (data: { title: string; date: string; done: boolean }) =>
      instance.post("/todos", data),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries("get/todos");
        todoInput.current.value = "";
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
    (data: { title: string; id: number; done: boolean }) =>
      instance.patch(`/todos/${data.id}`, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  const doneUpdateTodoQuery = useMutation(
    "doneUpdateTodos",
    (data: { title: string; id: number; done: boolean }) =>
      instance.put(`/todos/${data.id}`, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  const addTodoList = (): void => {
    if (todoInput.current.value.length < 1) {
      alert("???????????????");
      return;
    }
    addTodoQuery.mutate({
      title: todoInput.current?.value,
      date: now.format("YYYY-MM-DD"),
      done: false,
    });
  };

  const deleteTodoList = (id: number): void => {
    deleteTodoQuery.mutate(id);
  };

  const updateTodoList = (data: {
    title: string;
    id: number;
    done: boolean;
  }) => {
    updateTodoQuery.mutate(data);
  };

  const doneUpdateTodoList = (data: {
    title: string;
    id: number;
    done: boolean;
  }) => {
    doneUpdateTodoQuery.mutate(data);
  };

  let now = dayjs();
  return (
    <div className="main-todo relative h-full flex flex-col">
      <Header
        headText={"?????? ??????"}
        leftChild={
          <HeaderButton
            text={"????????????"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={<HeaderButton text={"Calender"} onClick={() => {}} />}
      />
      <div className="flex-1">
        <p className="text-center text-white">
          {now.format("MM")}??? {now.format("DD")}???{" "}
          {now.get("day") === 0
            ? "???"
            : now.get("day") === 1
            ? "???"
            : now.get("day") === 2
            ? "???"
            : now.get("day") === 3
            ? "???"
            : now.get("day") === 4
            ? "???"
            : now.get("day") === 5
            ? "???"
            : "???"}
        </p>
        {todoLists?.data.map(
          (data: {
            title: string;
            id: number;
            date: string;
            done: boolean;
          }) => (
            <TodoList
              key={data.id}
              data={data}
              deleteTodoList={deleteTodoList}
              updateTodoList={updateTodoList}
              doneUpdateTodoList={doneUpdateTodoList}
            />
          )
        )}
      </div>
      <div className="flex w-full absolute bottom-0 bg-white">
        <input
          className="flex-1 border border-black border-solid h-10 p-2"
          ref={todoInput}
          type="text"
        />
        <button className="border border-black p-2" onClick={addTodoList}>
          ????????????
        </button>
      </div>
    </div>
  );
};

export default Main;

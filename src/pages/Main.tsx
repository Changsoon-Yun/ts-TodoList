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
  const todoInput = useRef<any>(null);

  const queryClient = useQueryClient();

  // const query = useQuery("todos", todosApi.getTodoList);

  const { status, refetch, isFetching, data, error } = useQuery(
    "get/todos",
    () => instance.get("/todos"),
    {
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    }
  );

  const mutation = useMutation(
    "addTodos",
    (data: any) => instance.post("/todos", data),
    {
      onSuccess: (data, variables, context) => {
        console.log("onSuccess", data);
        queryClient.invalidateQueries("get/todos");
      },
    }
  );

  useEffect(() => {
    console.log(status);
  }, [status]);

  // console.log(query.data?.data[0]);

  const addTodoList = (value: string): void => {
    mutation.mutate({ title: value });
  };

  console.log();

  return (
    <div>
      <div>
        <h2>오늘 할일</h2>
        <p>10월 9일 일요일</p>
        {data?.data.map((data: { title: string; id: number }) => (
          <div key={data.id}>{data.title}</div>
        ))}
      </div>
      <div className="mt-5 flex flex-col w-1/2">
        <input
          className="border border-black border-solid h-10 p-2"
          ref={todoInput}
          type="text"
        />
        <button onClick={() => addTodoList(todoInput.current.value)}>
          리패치
        </button>
      </div>
    </div>
  );
};

export default Main;

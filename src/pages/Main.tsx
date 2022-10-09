import axios from "axios";
import React, { useEffect } from "react";
import instance from "../axios/axios";
import { todosApi } from "./../axios/todosApi";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const Main = () => {
  // const getTodo = async () => {
  //   const response = await todosApi.getTodoList();
  //   console.log(response);
  // };

  // useEffect(() => {
  //   getTodo();
  // }, []);

  const queryClient = useQueryClient();

  const query = useQuery("todos", todosApi.getTodoList);

  console.log(query.data?.data[0]);

  return (
    <div>
      <div>
        <h2>오늘 할일</h2>
        <p>10월 9일 일요일</p>
        {query.data?.data.map((data: { title: string; id: number }) => (
          <div key={data.id}>{data.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Main;

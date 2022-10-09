import instance from "./axios";

export const todosApi = {
  getTodoList: () => instance.get("/todos"),

  postTodoList: (data: string) => instance.post("/todos", data),
};

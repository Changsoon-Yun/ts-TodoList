import instance from "./axios";

export const todosApi = {
  getTodoList: () => instance.get("/todos"),
};

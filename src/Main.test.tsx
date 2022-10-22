import React from "react";
import { render } from "@testing-library/react";
import Main from "./pages/Main";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

describe("Main", () => {
  test("페이지 잘 뜨나?", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });
});

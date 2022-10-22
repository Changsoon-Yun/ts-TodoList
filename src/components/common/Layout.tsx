import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="main max-w-2xl m-auto h-screen">{children}</div>;
};

export default Layout;

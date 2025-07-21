import React from "react";

const layout = ({ children }) => {
  return <div className="min-h-[calc(100vh-80px)]">{children}</div>;
};

export default layout;

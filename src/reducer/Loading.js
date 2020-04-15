import React, { createContext } from "react";

const LoadingContext = createContext();

const status = {
  status: false,
};

function Loading() {
  return <div></div>;
}

export default Loading;

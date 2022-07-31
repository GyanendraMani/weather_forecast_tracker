import React from "react";
import NewsNav from "./co-components/News-Nav";
import { Outlet } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const News = () => {
  return (
    <>
      <NewsNav />
      <Outlet />
    </>
  )
}

export default News;

reportWebVitals();

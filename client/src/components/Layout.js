import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({tasks,setTasks}) => {
  return (
    <div>
      <Navbar tasks={tasks} setTasks={setTasks}/>
      <div>
      <Outlet />
      </div>
    </div>
  );
};

export default Layout;

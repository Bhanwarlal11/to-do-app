import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import UserAuthForm from "./components/UserAuthForm";
import NotFoundPage from "./components/NotFoundPage";
import TaskTabs from "./components/TaskTabs";
import Stats from "./components/Stats";

const App = () => {
  const [tasks, setTasks] = useState([]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserAuthForm />} />
        <Route path="/" element={<PrivateRoute tasks={tasks} setTasks={setTasks}/>}>
          <Route index element={<TaskTabs tasks={tasks} setTasks={setTasks}/>} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;

const PrivateRoute = ({tasks,setTasks}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Layout  tasks={tasks} setTasks={setTasks}/> : <Navigate to="/login" />;
};

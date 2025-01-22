import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import UserAuthForm from "./components/UserAuthForm";
import NotFoundPage from "./components/NotFoundPage";
import TaskTabs from "./components/TaskTabs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserAuthForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute />
           
          }
        >
          <Route index element={<TaskTabs />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="bottom-center"  />
    </BrowserRouter>
  );
};

export default App;

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
};


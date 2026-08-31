import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/AboutPage";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> }
]);

export default router;
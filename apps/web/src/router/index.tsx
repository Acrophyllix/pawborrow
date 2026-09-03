import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/AboutPage";
import Login from "@/pages/Login";
import PetsPage from "@/pages/PetsPage";
import Tos from "@/pages/Tos";
import Privacy from "@/pages/Privacy";
import Booking from "@/pages/Booking";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/pets", element: <PetsPage /> },
  { path: "/booking", element: <Booking /> },
  { path: "/tos", element: <Tos /> },
  { path: "/privacy", element: <Privacy /> }
]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/LogInPage";
import SignUpPage from "../components/SignUpPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <PrivateRoutes />,
    children: [{ path: "/expenses", element: <App /> }],
  },
]);

export default router;

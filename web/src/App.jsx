import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Customers from "./pages/Customers";
import Add from "./pages/Add";

const routesDefinitions = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/add", element: <Add /> },
      { path: "/customers", element: <Customers /> }
    ],
  },
]);

const App = () => <RouterProvider router={routesDefinitions} />;

export default App;

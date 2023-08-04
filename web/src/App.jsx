import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Customers from "./pages/Customers";

const routesDefinitions = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/customers", element: <Customers /> }
    ],
  },
]);

const App = () => <RouterProvider router={routesDefinitions} />;

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Add from "./pages/Add";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthContextProvider } from "./auth/AuthContext";
import PrivateRoutes from "./auth/PrivateRoutes";


const routesDefinitions = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/add",
        element: <Add />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return (
    <AuthContextProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={routesDefinitions} />
    </LocalizationProvider>
    </AuthContextProvider>
  )
} 

export default App;

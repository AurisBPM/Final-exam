import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Add from './pages/Add';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthContextProvider } from './auth/AuthContext';
import PrivateRoutes from './auth/PrivateRoutes';

import { firstTheme } from './themes/theme';

const routesDefinitions = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/add',
        element: <Add />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

const App = () => {
  return (
    
      <AuthContextProvider>
        <ThemeProvider theme={firstTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={routesDefinitions} />
        </LocalizationProvider>
        </ThemeProvider>
      </AuthContextProvider>
  
  );
};

export default App;

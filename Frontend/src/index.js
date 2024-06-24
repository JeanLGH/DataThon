import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import AdminLayout from './layouts/admin';
import Health from './layouts/admin';
import Security from  './layouts/admin';
import Demography from  './layouts/admin';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/flexboxgrid.min.css";
import './styles/index.css';
import theme from './theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';


import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/demography",
    element: <Demography />,
  },
  {
    path: "/dengue",
    element: <Security />,
  },
  {
    path: "/admin/*",
    element: <AdminLayout />,
   
  },
  {
    path: "/clima",
    element: <Health />,
   
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeEditorProvider>
    </React.StrictMode>,
  </ChakraProvider>,
);
reportWebVitals();
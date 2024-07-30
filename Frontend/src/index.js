import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import AdminLayout from './layouts/datathon';
import Health from './layouts/datathon';
import Security from  './layouts/datathon';
import Demography from  './layouts/datathon';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/flexboxgrid.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    path: "/datathon/*",
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
    </React.StrictMode>
  </ChakraProvider>
);
reportWebVitals();
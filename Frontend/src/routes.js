import { MdSecurity, MdHealthAndSafety, MdWarning, MdHome } from "react-icons/md";

import Health from "./pages/datathon/health";
import Security from "./pages/datathon/security";
import Violence from "./pages/datathon/violence";
import Principal from "./pages/datathon/principal"; // Asegúrate de crear este componente

const routes = [
  {
    name: "Principal",
    category: true,
    items: [
      {
        name: "Página Principal",
        layout: "/datathon",
        path: "/",
        icon: MdHome,
        component: Principal,
      },
    ],
  },
  {
    name: "Indicadores",
    category: true,
    items: [
      {
        name: "Clima",
        layout: "/datathon",
        path: "/clima",
        icon: MdHealthAndSafety,
        component: Health,
      },
      {
        name: "Dengue",
        layout: "/datathon",
        path: "/dengue",
        icon: MdSecurity,
        component: Security,
      },
      /** 
      {
        name: "Violencia",
        layout: "/datathon",
        path: "/violence",
        icon: MdWarning,
        component: Violence,
      },
      */
    ],
  },
];

export default routes;
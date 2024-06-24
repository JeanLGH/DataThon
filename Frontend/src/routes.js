import { MdSecurity, MdHealthAndSafety, MdWarning } from "react-icons/md";

import Health from "./pages/admin/health";
import Security from "./pages/admin/security";
import Violence from "./pages/admin/violence";


const routes = [

  {
    name: "Indicadores",
    category: true,
    items: [
      {
        name: "Clima",
        layout: "/admin",
        path: "/clima",
        icon: MdHealthAndSafety,
        component: Health,
      },
      {
        name: "Dengue",
        layout: "/admin",
        path: "/dengue",
        icon: MdSecurity,
        component: Security,
      },
      /** 
      {
        name: "Violencia",
        layout: "/admin",
        path: "/violence",
        icon: MdWarning,
        component: Violence,
      },
      */
    ],
  },
];

export default routes;

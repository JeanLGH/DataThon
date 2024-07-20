import { MdHome } from "react-icons/md";
import { WiDayCloudy } from 'react-icons/wi';
import { GiAmberMosquito } from 'react-icons/gi';

import Health from "./pages/datathon/clima";
import Security from "./pages/datathon/dengue";
import Violence from "./pages/datathon/violence";
import Principal from "./pages/datathon/principal";

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
        icon: WiDayCloudy,
        component: Health,
      },
      {
        name: "Dengue",
        layout: "/datathon",
        path: "/dengue",
        icon: GiAmberMosquito,
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
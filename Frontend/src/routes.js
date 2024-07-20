//rutas
import { MdHome } from "react-icons/md";
import { WiDayCloudy } from 'react-icons/wi';
import { GiAmberMosquito } from 'react-icons/gi';
import { FaChartLine} from 'react-icons/fa';
import Clima from "./pages/datathon/clima";
import Dengue from "./pages/datathon/dengue";
import Modelo from "./pages/datathon/modelo";
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
        component: Clima,
      },
      {
        name: "Dengue",
        layout: "/datathon",
        path: "/dengue",
        icon: GiAmberMosquito,
        component: Dengue,
      },
      {
        name: "Modelo Predictivo",
        icon: FaChartLine, // reemplaza con el icono que quieras
        external: "https://jedsdenguereport.netlify.app/",
      },
    ],
  },
];

export default routes;
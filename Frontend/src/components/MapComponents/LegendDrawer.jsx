import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';

const LegendDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [legendData, setLegendData] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const removeDuplicates = (arr, prop) =>
    arr.filter(
      (obj, index) =>
        arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
    );

  

  return (
    <div className="legend-drawer">
      <Button type="primary" onClick={showDrawer}>
        Ver
      </Button>
      <Drawer
        title="Leyenda"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={300}
      >
        {legendData.map((item, index) => (
          <div key={index}>
            <h4>{item.MunicipioAS}</h4>
            <p>Población: {item.Poblacion_DANE}</p>
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default LegendDrawer;

import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image} from "@chakra-ui/react";

// Custom components
import { NNCVIcon } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";
import logoImage from "../../../assets/img/dashboards/Usb.png"; 

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' justify='center' direction='column'>
      <Flex align='center' justify='center' width='100%'>
        <NNCVIcon h='26px' w='175px' color={logoColor} />
        <Image 
          src={logoImage} 
          alt="Logo" 
          maxHeight="40px"
          maxWidth="70px"
        />
      </Flex>
      <HSeparator mt='20px' mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
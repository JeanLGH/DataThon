import React from "react";

// Chakra imports
import { Flex, useColorModeValue} from "@chakra-ui/react";

// Custom components
import { NNCVIcon } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' justify='center' direction='column'>
        <NNCVIcon h='26px' w='175px' color={logoColor} />      
      <HSeparator mt='20px' mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
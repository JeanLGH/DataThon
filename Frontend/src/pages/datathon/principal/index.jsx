import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Icon,
    VStack,
    Button,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaChartLine, FaThermometerHalf, FaTint, FaHospital, FaVenusMars } from 'react-icons/fa';
import { WiDayCloudy, WiRaindrops } from 'react-icons/wi';
import { GiAmberMosquito } from 'react-icons/gi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const FeatureBox = ({ title, icon, description }) => {
    return (
        <MotionBox
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg={useColorModeValue('white', 'gray.700')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <VStack spacing={3} align="center">
                <Icon as={icon} w={10} h={10} color="blue.500" />
                <Heading fontSize="xl">{title}</Heading>
                <Text textAlign="center">{description}</Text>
            </VStack>
        </MotionBox>
    );
};

const SectionItem = ({ icon, text }) => (
    <HStack spacing={4} width="100%" justifyContent="flex-start">
        <Icon as={icon} w={6} h={6} color="blue.500" />
        <Text>{text}</Text>
    </HStack>
);

const PrincipalDashboard = () => {
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Heading mb={6} textAlign="center">Bienvenido al Dashboard de Clima y Dengue</Heading>
            <Text fontSize="xl" textAlign="center" mb={10}>
                Explora datos climáticos y casos de dengue con nuestro innovador modelo predictivo.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px" mb="20px">
                <FeatureBox
                    title="Clima"
                    icon={WiDayCloudy}
                    description="Visualiza datos climáticos promedio, temperaturas y precipitaciones."
                />
                <FeatureBox
                    title="Dengue"
                    icon={GiAmberMosquito}
                    description="Analiza casos de dengue, hospitalizaciones y síntomas a lo largo del tiempo."
                />
                <FeatureBox
                    title="Modelo Predictivo"
                    icon={FaChartLine}
                    description="Predice la probabilidad de casos de dengue basado en factores climáticos."
                />
            </SimpleGrid>

            <Heading size="lg" mb={6} textAlign="center">Explora Nuestras Secciones</Heading>
            <Flex justify="center" align="center" width="100%">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%" maxWidth="800px">
                    <Box>
                        <Heading size="md" mb={4} textAlign="center">Sección Clima</Heading>
                        <VStack align="start" spacing={3}>
                            <SectionItem icon={FaThermometerHalf} text="Temperaturas diarias y promedios" />
                            <SectionItem icon={WiRaindrops} text="Niveles de precipitación" />
                            <SectionItem icon={WiDayCloudy} text="Condiciones climáticas generales" />
                        </VStack>
                    </Box>
                    <Box>
                        <Heading size="md" mb={4} textAlign="center">Sección Dengue</Heading>
                        <VStack align="start" spacing={3}>
                            <SectionItem icon={FaHospital} text="Casos de hospitalización" />
                            <SectionItem icon={FaChartLine} text="Evolución de síntomas en el tiempo" />
                            <SectionItem icon={FaVenusMars} text="Distribución de casos por género" />
                        </VStack>
                    </Box>
                </SimpleGrid>
            </Flex>

            <Flex justify="center" mt={10}>
                <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    colorScheme="blue"
                    size="lg"
                >
                    Comenzar Exploración
                </Button>
            </Flex>
        </Box>
    );
};

export default PrincipalDashboard;
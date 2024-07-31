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
    Image,
    Container,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { FaChartLine, FaThermometerHalf, FaHospital, FaVenusMars, FaLeaf, FaUserMd, FaShieldAlt, FaReact, FaNodeJs, FaDatabase, FaInfoCircle } from 'react-icons/fa';
import { WiDayCloudy, WiRaindrops } from 'react-icons/wi';
import { GiAmberMosquito } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const MotionBox = motion(Box);

const FeatureBox = ({ title, icon, description, linkTo }) => {
    const navigate = useNavigate();

    const handleExplorationClick = () => {
        navigate('/datathon/clima');
    };


    const handleClick = () => {
        if (linkTo) {
            if (linkTo.startsWith('http')) {
                window.open(linkTo, '_blank');
            } else {
                navigate(linkTo);
            }
        }
    };

    return (
        <MotionBox
            p={6}
            shadow="xl"
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue('white', 'gray.700')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            cursor={linkTo ? "pointer" : "default"}
        >
            <VStack spacing={4} align="center">
                <Icon as={icon} w={12} h={12} color="blue.500" />
                <Heading fontSize="2xl">{title}</Heading>
                <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
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

const TechnologiesModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Tecnologías Utilizadas</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack align="start" spacing={4}>
                    <HStack>
                        <Icon as={FaReact} w={8} h={8} color="blue.500" />
                        <Text>React para el frontend</Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaNodeJs} w={8} h={8} color="green.500" />
                        <Text>Node.js con Express para el backend</Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaDatabase} w={8} h={8} color="orange.500" />
                        <Text>PostgreSQL como base de datos</Text>
                    </HStack>
                </VStack>
                <Text mt={4}>
                    Nuestra arquitectura tecnológica ofrece una mayor flexibilidad, personalización y capacidad de manejo de datos en tiempo real.
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

const PrincipalDashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const navigate = useNavigate();

    const handleExplorationClick = () => {
        navigate('/datathon/clima');
    };


    return (
        <Box>
            <Box height="400px" position="relative" overflow="hidden">
                <Slider {...settings}>
                    <Image src="https://cdn.pixabay.com/photo/2022/10/07/14/32/human-7505169_1280.jpg" alt="Clima" objectFit="cover" w="100%" h="400px" />
                    <Image src="https://cdn.pixabay.com/photo/2017/11/14/08/51/sunset-2947819_1280.jpg" alt="Dengue" objectFit="cover" w="100%" h="400px" />
                    <Image src="https://resizer.glanacion.com/resizer/v2/los-casos-de-dengue-crecen-en-el-pais-y-es-X7VFI3MYCZBVZE5FC47Y6OT7BI.jpg?auth=9da09d49aefaa61c2a9a6c450b774a358ea1f79bae3c8278ee98ca7e82ee89f3&width=880&height=586&quality=70&smart=true" alt="Dengue" objectFit="cover" w="100%" h="400px" />
                    <Image src="https://cdn.pixabay.com/photo/2016/11/19/01/47/dance-schools-1837658_1280.jpg" alt="Dengue" objectFit="cover" w="100%" h="400px" />
                </Slider>
                <Box 
                    position="absolute" 
                    top="0" 
                    left="0" 
                    width="100%" 
                    height="100%" 
                    bg="rgba(0,0,0,0.6)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <VStack spacing={4}>
                        <Heading color="white" size="2xl" textAlign="center">Dashboard de Clima y Dengue</Heading>
                        <Text color="white" fontSize="xl" textAlign="center" maxWidth="800px">
                            Explora datos climáticos y casos de dengue con nuestro innovador modelo predictivo.
                        </Text>
                    </VStack>
                </Box>
            </Box>

            <Container maxW="container.xl" mt={12}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={16}>
                    <FeatureBox
                        title="Clima"
                        icon={WiDayCloudy}
                        description="Visualiza datos climáticos promedio, temperaturas y precipitaciones."
                        linkTo="/datathon/clima"
                    />
                    <FeatureBox
                        title="Dengue"
                        icon={GiAmberMosquito}
                        description="Analiza casos de dengue, hospitalizaciones y síntomas a lo largo del tiempo."
                        linkTo="/datathon/dengue"
                    />
                    <FeatureBox
                        title="Modelo Predictivo"
                        icon={FaChartLine}
                        description="Predice la probabilidad de casos de dengue basado en factores climáticos."
                        linkTo="http://93.127.213.95:5003"
                    />
                </SimpleGrid>

                <Box bg={useColorModeValue('blue.50', 'blue.900')} p={8} borderRadius="lg" mb={16}>
                    <Heading size="xl" mb={6} textAlign="center">Nuestra Plataforma</Heading>
                    <Text fontSize="lg" mb={6}>
                        Nuestra plataforma integra machine learning avanzado para modelar la propagación del dengue, superando los modelos matemáticos tradicionales. Manejamos grandes volúmenes de datos diversos, identificamos patrones ocultos y nos adaptamos continuamente para proporcionar predicciones más precisas y actualizadas.
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <FeatureBox
                            title="Útil para Agricultores"
                            icon={FaLeaf}
                            description="Ayuda en la planificación de cultivos y gestión de recursos hídricos."
                        />
                        <FeatureBox
                            title="Gestión de Desastres"
                            icon={FaShieldAlt}
                            description="Facilita la preparación y respuesta ante fenómenos climáticos extremos."
                        />
                        <FeatureBox
                            title="Salud Pública"
                            icon={FaUserMd}
                            description="Mejora la toma de decisiones para prevenir y controlar brotes de dengue."
                        />
                    </SimpleGrid>
                </Box>

                <Heading size="xl" mb={8} textAlign="center">Explora Nuestras Secciones</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={16}>
                    <Box bg={useColorModeValue('gray.50', 'gray.700')} p={6} borderRadius="lg">
                        <Heading size="lg" mb={4}>Sección Clima</Heading>
                        <VStack align="start" spacing={4}>
                            <SectionItem icon={FaThermometerHalf} text="Temperaturas diarias y promedios" />
                            <SectionItem icon={WiRaindrops} text="Niveles de precipitación" />
                            <SectionItem icon={WiDayCloudy} text="Condiciones climáticas generales" />
                            <SectionItem icon={FaInfoCircle} text="Fuente de datos: IDEAM 2023" />
                        </VStack>
                    </Box>
                    <Box bg={useColorModeValue('gray.50', 'gray.700')} p={6} borderRadius="lg">
                        <Heading size="lg" mb={4}>Sección Dengue</Heading>
                        <VStack align="start" spacing={4}>
                            <SectionItem icon={FaHospital} text="Casos de hospitalización" />
                            <SectionItem icon={FaChartLine} text="Evolución de síntomas en el tiempo" />
                            <SectionItem icon={FaVenusMars} text="Distribución de casos por género" />
                            <SectionItem icon={FaInfoCircle} text="Fuente de datos: SIVIGILA 2023" />
                        </VStack>
                    </Box>
                </SimpleGrid>

                <Flex justify="center" gap={4}>
                    <Button
                        as={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        colorScheme="blue"
                        size={{ base: 'md', md: 'lg' }}
                        px={{ base: 4, md: 8 }}
                        py={{ base: 4, md: 6 }}
                        fontSize={{ base: 'md', md: 'xl' }}
                        minWidth="120px"
                        maxWidth="200px"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        onClick={handleExplorationClick}  // Añade esta línea
                        
                    >
                        Comenzar Exploración
                    </Button>
                    <Button
                        as={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        colorScheme="green"
                        size={{ base: 'md', md: 'lg' }}
                        px={{ base: 4, md: 8 }}
                        py={{ base: 4, md: 6 }}
                        fontSize={{ base: 'md', md: 'xl' }}
                        minWidth="120px"
                        maxWidth="200px"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        onClick={onOpen}
                    >
                        Tecnologías Utilizadas
                    </Button>
                </Flex>
            </Container>
            <TechnologiesModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default PrincipalDashboard;

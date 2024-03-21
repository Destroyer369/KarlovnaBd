import { Box, Flex, Image } from "@chakra-ui/react";
import cake from "../images/cake.png";
import candle from "../images/candle.png"; // Путь к изображению свечи
import fire from "../images/fire.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Cake = ({ count, maxCount }) => {
  const [candlesPositions, setCandlesPositions] = useState([]);
  const [flamesPositions, setFlamesPositions] = useState([]);

  useEffect(() => {
    setCandlesPositions((currentPositions) => {
      let newPositions = [];
      let newFlamesPositions = []; // Новый массив для позиций пламени
      if (count > currentPositions.length) {
        newPositions = [...currentPositions];
        newFlamesPositions = [...flamesPositions];
        for (let i = currentPositions.length; i < count; i++) {
          const top = Math.random() * 15;
          const left = Math.random() * 90;
          newPositions.push({ top, left });
          newFlamesPositions.push({ top: top - 5, left }); // Предполагаем, что пламя будет немного выше свечи
        }
      } else {
        newPositions = currentPositions.slice(0, maxCount);
        newFlamesPositions = flamesPositions.slice(0, count);
      }
      setFlamesPositions(newFlamesPositions); // Обновляем состояние позиций пламени
      return newPositions;
    });
  }, [count, flamesPositions, maxCount]);

  return (
    <Flex position="relative" direction="column" alignItems="center" justifyContent="flex-end" w="100%" h={{base: "40vh", md: "50vh"}}>
      {/* Изображение cake */}
      <Box w={{base: "80%", md: "400px"}} h="200px" marginBottom="-230px">
        <Image src={cake} />
      </Box>
      {/* Контейнер для свечей и пламени */}
      <Box position="relative" ml="15px" w="250px" h="300px">
        {/* Пламя */}
        {flamesPositions.map((pos, index) => (
          <Image
            key={`flame-${index}`}
            src={fire}
            position="absolute"
            top={`${pos.top}%`}
            left={`${pos.left}%`}
            w="10px"
          />
        ))}
        {/* Свечи */}
        {candlesPositions.map((pos, index) => (
          <Image
            key={`candle-${index}`}
            src={candle}
            position="absolute"
            top={`${pos.top}%`}
            left={`${pos.left}%`}
            w="10px"
          />
        ))}
      </Box>
    </Flex>
  );
};
Cake.propTypes = {
  count: PropTypes.number.isRequired, // Указываем, что count должен быть числом и обязателен
  maxCount: PropTypes.number.isRequired,
};

export default Cake;


// <Flex position="relative" direction="column" alignItems="center" justifyContent="center" w="100%" h="50vh">
//       {/* Изображение cake */}
//       <Box w="400px" h="200px" marginBottom="-230px">
//         <Image src={cake} />
//       </Box>
//       {/* Контейнер для свечей и пламени */}
//       <Box position="relative" w="350px" h="300px">
//         {/* Пламя */}
//         {flamesPositions.map((pos, index) => (
//           <Image
//             key={`flame-${index}`}
//             src={fire}
//             position="absolute"
//             top={`${pos.top}%`}
//             left={`${pos.left}%`}
//             w="10px"
//           />
//         ))}
//         {/* Свечи */}
//         {candlesPositions.map((pos, index) => (
//           <Image
//             key={`candle-${index}`}
//             src={candle}
//             position="absolute"
//             top={`${pos.top}%`}
//             left={`${pos.left}%`}
//             w="10px"
//           />
//         ))}
//       </Box>
//     </Flex>

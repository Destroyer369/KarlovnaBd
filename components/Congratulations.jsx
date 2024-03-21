import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import birthdaySecondLabel from "../images/birthdaySecondLabel.png";
import shoes from "../images/shoes.jpg";

const Congratulations = () => {
  const [showImage, setShowImage] = useState(false);
  const [showCake, setShowCake] = useState(false);

  useEffect(() => {
    // Устанавливаем задержку перед появлением изображения
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 1000); // 1000 миллисекунд = 1 секунда

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Flex
      position="relative"
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="70vh"
      overflow="hidden"
    >
      {!showCake ? (
        <Box>
          <Image
            src={birthdaySecondLabel}
            alt="Birthday Label"
            style={{
              opacity: showImage ? 1 : 0,
              transform: showImage ? "scale(1)" : "scale(0.1)",
              transition: "opacity 1s, transform 2s",
            }}
          />
          <Button onClick={() => setShowCake(true)}>Забрать подарок</Button>{" "}
          {/* Нажатие кнопки устанавливает showCake в true */}
        </Box>
      ) : (
        <Image src={shoes} alt="Cake" w="100%" h="50%" rounded="full" />
      )}
    </Flex>
  );
};

export default Congratulations;

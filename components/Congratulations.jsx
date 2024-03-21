import {
  Box,
  Button,
  Flex,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import birthdaySecondLabel from "../images/birthdaySecondLabel.png";
import shoes from "../images/shoes.jpg";

const Congratulations = () => {
  const [showImage, setShowImage] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      direction="column"
      alignItems="center"
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
          <Button
            size="lg"
            colorScheme="teal"
            variant="outline"
            onClick={() => setShowCake(true)}
          >
            Забрать подарок
          </Button>
          {/* Нажатие кнопки устанавливает showCake в true */}
        </Box>
      ) : (
        <Box maxH="600px">
          <Image src={shoes} alt="Cake" w="100%" h="50%" rounded="full"/>
          <Button colorScheme="teal" variant="outline" onClick={onOpen} mt='25px'>
            Открыть письмо
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Hello!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Конечно, эти туфли хоть и очень красивые,и вообще ты будешь в них сног-шибательна. Не туфли конечно, но я могу только так подарить радость :D Ниже будет кнопка, чтобы перейти в документ с поздравлением тебе надо на неё нажать! 
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={() => window.open('https://docs.google.com/document/d/1E9Fm4oeTiHTR6sM8HzLvJ_tyMv0XnI0G3KmjJDR7tGk/edit?usp=sharing', '_blank')}>Перейти к поздравлению</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Flex>
  );
};

export default Congratulations;

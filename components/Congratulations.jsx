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
      justifyContent="center"
      w="100%"
      // overflow="hidden"
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
        <Box>
          <Image src={shoes} alt="shoes" w={{base: "80%", md: "30%"}}rounded="full" marginLeft="auto" marginRight="auto" border="1px" borderColor="#739A9B"/>
          <Button size={{ base: "sm", md: "md", lg: "md" }} colorScheme="teal" variant="outline" onClick={onOpen} mt='25px'>
            Открыть записку
          </Button>
          <Box>
          <Modal isOpen={isOpen} onClose={onClose} size={{base: "sm", md: "md"}}>
            <ModalOverlay />
            <ModalContent >
              <ModalHeader>А ты точно уже не парти-пупер?</ModalHeader>
              <ModalCloseButton />
              <ModalBody >
                Конечно, эти туфли хоть и очень красивые,и вообще ты будешь в них сног-шибательна. Я могу только так подарить их фотографию и хорошее настроение :D 
                Ниже есть кнопка, перейди к поздравлению! 
              </ModalBody>

              <ModalFooter>
                <Button size= {{ base: "sm", md: "md", lg: "md" }}  colorScheme="teal" variant="ghost" mr={3} onClick={onClose}>
                  Закрыть
                </Button>
                <Button size= {{ base: "sm", md: "md", lg: "md" }}  colorScheme="teal" variant="outline" onClick={() => window.open('https://docs.google.com/document/d/1E9Fm4oeTiHTR6sM8HzLvJ_tyMv0XnI0G3KmjJDR7tGk/edit?usp=sharing', '_blank')}>Перейти к поздравлению</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Congratulations;

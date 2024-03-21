import { useState } from "react";
import VolumeMeter from "./VolumeMeter";
import {
  Box,
  Button,
  Flex,
  Text,
  Card,
  CardBody,
  Stack,
} from "@chakra-ui/react";

const Microphone = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [micStream, setMicStream] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const toggleCardVisibility = (isVisible) => {
    setIsCardVisible(isVisible);
  };

  // Функция для включения микрофона
  const turnOnMic = async () => {
    try {
      // Проверяем, не включен ли уже микрофон
      if (!isMicOn) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicStream(stream);
        setIsMicOn(true);
        console.log("Микрофон включен:", stream);
      }
    } catch (error) {
      console.error("Ошибка при доступе к микрофону:", error);
    }
  };

  // Функция для выключения микрофона
  const turnOffMic = () => {
    // Проверяем, есть ли поток, и включен ли микрофон
    if (isMicOn && micStream) {
      micStream.getTracks().forEach((track) => track.stop());
      setMicStream(null);
      setIsMicOn(false);
      console.log("Микрофон выключен");
    }
  };

  return (
    // <Box className="App">
    <Box h="auto" pt="25px" p={{ base: "20px", md: "20px", lg: "20px" }}>
      <Flex
        direction="column"
        textAlign="center"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <Box pb="20px">
          <Stack spacing={0}>
            <Text
              fontSize={{ base: "34px", md: "60px", lg: "66px" }}
              fontWeight="bold"
              color="#739A9B"
            >
              Николаева,
            </Text>
            <Text
              fontSize={{ base: "34px", md: "60px", lg: "66px" }}
              fontWeight="bold"
              color="#739A9B"
            >
              с днём Рождения!
            </Text>
          </Stack>
          <Text fontSize={{ base: "12px", md: "14px", lg: "16px" }} color="#b5b5b5">
            *Приложение запросит у тебя разрешение на микрофон - подтверди
          </Text>
        </Box>
        <Button
        size= {{ base: "sm", md: "md", lg: "md" }} 
          colorScheme="teal"
          variant="outline"
          onClick={() => (isMicOn ? turnOffMic() : turnOnMic())}
        >
          {isMicOn ?"Закончить праздник" : "Начать праздник"}
        </Button>
        {isMicOn && micStream && (
          <>
            <Box pt="25px">
              {isMicOn && micStream && isCardVisible && (
                <Card>
                  <CardBody>
                    <Stack textAlign="left" spacing={1}>
                      <Text>1. Нажми ниже +.</Text>
                      <Text>
                        2. Нажми -готово, когда свечек будет достаточно
                      </Text>
                      <Text>
                        3. Загадай желание
                      </Text>
                      <Text>4. Задувай свечи</Text>
                    </Stack>
                  </CardBody>
                </Card>
              )}
              <VolumeMeter
                stream={micStream}
                onToggleCardVisibility={toggleCardVisibility}
              />
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Microphone;

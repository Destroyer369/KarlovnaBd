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
    <Box bg="" pt="25px">
      <Flex
        direction="column"
        textAlign="center"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <Box pb="20px">
          <Text fontSize="6xl" fontWeight="bold" color="#739A9B">
            Николаева, с днём Рождения!
          </Text>
          <Text fontSize="md">
            *Возможно браузер у тебя попросит активировать микрофон, нужно
            разрешить его использовать
          </Text>
        </Box>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => (isMicOn ? turnOffMic() : turnOnMic())}
        >
          {isMicOn ? "Выключить микрофон" : "Включить микрофон"}
        </Button>
        {isMicOn && micStream && (
          <>
            <Box pt="25px">
              {isMicOn && micStream && isCardVisible && (
                <Card>
                  <CardBody>
                    <Stack textAlign="left">
                      <Text>1. Нажми + и поймёшь что к чему.</Text>
                      <Text>
                        2. Нажми готово, когда свечек будет достаточно
                      </Text>
                      <Text>
                        3. Пойми где у тебя микрофон, загадывай желание
                      </Text>
                      <Text>4. Дуй в микрофон и произойдёт магия</Text>
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

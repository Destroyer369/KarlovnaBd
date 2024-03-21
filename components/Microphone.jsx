import { useState } from "react";
import VolumeMeter from "./VolumeMeter";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const Microphone = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [micStream, setMicStream] = useState(null);

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
    <Box className="App">
      <Text>Управление микрофоном и счётчиком</Text>
      <Button onClick={() => (isMicOn ? turnOffMic() : turnOnMic())}>
        {isMicOn ? "Выключить микрофон" : "Включить микрофон"}
      </Button>
      {isMicOn && micStream && (
        <>
          <Flex direction="column">
            <VolumeMeter stream={micStream} />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Microphone;

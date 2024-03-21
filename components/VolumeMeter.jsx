import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Counter from "./Counter";
import { Box } from "@chakra-ui/react";

const VolumeMeter = ({ stream }) => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Меньше для более плавного обновления, можете попробовать 512, 1024 для других эффектов
    const dataArray = new Uint8Array(analyser.fftSize);

    source.connect(analyser);

    const getVolume = () => {
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const x = (dataArray[i] - 128) / 128.0;
        sum += x * x;
      }
      let rms = Math.sqrt(sum / dataArray.length);
      let volume = Math.max(rms, 0.01) * 100;
      volume = Math.round(volume);
      setVolume(volume); // Обязательно вызываем setVolume для обновления состояния в Microphone
    };
    const interval = setInterval(getVolume, 100);

    return () => {
      clearInterval(interval);
      audioContext.close();
    };
  }, [stream]);

  // Простая логика для демонстрации: шкала увеличивается линейно с "громкостью"
  const volumeBarStyle = {
    height: "50px",
    width: `${volume * 5}px`, // Увеличиваем масштаб
    backgroundColor: "green",
    transition: "width 0.1s ease",
    maxWidth: "100%", // Ограничиваем максимальную ширину
  };

  return (
    <Box>
      <Box style={volumeBarStyle}>{Math.round(volume)}</Box>
      <Box>
        <Counter volume={volume} />
      </Box>
    </Box>
  );
};

VolumeMeter.propTypes = {
  stream: PropTypes.instanceOf(MediaStream).isRequired,
  setVolume: PropTypes.func.isRequired,
};

export default VolumeMeter;

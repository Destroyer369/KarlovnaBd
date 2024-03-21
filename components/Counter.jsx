import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Text, IconButton } from "@chakra-ui/react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Cake from "./Cake";
import Congratulations from "./Congratulations";

const Counter = ({ volume }) => {
  const [count, setCount] = useState(0);
  const [isEditable, setIsEditable] = useState(true);
  const [lastChangeTime, setLastChangeTime] = useState(Date.now());
  const [maxCount, setMaxCount] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  
  useEffect(() => {
    // Показываем Congratulations, если счётчик достиг 0 после его активации
    if (!isEditable && count === 0) {
      setShowCongrats(true);
    }
  }, [count, isEditable]);

  const handleIncrement = () => {
    if (isEditable) {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        setShowCongrats(false);
        setMaxCount((prevMaxCount) => Math.max(prevMaxCount, newCount)); // Обновляем maxCount
        return newCount;
      });
    }
    if (count > 28) {
        handleDone();
    }
  };

  const handleDecrement = () => {
    if (isEditable) {
      setCount((prevCount) => Math.max(prevCount - 1, 0)); // Предотвращаем отрицательные значения
      setShowCongrats(false);
      setMaxCount((prevCount) => Math.max(prevCount - 1, 0));
    }
  };

  const handleDone = () => {
    setIsEditable(false);
  };

  const handleReset = () => {
    setCount(0);
    setIsEditable(true);
    setMaxCount(0); // Сбрасываем maxCount
    setShowCongrats(false);
  };

  useEffect(() => {
    const now = Date.now();
    const timePassed = now - lastChangeTime;

    if (volume > 20 && !isEditable && timePassed >= 400) {
      // Проверяем, что volume больше 5 и прошло 1 секунду
      setCount((prevCount) => Math.max(prevCount - 1, 0));
      setLastChangeTime(now); // Обновляем время последнего изменения
    }
  }, [volume, isEditable, lastChangeTime]);

  

  

  return (
    <Box>
      {showCongrats ? <Congratulations /> : <Cake count={count} maxCount={maxCount}/>}
      <Text mb="4">Счётчик: {count}</Text>
      <IconButton
        icon={<CiSquarePlus size={30} />}
        onClick={handleIncrement}
        isDisabled={!isEditable}
        aria-label="Увеличить счётчик"
        mr="2"
      />
      <IconButton
        icon={<CiSquareMinus size={30} />}
        onClick={handleDecrement}
        isDisabled={!isEditable}
        aria-label="Уменьшить счётчик"
        mr="2"
      />
      <Button onClick={handleDone} isDisabled={!isEditable} mr="2">
        Готово
      </Button>
      <Button onClick={handleReset}>Обновить счётчик</Button>
    </Box>
  );
};

Counter.propTypes = {
  volume: PropTypes.number.isRequired,
};

export default Counter;

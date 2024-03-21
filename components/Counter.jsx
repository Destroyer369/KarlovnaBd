import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Text, IconButton } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Cake from "./Cake";
import Congratulations from "./Congratulations";

const Counter = ({ volume, onToggleCardVisibility }) => {
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
    if (count > 30) {
      handleDone();
      alert("Ты что СТАРУХА ?");
      handleReset();
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
    onToggleCardVisibility(false); // Предполагаем, что при вызове "Готово" мы хотим скрыть Card
  };

  const handleReset = () => {
    setCount(0);
    setIsEditable(true);
    setMaxCount(0);
    setShowCongrats(false);
    onToggleCardVisibility(true); // Показываем Card при сбросе
  };

  useEffect(() => {
    const now = Date.now();
    const randomDelay = Math.floor(Math.random() * (350 - 100 + 1) + 100); // Генерируем случайное число от 100 до 350
    const timePassed = now - lastChangeTime;

    if (volume > 5 && !isEditable && timePassed >= randomDelay) {
      // Проверяем, что volume больше 5 и прошло время, больше или равное randomDelay
      setCount((prevCount) => Math.max(prevCount - 1, 0));
      setLastChangeTime(now); // Обновляем время последнего изменения
    }
  }, [volume, isEditable, lastChangeTime]);

  Counter.propTypes = {
    volume: PropTypes.number.isRequired,
    onToggleCardVisibility: PropTypes.func, // Добавляем это
  };

  return (
    <Box>
      {showCongrats ? (
        <Box h="auto" mb="25px">
          <Congratulations />{" "}
        </Box>
      ) : (
        <Box h="auto" mb="20px">
          <Cake count={count} maxCount={maxCount} />
        </Box>
      )}
      {isEditable && (
        <Text fontSize={{ base: "16px", md: "20px", lg: "20px" }} mb="4">
          Сколько нам годиков : {count}
        </Text>
      )}

      <IconButton
        size= {{ base: "sm", md: "md", lg: "md" }} 
        colorScheme="teal"
        variant="outline"
        icon={<FaPlus size={15} />}
        onClick={handleIncrement}
        isDisabled={!isEditable}
        aria-label="Увеличить счётчик"
        mr="2"
      />
      <IconButton
        size= {{ base: "sm", md: "md", lg: "md" }} 
        colorScheme="teal"
        variant="outline"
        icon={<FaMinus size={15} />}
        onClick={handleDecrement}
        isDisabled={!isEditable}
        aria-label="Уменьшить счётчик"
        mr="2"
      />
      <Button
        size= {{ base: "sm", md: "md", lg: "md" }} 
        colorScheme="teal"
        variant="outline"
        onClick={handleDone}
        isDisabled={!isEditable}
        mr="2"
      >
        Готово
      </Button>
      <Button
        size= {{ base: "sm", md: "md", lg: "md" }} 
        colorScheme="teal"
        variant="outline"
        onClick={handleReset}
      >
        Погнали ещё раз
      </Button>
    </Box>
  );
};

Counter.propTypes = {
  volume: PropTypes.number.isRequired,
};

export default Counter;

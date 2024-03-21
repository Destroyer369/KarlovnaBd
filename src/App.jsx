// import "./App.css";
import Microphone from "../components/Microphone";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Microphone/>
      </ChakraProvider>
    </>
  );
}

export default App;

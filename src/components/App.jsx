import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
// import { Notifications } from "@mantine/notifications";

// Стили Mantine подключаются рядом с провайдером темы. В браузерном режиме
// тесты монтируют приложение из init, поэтому импорты из index.jsx до
// страницы не доезжают.
// 
// import "@mantine/notifications/styles.css";
import Home from "./Home";
import NotFound from "./NotFound";
import Login from "./Login"

function App() {
  return (
     <MantineProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
// src/init.jsx
import App from "./components/App.jsx";

const init = async (socket) => {
  // здесь появятся экземпляр i18n, клиент запросов и хранилища
  return <App />;
};

export default init;
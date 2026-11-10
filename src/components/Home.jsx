import { BrowserRouter, Routes, Route } from "react-router";
import { Navigate } from 'react-router-dom';
import {useAuth} from './Login'

function Page() {
  return (
    <>
      <h2>Профиль</h2>
      <p>Мария, Казань</p>
    </>
  );
}

const Home = () => {
  const token = useAuth((state) => state.token);
  return token ? <Page /> : <Navigate to="/login" replace />;
};

 
export default Home
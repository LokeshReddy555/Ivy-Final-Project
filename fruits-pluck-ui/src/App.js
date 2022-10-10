import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import RegisterPage from './components/RegisterPage';
import StartGamePage from './components/StartGamePage';
import UserPage from './components/UserPage';
import ChangePassword from './components/ChangePassword';
import Payment from './components/Payment';
import Upgrade from './components/Upgrade';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/forgot-password" element={<ForgotPassword />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/start-game" element={<StartGamePage />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
          <Route path="/user/upgrade" element={<Upgrade />} />
          <Route path="/user/payment" element={<Payment />} />
          
          <Route path="/*" element={<HomePage />} />
        </Routes>
    </>
  );
}

export default App;

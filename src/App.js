import './App.css';
import { Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Prof } from './pages/Prof';
import {UserSettings} from './pages/UserSettings';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Home />}></Route>
        <Route path = "/login" element = {<Login />}></Route>
        <Route path = "/register" element = {<Register />}></Route>
        <Route path = "/settings/user" element = {<UserSettings />}></Route>
        <Route path = "/prof" element = {<Prof />}></Route>
      </Routes>
    </div>
  );
}

export default App;

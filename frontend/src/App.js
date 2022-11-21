import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import VerificationPage from "./screens/VerificationPage/VerificationPage";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AdminPage from "./screens/AdminPage/AdminPage";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/verification" component={VerificationPage} />
        <Route path="/adminpage" component={AdminPage} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;

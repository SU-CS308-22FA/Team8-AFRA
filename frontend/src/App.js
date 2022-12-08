import "./App.css";
import React from "react";
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
import FixturePage from "./screens/FixturePage/FixturePage";
import StandingPage from "./screens/StandingPage/StandingPage";
import CreateComment from "./screens/CreateComment/CreateComment";
import MyComments from "./screens/MyComments/MyComments";
import SingleComment from "./screens/CreateComment/SingleComment";
import RefereesScreen from "./screens/RefereesScreen/RefereesScreen";

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
        <Route path="/fixture" component={FixturePage} />
        <Route path="/standings" component={StandingPage} />
        <Route path="/referees" component={RefereesScreen} />
        <Route
          path="/mycomments"
          component={({ history }) => (
            <MyComments search={search} history={history} />
          )}
        />
        <Route path="/comment/:id" component={SingleComment} />
        <Route path="/createcomment" component={CreateComment} />;
      </main>
      <Footer />
    </Router>
  );
}

export default App;

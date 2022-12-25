import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { useState, Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Unauthorized from "./components/Unauthorized";
import BanScreen from "./components/Banned";
import OnlyAdmins from "./components/OnlyAdmins";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import BanAppeal from "./screens/BanAppeal/BanAppeal";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import NotificationPage from "./screens/NotificationPage/NotificationPage";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import VerificationPage from "./screens/VerificationPage/VerificationPage";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AdminPage from "./screens/AdminPage/AdminPage";
import AdminBan from "./screens/AdminPage/AdminBan";
import AdminMail from "./screens/AdminPage/AdminMail";
import AdminAppeal from "./screens/AdminPage/AdminAppeal";
import FixturePage from "./screens/FixturePage/FixturePage";
import CalendarPage from "./screens/CalendarPage/CalendarPage";
import StandingPage from "./screens/StandingPage/StandingPage";
import CreateComment from "./screens/CreateComment/CreateComment";
import SingleComment from "./screens/CreateComment/SingleComment";
import RefereesScreen from "./screens/RefereesScreen/RefereesScreen";
import SingleReferee from "./screens/SingleReferee/SingleReferee";
import SingleTeam from "./screens/SingleTeam/SingleTeam";
import MatchDetailPage from "./screens/MatchDetailPage/MatchDetailPage";
import ReplyComment from "./screens/CreateComment/ReplyComment";
import TeamsScreen from "./screens/TeamsScreen/TeamsScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="banappeal" element={<BanAppeal />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="onlyadmins" element={<OnlyAdmins />} />
        <Route path="fixture" element={<FixturePage />} />
        <Route path="standings" element={<StandingPage />} />
        <Route path="/matchdetails/:matchID" element={<MatchDetailPage />} />
        <Route path="banned" element={<BanScreen />} />
        <Route path="/referees" element={<RefereesScreen />} />
        <Route path="/referee/:refereeName" element={<SingleReferee />} />
        <Route path="/teams" element={<TeamsScreen />} />
        <Route path="/team/:teamID/:season" element={<SingleTeam />} />

        <Route element={<RequireAuth />}>
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="comment/:id/:matchID" element={<SingleComment />} />
          <Route path="createcomment/:matchID" element={<CreateComment />} />
          <Route
            path="replycomment/:parentId/:matchID"
            element={<ReplyComment />}
          />
          <Route path="verification" element={<VerificationPage />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="adminpage" element={<AdminPage />} />
          <Route path="adminban" element={<AdminBan />} />
          <Route path="adminappeal" element={<AdminAppeal />} />
          <Route path="adminmail" element={<AdminMail />} />
        </Route>
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

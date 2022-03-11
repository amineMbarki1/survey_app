import { Routes, Route } from 'react-router-dom';

import AuthPage from './user/pages/AuthPage';
import useAuth from './shared/hooks/useAuth';
import AuthContext from './shared/context/authContext';
import SurveysListPage from './surveys/pages/SurveysListPage';
import NewSurveyPage from './surveys/pages/NewSurveyPage';
import Navbar from './shared/components/Navbar';
import './App.css';

function App() {
  const { user, isLoggedIn, login, logout } = useAuth();

  console.log(isLoggedIn);

  const routes = (
    <>
      {isLoggedIn && <Navbar logout={logout} user={user} />}
      <Routes>
        <Route path="/" element={<SurveysListPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        <Route path="surveys/new" element={<NewSurveyPage />} />
      </Routes>
    </>
  );

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{routes}</AuthContext.Provider>;
}

export default App;

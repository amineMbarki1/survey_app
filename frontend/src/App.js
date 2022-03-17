import { Routes, Route } from 'react-router-dom';

import AuthPage from './user/pages/AuthPage';
import useAuth from './shared/hooks/useAuth';
import useAlert from './shared/hooks/useAlert';
import AuthContext from './shared/context/authContext';
import AlertContext from './shared/context/alertContext';
import SurveysListPage from './surveys/pages/SurveysListPage';
import NewSurveyPage from './surveys/pages/NewSurveyPage';
import Navbar from './shared/components/Navbar';
import MyAlert from './shared/components/MyAlert';
import './App.css';

function App() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { isShown, showAlert, disableAlert, alertInfo } = useAlert();

  const routes = (
    <>
      {isLoggedIn && <Navbar logout={logout} user={user} />}
      <MyAlert isShown={isShown} disbaleAlert={disableAlert} {...alertInfo} />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/" element={<SurveysListPage />} />
        <Route path="surveys/new" element={<NewSurveyPage />} />
      </Routes>
    </>
  );

  return (
    <AlertContext.Provider value={{ isShown, showAlert, ...alertInfo }}>
      <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{routes}</AuthContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;

import { Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import Header from '../components/Header';
import Calendar from '../pages/Calendar';

function AppRouter() {
  return (
    <HashRouter>
      <Header />
      <div className="all-content-container">
        <video id="backdrop-video" autoPlay muted loop src="../../tekken-league/videos/background-smoke.mp4"></video>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default AppRouter;

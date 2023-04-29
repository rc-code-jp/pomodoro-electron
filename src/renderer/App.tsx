import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import IndexPage from '@/pages/index';
import PomodoroPage from '@/pages/pomodoro';
import '@/styles/reset.css';
import '@/styles/global.scss';

export default function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

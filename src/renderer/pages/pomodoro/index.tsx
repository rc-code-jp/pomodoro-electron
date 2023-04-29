import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { usePauseAtom } from '@/state/timer';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss';

export default function PomodoroPage() {
  const navigate = useNavigate();
  // 一時停止フラグ
  const [pause, setPause] = usePauseAtom();

  const keyboardEventHandler = useCallback(
    (event: KeyboardEvent) => {
      // エスケープで戻る
      if (event.key === 'Escape') {
        navigate('/');
      }

      // スペースキーで一時停止の切り替え
      if (event.key === ' ') {
        setPause(!pause);
      }
    },
    [navigate, pause, setPause]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyboardEventHandler, false);

    return () => {
      document.removeEventListener('keydown', keyboardEventHandler, false);
    };
  }, [keyboardEventHandler]);

  window.electron.ipcRenderer.on('on-pause', () => {
    setPause(!pause);
  });

  return (
    <div id="pomodoro-page" className="page">
      <Link to="/" className="back-link">
        &lt;
      </Link>
      <CountdownTimer />
    </div>
  );
}

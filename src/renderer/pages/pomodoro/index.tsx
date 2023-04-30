import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { usePauseAtom } from '@/state/timer';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss';

export default function PomodoroPage() {
  const navigate = useNavigate();
  // 一時停止フラグ
  const [pause, setPause] = usePauseAtom();

  const togglePause = useCallback(() => {
    if (pause) {
      setPause(false);
      // ステータス変更
      window.electron.ipcRenderer.sendMessage('change-status', ['start']);
    } else {
      setPause(true);
      // ステータス変更
      window.electron.ipcRenderer.sendMessage('change-status', ['pause']);
    }
  }, [pause, setPause]);

  const keyboardEventHandler = useCallback(
    (event: KeyboardEvent) => {
      // エスケープで戻る
      if (event.key === 'Escape') {
        navigate('/');
      }

      // スペースキーで一時停止の切り替え
      if (event.key === ' ') {
        togglePause();
      }
    },
    [navigate, togglePause]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyboardEventHandler, false);

    return () => {
      document.removeEventListener('keydown', keyboardEventHandler, false);
    };
  }, [keyboardEventHandler]);

  // 一時停止ショートカット検知
  window.electron.ipcRenderer.on('on-pause', () => {
    togglePause();
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

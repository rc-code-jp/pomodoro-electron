import { usePauseAtom, useRestModeAtom, useTimeAtom } from '@/state/timer';
import { useNavigate } from 'react-router-dom';
import './StartButton.scss';

export default function StartButton() {
  const navigate = useNavigate();
  const [, setTime] = useTimeAtom();
  const [, setPause] = usePauseAtom();
  const [, setRestMode] = useRestModeAtom();

  const start = () => {
    setTime(60 * 25); // 25分
    setPause(false);
    setRestMode(false);

    // 通知
    new Notification('Start timer', { body: 'Start timer ...' }).onclick =
      () => {
        console.log('click notification');
      };

    // タイマー画面に遷移
    navigate('/pomodoro');
  };

  return (
    <button type="button" className="start-button" onClick={start}>
      Start
    </button>
  );
}

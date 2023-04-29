import { usePauseAtom, useTimeAtom } from '@/state/timer';
import { useNavigate } from 'react-router-dom';
import './StartButton.scss';

export default function StartButton() {
  const navigate = useNavigate();
  const [, setTime] = useTimeAtom();
  const [, setPause] = usePauseAtom();

  const start = () => {
    setTime(60 * 25); // 25分
    setPause(false);
    navigate('/pomodoro');
  };

  return (
    <button type="button" className="start-button" onClick={start}>
      Start
    </button>
  );
}
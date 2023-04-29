import { usePauseAtom, useRestModeAtom, useTimeAtom } from '@/state/timer';
import { useCallback, useEffect } from 'react';
import './CountdownTimer.scss';

// ゼロ埋め
const pad = (val: number) => {
  return String(val).padStart(2, '0');
};

export default function CountdownTimer() {
  // タイマーの秒
  const [time, setTime] = useTimeAtom();

  // 一時停止フラグ
  const [pause] = usePauseAtom();

  // 休憩フラグ
  const [isRestMode, setRestMode] = useRestModeAtom();

  // モード切り替え
  const changeMode = useCallback(() => {
    if (isRestMode) {
      setRestMode(false);
      setTime(60 * 25);
    } else {
      setRestMode(true);
      setTime(60 * 5);
    }
  }, [isRestMode, setRestMode, setTime]);

  // マウント時にタイマーを開始する
  useEffect(() => {
    const timerId = setInterval(() => {
      if (pause) return;

      if (time - 1 >= 0) {
        // カウントダウン
        setTime(time - 1);
      } else {
        // モード切り替え
        changeMode();
      }
    }, 1000);

    // アンマウント時にタイマーをクリアする
    return () => clearInterval(timerId);
  }, [pause, setTime, time, isRestMode, setRestMode, changeMode]);

  const hour = Math.floor(time / 3600);
  const minutes = Math.floor((time - hour * 3600) / 60);
  const seconds = time - hour * 3600 - minutes * 60;

  return (
    <div
      className={`
      countdown-timer
      ${pause ? 'pause' : ''}
      ${isRestMode ? 'rest-mode' : ''}`}
    >
      <output className="output">
        <span>{pad(hour)}</span>
        <span>:</span>
        <span>{pad(minutes)}</span>
        <span>:</span>
        <span>{pad(seconds)}</span>
      </output>
    </div>
  );
}

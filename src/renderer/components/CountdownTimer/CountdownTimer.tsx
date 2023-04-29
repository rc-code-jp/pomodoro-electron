import { useEffect, useState } from 'react';
import './CountdownTimer.scss';

// ゼロ埋め
const pad = (val: number) => {
  return String(val).padStart(2, '0');
};

// 秒を00:00:00に変換する
const formatTime = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec - h * 3600) / 60);
  const s = sec - h * 3600 - m * 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export default function CountdownTimer({
  startSeconds = 60 * 25,
  finishedCallbackHandler,
}: {
  startSeconds?: number;
  finishedCallbackHandler?: () => void;
}) {
  const [time, setTime] = useState(startSeconds);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (time - 1 >= 0) {
        // カウントダウン
        setTime(time - 1);
      } else {
        // 完了
        finishedCallbackHandler?.();
      }
    }, 1000);

    // コンポーネント破棄時にタイマーをクリアする
    return () => clearInterval(timerId);
  }, [time]);

  return (
    <div className="countdown-timer">
      <output className="a">{formatTime(time)}</output>
    </div>
  );
}

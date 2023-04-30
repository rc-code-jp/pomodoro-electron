import StartButton from '@/components/StartButton/StartButton';
import { useEffect } from 'react';
import './index.scss';

export default function IndexPage() {
  useEffect(() => {
    // ステータス変更
    window.electron.ipcRenderer.sendMessage('change-status', ['standby']);
  }, []);

  return (
    <div id="index-page">
      <StartButton />
    </div>
  );
}

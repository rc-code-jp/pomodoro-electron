import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { Link } from 'react-router-dom';

export default function PomodoroPage() {
  return (
    <div>
      <div>
        <CountdownTimer></CountdownTimer>
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}

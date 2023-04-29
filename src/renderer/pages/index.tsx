import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div>
      <div>index</div>
      <Link to="/pomodoro">Start</Link>
    </div>
  );
}

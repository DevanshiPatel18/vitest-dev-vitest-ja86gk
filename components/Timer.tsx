import React, { useEffect, useState } from 'react';
import { formatDuration } from './duration.ts';
interface TimerProps {
  minutes: number;
  seconds: number;
  onEnd: () => void;
}
const Timer = (props: TimerProps) => {
  const { minutes, seconds, onEnd } = props;
  const [time, setTime] = useState(minutes * 60 + seconds);


  // useEffect(() => {
  //   if (time === 0) {
  //     onEnd();
  //   }
  // }, [time, onEnd]);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      console.log("Timer has reached zero")
      onEnd();
    }
  }, [time, onEnd])

  
  return <div>{formatDuration(time)}</div>
}
export default Timer;

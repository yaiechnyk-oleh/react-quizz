import React, { useState, useEffect } from 'react';

interface QuizTimerProps {
    duration: number;  // Duration in minutes
    onTimeUp: () => void;
}

export const QuizTimer = ({ duration, onTimeUp }: QuizTimerProps) => {
    const [secondsLeft, setSecondsLeft] = useState(duration * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(prevSeconds => {
                if (prevSeconds <= 1) {
                    clearInterval(interval);  // Clear the interval when countdown completes
                    onTimeUp();               // Call the onTimeUp callback
                    return 0;                 // Avoid going negative
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="timer-container">
            <div className="timer">
                Time left: {formatTime(secondsLeft)}
            </div>
        </div>
    );
};

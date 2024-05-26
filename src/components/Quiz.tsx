import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { QuizTimer } from './QuizTimer';
import { Modal } from './Modal';

interface Answer {
    id: string;
    answerText: string;
    isCorrect: boolean;
}

interface Question {
    id: string;
    questionText: string;
    answers: Answer[];
    points: number;
    questionType: 'single-choice' | 'multiple-choice' | 'text-input';
    modelAnswer?: string;
}

interface Quiz {
    id: string;
    title: string;
    duration: number; // Duration in minutes for the quiz
    questions: Question[];
}

export const Quiz = () => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [answers, setAnswers] = useState<{ [questionId: string]: string[] }>({});
    const [textAnswers, setTextAnswers] = useState<{ [questionId: string]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const foundQuiz = quizzes.find((q: Quiz) => q.id === quizId);
        if (foundQuiz) {
            setQuiz(foundQuiz);
        } else {
            navigate('/'); // Redirect to home if quiz not found
        }
    }, [quizId, navigate]);

    const handleAnswerChange = (questionId: string, answerId: string, isChecked: boolean) => {
        setAnswers(prev => {
            const questionAnswers = prev[questionId] || [];
            if (isChecked) {
                return {
                    ...prev,
                    [questionId]: [...questionAnswers, answerId]
                };
            } else {
                return {
                    ...prev,
                    [questionId]: questionAnswers.filter(id => id !== answerId)
                };
            }
        });
    };

    const handleSingleChoiceChange = (questionId: string, answerId: string) => {
        setAnswers({
            ...answers,
            [questionId]: [answerId]
        });
    };

    const handleTextAnswerChange = (questionId: string, text: string) => {
        setTextAnswers({
            ...textAnswers,
            [questionId]: text
        });
    };

    const calculateScore = () => {
        return quiz?.questions.reduce((totalScore, question) => {
            if (question.questionType === 'single-choice') {
                const selectedAnswer = answers[question.id]?.[0];
                if (selectedAnswer === question.answers.find(a => a.isCorrect)?.id) {
                    return totalScore + question.points; // Add points for the correct single choice answer
                }
            } else if (question.questionType === 'multiple-choice') {
                const selectedAnswers = answers[question.id] || [];
                const correctAnswers = question.answers.filter(a => a.isCorrect).map(a => a.id);
                if (selectedAnswers.length === correctAnswers.length &&
                    selectedAnswers.every(answer => correctAnswers.includes(answer))) {
                    return totalScore + question.points; // Add points if all selected answers are correct
                }
            } else if (question.questionType === 'text-input') {
                if (textAnswers[question.id]?.toLowerCase() === question.modelAnswer?.toLowerCase()) {
                    return totalScore + question.points; // Add points for the correct text answer
                }
            }
            return totalScore;
        }, 0) || 0;
    };

    const handleSubmit = () => {
        const score = calculateScore();
        setFinalScore(score);
        setIsModalOpen(true);
    };

    const handleTimeUp = () => {
        const score = calculateScore();
        setFinalScore(score);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/'); // Navigate to home or results page after closing the modal
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const previousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    if (!quiz) return <div>Loading...</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#006769]">{quiz?.title}</h1>
            {quiz && <QuizTimer duration={quiz.duration} onTimeUp={handleTimeUp} />}
            <div key={currentQuestion.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#006769]">{`Question ${currentQuestionIndex + 1}: ${currentQuestion.questionText}`}</h2>
                {currentQuestion.questionType === 'single-choice' && currentQuestion.answers.map(answer => (
                    <label key={answer.id} className="block cursor-pointer mb-2 p-3 bg-gray-200 rounded-lg shadow-sm hover:bg-[#9DDE8B] transition">
                        <input
                            type="radio"
                            name={currentQuestion.id}
                            value={answer.id}
                            onChange={() => handleSingleChoiceChange(currentQuestion.id, answer.id)}
                            checked={answers[currentQuestion.id]?.includes(answer.id) || false}
                            className="mr-2"
                        />
                        {answer.answerText}
                    </label>
                ))}
                {currentQuestion.questionType === 'multiple-choice' && currentQuestion.answers.map(answer => (
                    <label key={answer.id} className="block cursor-pointer mb-2 p-3 bg-gray-200 rounded-lg shadow-sm hover:bg-[#9DDE8B] transition">
                        <input
                            type="checkbox"
                            name={currentQuestion.id}
                            value={answer.id}
                            onChange={(e) => handleAnswerChange(currentQuestion.id, answer.id, e.target.checked)}
                            checked={answers[currentQuestion.id]?.includes(answer.id) || false}
                            className="mr-2"
                        />
                        {answer.answerText}
                    </label>
                ))}
                {currentQuestion.questionType === 'text-input' && (
                    <input
                        type="text"
                        className="border-2 border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                        placeholder="Type your answer here"
                        value={textAnswers[currentQuestion.id] || ''}
                        onChange={(e) => handleTextAnswerChange(currentQuestion.id, e.target.value)}
                    />
                )}
            </div>
            <div className="flex justify-between">
                {currentQuestionIndex > 0 && (
                    <Button onClick={previousQuestion} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                        Previous
                    </Button>
                )}
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <Button onClick={nextQuestion} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                        Next
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                        Submit Quiz
                    </Button>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Quiz Results">
                <p className="text-lg">Your score is: {finalScore}</p>
                <Button onClick={closeModal} className="mt-4 bg-[#40A578] w-full py-2 text-white rounded hover:bg-[#006769]">Close</Button>
            </Modal>
        </div>
    );
};








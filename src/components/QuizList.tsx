import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { Button } from './Button';

interface Quiz {
    id: string;
    title: string;
}

export const QuizList = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const navigate = useNavigate();

    // Fetch quizzes from local storage
    useEffect(() => {
        const loadQuizzes = () => {
            const storedQuizzes = localStorage.getItem('quizzes');
            if (storedQuizzes) {
                setQuizzes(JSON.parse(storedQuizzes));
            }
        };

        loadQuizzes();
    }, []);

    // Function to delete a quiz
    const deleteQuiz = (id: string) => {
        const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        setQuizzes(updatedQuizzes);
    };

    // Function to navigate to edit a quiz
    const editQuiz = (id: string) => {
        navigate(`/edit-quiz/${id}`);
    };

    // Function to take a quiz
    const takeQuiz = (id: string) => {
        navigate(`/take-quiz/${id}`);
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-7xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#006769]">Quiz List</h1>
            {quizzes.length > 0 ? (
                <ul className="space-y-4">
                    {quizzes.map(quiz => (
                        <li key={quiz.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow hover:bg-[#9DDE8B] transition">
                            <span className="font-medium text-lg text-[#006769]">{quiz.title}</span>
                            <div className="flex space-x-2">
                                <Button onClick={() => editQuiz(quiz.id)} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                                    Edit
                                </Button>
                                <Button onClick={() => takeQuiz(quiz.id)} className="bg-[#9DDE8B] text-[#006769] py-2 px-4 rounded hover:bg-[#40A578]">
                                    Take Quiz
                                </Button>
                                <Button onClick={() => deleteQuiz(quiz.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-lg text-gray-700">No quizzes found. Please add some quizzes.</p>
            )}
        </div>
    );
};

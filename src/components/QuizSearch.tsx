import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Quiz {
    id: string;
    title: string;
}

export const QuizSearch = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Load quizzes from local storage
    useEffect(() => {
        const storedQuizzes = localStorage.getItem('quizzes');
        if (storedQuizzes) {
            const quizzesData: Quiz[] = JSON.parse(storedQuizzes);
            setQuizzes(quizzesData);
            setFilteredQuizzes(quizzesData);
        }
    }, []);

    // Filter quizzes based on the search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredQuizzes(quizzes);
        } else {
            const filteredData = quizzes.filter(quiz =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredQuizzes(filteredData);
        }
    }, [searchTerm, quizzes]);

    // Navigate to the quiz taking page
    const takeQuiz = (id: string) => {
        navigate(`/take-quiz/${id}`);
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-8xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#006769]">Search Quizzes</h1>
            <input
                type="text"
                placeholder="Search quizzes..."
                className="border-2 border-gray-300 p-3 rounded mb-6 w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-4">
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map(quiz => (
                        <li key={quiz.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow hover:bg-[#9DDE8B] transition">
                            <span className="font-medium text-lg text-[#006769]">{quiz.title}</span>
                            <button
                                onClick={() => takeQuiz(quiz.id)}
                                className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]"
                            >
                                Take Quiz
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-700">No quizzes found. Try a different search term.</p>
                )}
            </ul>
        </div>
    );
};

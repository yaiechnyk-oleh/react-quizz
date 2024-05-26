import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { QuizList } from './components/QuizList';
import { QuizForm } from './components/QuizForm';
import { Quiz } from './components/Quiz';
import { QuizSearch } from './components/QuizSearch';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-teal-700">
                <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-7xl">
                    <header className="flex justify-between items-center py-4 mb-6 border-b-2 border-gray-300">
                        <h1 className="text-3xl font-bold text-[#006769]">React Quiz App</h1>
                        <nav>
                            <Link to="/" className="mx-2 text-lg text-[#006769] hover:text-[#40A578]">Home</Link>
                            <Link to="/create-quiz" className="mx-2 text-lg text-[#006769] hover:text-[#40A578]">Create Quiz</Link>
                            <Link to="/search-quizzes" className="mx-2 text-lg text-[#006769] hover:text-[#40A578]">Search Quizzes</Link>
                        </nav>
                    </header>
                    <Routes>
                        <Route path="/" element={<QuizList />} />
                        <Route path="/create-quiz" element={<QuizForm />} />
                        <Route path="/edit-quiz/:quizId" element={<QuizForm />} />
                        <Route path="/take-quiz/:quizId" element={<Quiz />} />
                        <Route path="/search-quizzes" element={<QuizSearch />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom'; // For navigation and accessing URL parameters
// import { Button } from './Button';
//
// interface Quiz {
//     id: string;
//     title: string;
//     questions: Question[];
// }
//
// interface Question {
//     id: string;
//     questionText: string;
//     answers: Answer[];
// }
//
// interface Answer {
//     id: string;
//     answerText: string;
//     isCorrect: boolean;
// }
//
// export const QuizForm = () => {
//     const [quiz, setQuiz] = useState<Quiz>({ id: '', title: '', questions: [] });
//     const { quizId } = useParams<{ quizId?: string }>();
//     const history = useNavigate();
//
//     // Load the quiz for editing
//     useEffect(() => {
//         if (quizId) {
//             const storedQuizzes = localStorage.getItem('quizzes');
//             if (storedQuizzes) {
//                 const quizzes: Quiz[] = JSON.parse(storedQuizzes);
//                 const existingQuiz = quizzes.find(q => q.id === quizId);
//                 if (existingQuiz) setQuiz(existingQuiz);
//             }
//         }
//     }, [quizId]);
//
//     // Handle input changes for the quiz title
//     const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setQuiz(prevQuiz => ({ ...prevQuiz, title: event.target.value }));
//     };
//
//     // Add a new question to the quiz
//     const addQuestion = () => {
//         const newQuestion: Question = {
//             id: Math.random().toString(36).substr(2, 9), // Simple ID generation
//             questionText: '',
//             answers: []
//         };
//         setQuiz(prevQuiz => ({
//             ...prevQuiz,
//             questions: [...prevQuiz.questions, newQuestion]
//         }));
//     };
//
//     // Update question text
//     const updateQuestionText = (questionId: string, text: string) => {
//         const updatedQuestions = quiz.questions.map(q =>
//             q.id === questionId ? { ...q, questionText: text } : q
//         );
//         setQuiz(prevQuiz => ({ ...prevQuiz, questions: updatedQuestions }));
//     };
//
//     // Add a new answer to a question
//     const addAnswer = (questionId: string) => {
//         const newAnswer: Answer = {
//             id: Math.random().toString(36).substr(2, 9),
//             answerText: '',
//             isCorrect: false
//         };
//         const updatedQuestions = quiz.questions.map(q =>
//             q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
//         );
//         setQuiz(prevQuiz => ({ ...prevQuiz, questions: updatedQuestions }));
//     };
//
//     // Update answer text
//     const updateAnswerText = (questionId: string, answerId: string, text: string) => {
//         const updatedQuestions = quiz.questions.map(q =>
//             q.id === questionId ? {
//                 ...q, answers: q.answers.map(a =>
//                     a.id === answerId ? { ...a, answerText: text } : a
//                 )
//             } : q
//         );
//         setQuiz(prevQuiz => ({ ...prevQuiz, questions: updatedQuestions }));
//     };
//
//     // Set the correct answer for a question
//     const setCorrectAnswer = (questionId: string, answerId: string) => {
//         const updatedQuestions = quiz.questions.map(q =>
//             q.id === questionId ? {
//                 ...q, answers: q.answers.map(a =>
//                     ({ ...a, isCorrect: a.id === answerId })
//                 )
//             } : q
//         );
//         setQuiz(prevQuiz => ({ ...prevQuiz, questions: updatedQuestions }));
//     };
//
//     // Delete an answer
//     const deleteAnswer = (questionId: string, answerId: string) => {
//         const updatedQuestions = quiz.questions.map(q =>
//             q.id === questionId ? {
//                 ...q, answers: q.answers.filter(a => a.id !== answerId)
//             } : q
//         );
//         setQuiz(prevQuiz => ({ ...prevQuiz, questions: updatedQuestions }));
//     };
//
//     // Submit the form to save the quiz
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         const storedQuizzes = localStorage.getItem('quizzes');
//         let quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
//         if (quizId) {
//             quizzes = quizzes.map(q => q.id === quizId ? quiz : q);
//         } else {
//             quiz.id = Math.random().toString(36).substr(2, 9); // Generate new ID for new quiz
//             quizzes.push(quiz);
//         }
//         localStorage.setItem('quizzes', JSON.stringify(quizzes));
//         history('/'); // Navigate back to quiz list
//     };
//
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-xl font-bold mb-4">{quizId ? 'Edit Quiz' : 'Create Quiz'}</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     className="border-2 border-gray-300 p-2 rounded mb-4 w-full"
//                     placeholder="Enter quiz title"
//                     value={quiz.title}
//                     onChange={handleTitleChange}
//                 />
//                 {quiz.questions.map((question, qIndex) => (
//                     <div key={question.id} className="mb-4">
//                         <input
//                             type="text"
//                             className="border-2 border-gray-300 p-2 rounded mb-2 w-full"
//                             placeholder={`Question ${qIndex + 1}`}
//                             value={question.questionText}
//                             onChange={e => updateQuestionText(question.id, e.target.value)}
//                         />
//                         {question.answers.map((answer, aIndex) => (
//                             <div key={answer.id} className="flex items-center mb-2">
//                                 <input
//                                     type="text"
//                                     className="border-2 border-gray-300 p-2 rounded flex-grow mr-2"
//                                     placeholder={`Answer ${aIndex + 1}`}
//                                     value={answer.answerText}
//                                     onChange={e => updateAnswerText(question.id, answer.id, e.target.value)}
//                                 />
//                                 <input
//                                     type="radio"
//                                     name={`correct-answer-${question.id}`}
//                                     checked={answer.isCorrect}
//                                     onChange={() => setCorrectAnswer(question.id, answer.id)}
//                                     className="mr-2"
//                                 />
//                                 <Button onClick={() => deleteAnswer(question.id, answer.id)} className="bg-red-500">
//                                     Delete
//                                 </Button>
//                             </div>
//                         ))}
//                         <Button onClick={() => addAnswer(question.id)} className="mr-2">
//                             Add Answer
//                         </Button>
//                     </div>
//                 ))}
//                 <Button onClick={addQuestion} className="mr-2">
//                     Add Question
//                 </Button>
//                 <Button type="submit" className="bg-blue-500">
//                     Save Quiz
//                 </Button>
//             </form>
//         </div>
//     );
// };
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './Button'; // Ensure this points to your Button component

interface Answer {
    id: string;
    answerText: string;
    isCorrect: boolean;
}

interface Question {
    id: string;
    questionText: string;
    answers: Answer[];
    questionType: 'single-choice' | 'multiple-choice' | 'text-input';
    modelAnswer?: string; // Model answer for text input questions
    points: number; // Points for each question
}

interface Quiz {
    id: string;
    title: string;
    duration: number; // Duration in minutes
    questions: Question[];
}

export const QuizForm = () => {
    const [quiz, setQuiz] = useState<Quiz>({ id: '', title: '', duration: 30, questions: [] });
    const { quizId } = useParams<{ quizId?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizId) {
            const storedQuizzes = localStorage.getItem('quizzes');
            if (storedQuizzes) {
                const quizzes: Quiz[] = JSON.parse(storedQuizzes);
                const existingQuiz = quizzes.find(q => q.id === quizId);
                if (existingQuiz) setQuiz(existingQuiz);
            }
        }
    }, [quizId]);

    const handleQuizChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Quiz) => {
        const value = event.target.type === 'number' ? parseInt(event.target.value, 10) || 0 : event.target.value;
        setQuiz(prev => ({ ...prev, [field]: value }));
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            id: Math.random().toString(36).substr(2, 9),
            questionText: '',
            answers: [],
            questionType: 'single-choice',
            points: 1 // Default points value
        };
        setQuiz(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
    };

    const deleteQuestion = (questionId: string) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.filter(question => question.id !== questionId)
        }));
    };

    const handleTextChange = (text: string, questionId: string, field: 'questionText' | 'modelAnswer') => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? {
                    ...question,
                    [field]: text
                } : question
            )
        }));
    };

    const handleAnswerTextChange = (text: string, questionId: string, answerId: string) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? {
                    ...question,
                    answers: question.answers.map(answer =>
                        answer.id === answerId ? { ...answer, answerText: text } : answer
                    )
                } : question
            )
        }));
    };

    const handlePointsChange = (points: number, questionId: string) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? {
                    ...question,
                    points
                } : question
            )
        }));
    };

    const toggleCorrectAnswer = (questionId: string, answerId: string) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? {
                    ...question,
                    answers: question.answers.map(answer =>
                        answer.id === answerId ? { ...answer, isCorrect: !answer.isCorrect } : answer
                    )
                } : question
            )
        }));
    };

    const toggleQuestionType = (questionId: string, type: 'single-choice' | 'multiple-choice' | 'text-input') => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? {
                    ...question,
                    questionType: type,
                    answers: (type === 'multiple-choice' || type === 'single-choice') && question.answers.length === 0
                        ? [{ id: Math.random().toString(36).substr(2, 9), answerText: '', isCorrect: false }]
                        : question.answers,
                    modelAnswer: type === 'text-input' ? question.modelAnswer || '' : undefined
                } : question
            )
        }));
    };

    const addAnswer = (questionId: string) => {
        const newAnswer: Answer = {
            id: Math.random().toString(36).substr(2, 9),
            answerText: '',
            isCorrect: false
        };
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? { ...question, answers: [...question.answers, newAnswer] } : question
            )
        }));
    };

    const deleteAnswer = (questionId: string, answerId: string) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(question =>
                question.id === questionId ? {
                    ...question,
                    answers: question.answers.filter(answer => answer.id !== answerId)
                } : question
            )
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const storedQuizzes = localStorage.getItem('quizzes');
        let quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
        if (quizId) {
            quizzes = quizzes.map(q => q.id === quizId ? quiz : q);
        } else {
            const newId = Math.random().toString(36).substr(2, 9);
            const newQuiz = { ...quiz, id: newId }; // Create a new quiz with the new ID
            quizzes.push(newQuiz);
            setQuiz(newQuiz); // Update the state with the new quiz ID
        }
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        navigate('/');
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-7xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#006769]">{quizId ? 'Edit Quiz' : 'Create Quiz'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">Quiz Title</label>
                    <input
                        type="text"
                        className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                        placeholder="Enter quiz title"
                        value={quiz.title || ''}
                        onChange={(e) => handleQuizChange(e, 'title')}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">Duration (minutes)</label>
                    <input
                        type="number"
                        className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                        placeholder="Duration in minutes"
                        value={quiz.duration.toString()}
                        onChange={(e) => handleQuizChange(e, 'duration')}
                        min="1"
                    />
                </div>
                {quiz.questions.map((question, qIndex) => (
                    <div key={question.id} className="bg-gray-200 p-4 rounded-lg mb-4 shadow-inner">
                        <div className="space-y-2 mb-4">
                            <label className="block text-lg font-semibold text-[#006769]">Question {qIndex + 1}</label>
                            <input
                                type="text"
                                className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                                placeholder={`Question ${qIndex + 1}`}
                                value={question.questionText || ''}
                                onChange={(e) => handleTextChange(e.target.value, question.id, 'questionText')}
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <label className="block text-lg font-semibold text-[#006769]">Points</label>
                            <input
                                type="number"
                                className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                                placeholder="Points"
                                value={question.points.toString()}
                                onChange={(e) => handlePointsChange(parseInt(e.target.value, 10), question.id)}
                                min="1"
                            />
                        </div>
                        <div className="flex space-x-2 mb-4">
                            <Button onClick={() => toggleQuestionType(question.id, 'single-choice')} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                                Single Choice
                            </Button>
                            <Button onClick={() => toggleQuestionType(question.id, 'multiple-choice')} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                                Multiple Choice
                            </Button>
                            <Button onClick={() => toggleQuestionType(question.id, 'text-input')} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">
                                Text Input
                            </Button>
                        </div>
                        {question.questionType === 'single-choice' && question.answers.map((answer, aIndex) => (
                            <div key={answer.id} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 p-3 rounded flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                                    placeholder={`Answer ${aIndex + 1}`}
                                    value={answer.answerText || ''}
                                    onChange={(e) => handleAnswerTextChange(e.target.value, question.id, answer.id)}
                                />
                                <input
                                    type="radio"
                                    name={`correct-answer-${question.id}`}
                                    checked={answer.isCorrect}
                                    onChange={() => toggleCorrectAnswer(question.id, answer.id)}
                                    className="mr-2"
                                />
                                <Button onClick={() => deleteAnswer(question.id, answer.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</Button>
                            </div>
                        ))}
                        {question.questionType === 'multiple-choice' && question.answers.map((answer, aIndex) => (
                            <div key={answer.id} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 p-3 rounded flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                                    placeholder={`Answer ${aIndex + 1}`}
                                    value={answer.answerText || ''}
                                    onChange={(e) => handleAnswerTextChange(e.target.value, question.id, answer.id)}
                                />
                                <input
                                    type="checkbox"
                                    checked={answer.isCorrect}
                                    onChange={() => toggleCorrectAnswer(question.id, answer.id)}
                                    className="mr-2"
                                />
                                <Button onClick={() => deleteAnswer(question.id, answer.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</Button>
                            </div>
                        ))}
                        {question.questionType === 'text-input' && (
                            <div className="space-y-2 mb-4">
                                <label className="block text-lg font-semibold text-[#006769]">Model Answer</label>
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#40A578]"
                                    placeholder="Type the model answer here"
                                    value={question.modelAnswer || ''}
                                    onChange={(e) => handleTextChange(e.target.value, question.id, 'modelAnswer')}
                                />
                            </div>
                        )}
                        <Button onClick={() => addAnswer(question.id)} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769] mr-1.5">Add Answer</Button>
                        <Button onClick={() => deleteQuestion(question.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete Question</Button>
                    </div>
                ))}
                <Button onClick={addQuestion} className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769] mr-1.5">Add Question</Button>
                <Button type="submit" className="bg-[#40A578] text-white py-2 px-4 rounded hover:bg-[#006769]">Save Quiz</Button>
            </form>
        </div>
    );
};















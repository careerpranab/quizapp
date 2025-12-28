function QuizScreen({ onFinish }) {
    try {
        const questions = window.QUIZ_DATA || [];
        const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
        const [selectedOption, setSelectedOption] = React.useState(null);
        const [isAnswered, setIsAnswered] = React.useState(false);
        const [answers, setAnswers] = React.useState([]); // Store history of answers

        if (!questions.length) return <div className="text-center p-4">No questions available.</div>;

        const currentQuestion = questions[currentQuestionIndex];
        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        const handleOptionSelect = (optionId) => {
            if (isAnswered) return;
            setSelectedOption(optionId);
        };

        const handleConfirmAnswer = () => {
            if (!selectedOption) return;
            setIsAnswered(true);
        };

        const handleNext = () => {
            // Save result
            const isCorrect = selectedOption === currentQuestion.correctAnswer;
            const newAnswers = [...answers, {
                questionId: currentQuestion.id,
                selected: selectedOption,
                correct: currentQuestion.correctAnswer,
                isCorrect: isCorrect
            }];
            setAnswers(newAnswers);

            if (isLastQuestion) {
                // Calculate score
                const score = newAnswers.filter(a => a.isCorrect).length;
                onFinish(score, newAnswers);
            } else {
                // Reset for next question
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            }
        };

        return (
            <div className="card p-6 sm:p-8" data-name="quiz-screen" data-file="components/QuizScreen.js">
                <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => {
                            let optionClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group ";
                            
                            if (isAnswered) {
                                if (option.id === currentQuestion.correctAnswer) {
                                    optionClass += "bg-[var(--success-light)] border-[var(--success)] text-green-800";
                                } else if (option.id === selectedOption) {
                                    optionClass += "bg-[var(--error-light)] border-[var(--error)] text-red-800";
                                } else {
                                    optionClass += "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                                }
                            } else {
                                if (selectedOption === option.id) {
                                    optionClass += "border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-medium shadow-sm";
                                } else {
                                    optionClass += "border-gray-200 hover:border-[var(--primary)] hover:bg-gray-50 text-gray-700";
                                }
                            }

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.id)}
                                    disabled={isAnswered}
                                    className={optionClass}
                                >
                                    <span className="flex items-center">
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm font-bold ${
                                            selectedOption === option.id && !isAnswered 
                                                ? 'bg-[var(--primary)] text-white' 
                                                : isAnswered && option.id === currentQuestion.correctAnswer
                                                ? 'bg-[var(--success)] text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {option.id.toUpperCase()}
                                        </span>
                                        {option.text}
                                    </span>
                                    
                                    {isAnswered && option.id === currentQuestion.correctAnswer && (
                                        <div className="icon-circle-check text-[var(--success)] text-xl"></div>
                                    )}
                                    {isAnswered && selectedOption === option.id && option.id !== currentQuestion.correctAnswer && (
                                        <div className="icon-circle-x text-[var(--error)] text-xl"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    {!isAnswered ? (
                        <button 
                            onClick={handleConfirmAnswer}
                            disabled={!selectedOption}
                            className="btn btn-primary"
                        >
                            Confirm Answer
                        </button>
                    ) : (
                        <button 
                            onClick={handleNext}
                            className="btn btn-primary group"
                        >
                            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                <div className="icon-arrow-right"></div>
                            </span>
                        </button>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('QuizScreen error:', error);
        return null;
    }
}

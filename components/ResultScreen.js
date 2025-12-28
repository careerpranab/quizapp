function ResultScreen({ score, totalQuestions, history, onRestart }) {
    try {
        // Fallback or ensure totalQuestions is valid to prevent division by zero
        const safeTotal = totalQuestions || 1;
        const percentage = Math.round((score / safeTotal) * 100);
        
        let message = "";
        let icon = "";
        let colorClass = "";

        if (percentage === 100) {
            message = "Perfect Score! You're a genius!";
            icon = "icon-trophy";
            colorClass = "text-yellow-500 bg-yellow-100";
        } else if (percentage >= 80) {
            message = "Great job! Almost perfect.";
            icon = "icon-star";
            colorClass = "text-blue-500 bg-blue-100";
        } else if (percentage >= 60) {
            message = "Good effort! Keep learning.";
            icon = "icon-thumbs-up";
            colorClass = "text-green-500 bg-green-100";
        } else {
            message = "Don't give up! Try again.";
            icon = "icon-target";
            colorClass = "text-orange-500 bg-orange-100";
        }

        return (
            <div className="card p-8 text-center" data-name="result-screen" data-file="components/ResultScreen.js">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${colorClass}`}>
                    <div className={`${icon} text-4xl`}></div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                <p className="text-lg text-gray-600 mb-8">{message}</p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                    <div className="grid grid-cols-3 gap-4 divide-x divide-gray-200">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</p>
                            <p className="text-2xl font-bold text-[var(--primary)]">{score}/{totalQuestions}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Accuracy</p>
                            <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mistakes</p>
                            <p className="text-2xl font-bold text-[var(--error)]">{totalQuestions - score}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={onRestart}
                        className="btn btn-primary group"
                    >
                        <span className="mr-2 group-hover:-rotate-180 transition-transform duration-500">
                            <div className="icon-rotate-cw"></div>
                        </span>
                        Play Again
                    </button>
                    
                    <button 
                        className="btn btn-outline"
                        onClick={() => alert('Sharing functionality to be implemented!')}
                    >
                        <span className="mr-2">
                            <div className="icon-share-2"></div>
                        </span>
                        Share Result
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ResultScreen error:', error);
        return null;
    }
}

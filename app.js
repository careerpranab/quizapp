function App() {
    try {
        const [appState, setAppState] = React.useState('welcome'); // welcome, quiz, result
        const [score, setScore] = React.useState(0);
        const [quizHistory, setQuizHistory] = React.useState([]); // To store answers for review if needed

        const startQuiz = () => {
            setScore(0);
            setQuizHistory([]);
            setAppState('quiz');
        };

        const finishQuiz = (finalScore, history) => {
            setScore(finalScore);
            setQuizHistory(history);
            setAppState('result');
        };

        const restartQuiz = () => {
            setAppState('welcome');
        };

        return (
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center" data-name="app-container" data-file="app.js">
                <div className="w-full max-w-3xl">
                    {/* Header Logo Area */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4">
                            <div className="icon-brain text-4xl text-[var(--primary)]"></div>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            MindSpark Quiz
                        </h1>
                    </div>

                    {/* Main Content Area */}
                    <main className="transition-all duration-300 ease-in-out">
                        {appState === 'welcome' && (
                            <WelcomeScreen onStart={startQuiz} />
                        )}
                        {appState === 'quiz' && (
                            <QuizScreen onFinish={finishQuiz} />
                        )}
                        {appState === 'result' && (
                            <ResultScreen 
                                score={score} 
                                totalQuestions={QUIZ_DATA.length} 
                                history={quizHistory}
                                onRestart={restartQuiz} 
                            />
                        )}
                    </main>

                    <footer className="mt-12 text-center text-sm text-[var(--text-muted)]">
                        <p>© 2025 MindSpark. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        return <div className="text-red-500 text-center">Something went wrong. Please reload.</div>;
    }
}

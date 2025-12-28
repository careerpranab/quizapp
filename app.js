// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center border-l-4 border-red-500">
                        <div className="icon-alert-triangle text-4xl text-red-500 mx-auto mb-4"></div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-600 mb-4">We encountered an unexpected error. Please try reloading the page.</p>
                        <details className="text-left bg-gray-100 p-4 rounded text-xs overflow-auto max-h-48">
                            <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                            {this.state.error && this.state.error.toString()}
                        </details>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors w-full"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    try {
        const [appState, setAppState] = React.useState('welcome'); // welcome, quiz, result
        const [score, setScore] = React.useState(0);
        const [quizHistory, setQuizHistory] = React.useState([]); // To store answers for review if needed
        
        // Access global data
        const questions = window.QUIZ_DATA || [];

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

        if (!questions.length) {
            return (
                <div className="min-h-screen flex items-center justify-center text-red-500">
                    Error: Quiz data not found.
                </div>
            );
        }

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
                                totalQuestions={questions.length} 
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
        throw error; // Re-throw to be caught by ErrorBoundary
    }
}

// Mount the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

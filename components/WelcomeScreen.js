function WelcomeScreen({ onStart }) {
    try {
        return (
            <div className="card p-8 sm:p-12 text-center" data-name="welcome-screen" data-file="components/WelcomeScreen.js">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                    Ready to challenge yourself?
                </h2>
                <p className="text-[var(--text-muted)] text-lg mb-8 max-w-lg mx-auto">
                    Test your general knowledge with our curated set of questions. 
                    There's no time limit, so think carefully!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-left">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <div className="icon-brain-circuit text-[var(--primary)] text-xl"></div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Logic & Facts</h3>
                            <p className="text-sm text-gray-500">Various topics covered</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <div className="icon-trophy text-green-600 text-xl"></div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Score Points</h3>
                            <p className="text-sm text-gray-500">Track your progress</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-orange-100 p-2 rounded-lg">
                            <div className="icon-zap text-orange-600 text-xl"></div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Instant Results</h3>
                            <p className="text-sm text-gray-500">See answers immediately</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={onStart}
                    className="btn btn-primary w-full sm:w-auto text-lg px-12 group"
                >
                    Start Quiz
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        <div className="icon-arrow-right"></div>
                    </span>
                </button>
            </div>
        );
    } catch (error) {
        console.error('WelcomeScreen error:', error);
        return null;
    }
}

function ProgressBar({ current, total }) {
    try {
        const percentage = Math.round((current / total) * 100);
        
        return (
            <div className="mb-6" data-name="progress-bar" data-file="components/ProgressBar.js">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                    <span>Question {current} of {total}</span>
                    <span>{percentage}%</span>
                </div>
                <div className="progress-bar-container">
                    <div 
                        className="progress-bar-fill"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProgressBar error:', error);
        return null;
    }
}

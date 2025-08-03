import React from 'react';

const PersonalGoals: React.FC = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Spiritual Goals</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-2">
                        <span>Lesson discussion participation</span>
                        <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <span>Discovery Guide</span>
                        <span>40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                </div>
                {/* Add more progress indicators */}
            </div>
        </div>
    );
};

export default PersonalGoals;

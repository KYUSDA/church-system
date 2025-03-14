import React from 'react'

const MinistryUpdates = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className='flex justify-between items-center'>
                <h3 className="text-lg font-semibold mb-4">Ministry Updates</h3>
                <button className="text-blue-600">View All</button>
            </div>

            <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Personal Ministry</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Mission  registration now open for year 2024 , register in the registration form provided.
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Youth camp registration now open for summer 2024
                    </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium">Elders Desk</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        We encourage every church member to participate actively in family meetings, kindly check out your family meeting schedule and mark your attendance .
                    </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Welfare Department</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        We are happy to announce an upcoming social sunday at University of Embu this coming weekend .
                    </p>
                </div>
                {/* Add more ministry updates */}
            </div>
        </div>
    )
}

export default MinistryUpdates

const CommunicationHub = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Communication Center</h3>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        New Message
                    </button>
                </div>
                {/* Add message threads */}
            </div>
        </div>
    )
}

export default CommunicationHub

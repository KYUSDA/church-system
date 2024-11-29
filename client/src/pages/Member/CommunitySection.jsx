const CommunitySection = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <div className="grid grid-cols-2 gap-4">
                {/* Birthdays This Week */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Birthdays This Week</h4>
                    <ul className="space-y-2">
                        {[
                            { name: "Alice Johnson", date: "Monday, Nov 27" },
                            { name: "Samuel Kamotho", date: "Wednesday, Nov 29" },
                            { name: "Faith Maina", date: "Friday, Dec 1" },
                        ].map((birthday, index) => (
                            <li key={index} className="text-sm">
                                🎉 <strong>{birthday.name}</strong> - {birthday.date}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* New Members */}
                <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">New Members</h4>
                    <ul className="space-y-2">
                        {[
                            { name: "John Doe", joined: "2 days ago" },
                            { name: "Jane Smith", joined: "5 days ago" },
                            { name: "Peter Mwangi", joined: "1 week ago" },
                        ].map((member, index) => (
                            <li key={index} className="text-sm">
                                ✅ <strong>{member.name}</strong> - Joined {member.joined}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Weekly Spotlight */}
            <div className="bg-yellow-50 p-6 rounded-lg mt-6">
                <h4 className="font-medium mb-3">🌟 Weekly Spotlight</h4>
                <div className="space-y-4">
                    <p className="text-sm">
                        This week's spotlight goes to <strong>Mary Njeri</strong> for her outstanding efforts in leading the recent prayer chain and organizing a fun community game night!
                    </p>
                    <blockquote className="italic text-gray-700 bg-yellow-100 p-3 rounded-lg">
                        "I love how this community has strengthened my faith and brought so much joy to my life!"
                        — Mary Njeri
                    </blockquote>
                    <p className="text-sm">
                        Want to nominate someone for next week's spotlight? <a href="#" className="text-blue-600 underline">Click here</a> to submit their name and story!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommunitySection;

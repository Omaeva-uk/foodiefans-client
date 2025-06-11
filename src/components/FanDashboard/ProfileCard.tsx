export default function ProfileCard() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <img src="/profile.jpg" alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4" />
        <h2 className="text-center text-xl font-bold mb-1">Aston Martin</h2>
        <p className="text-center text-gray-500 mb-4">helloIAmMartin@gmail.com</p>
        <div className="flex justify-around mb-4">
          <div>
            <p className="text-lg font-semibold text-center">50</p>
            <p className="text-sm text-center text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-center">120</p>
            <p className="text-sm text-center text-gray-500">Followers</p>
          </div>
        </div>
        <button className="w-full bg-[#028b6e] text-white py-2 rounded-full font-semibold hover:bg-[#02705a]">View Profile</button>
      </div>
    );
  }
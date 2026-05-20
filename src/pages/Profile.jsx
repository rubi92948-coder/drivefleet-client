import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // 1. Imported useNavigate

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newName, setNewName] = useState(""); 
  const [newEmail, setNewEmail] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate(); // 2. Initialized useNavigate hook

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          withCredentials: true,
        });
        setUser(res.data);
        setNewName(res.data.name); 
        setNewEmail(res.data.email); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // Handle Profile Update Function
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/update", 
        { name: newName, email: newEmail }, 
        { withCredentials: true }
      );

      const updatedUser = { ...user, name: newName, email: newEmail };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setUser(updatedUser); 
      setIsModalOpen(false); 
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <p className="text-orange-500 text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4 relative">
      
      {/* Profile Card Wrapper - Added 'relative' to position the cross button */}
      <div className="bg-[#0f172a] p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800 relative">
        
        {/* 3. Close / Cross Button */}
        <button
          onClick={() => navigate(-1)} // Takes the user back to the previous page
          className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 bg-gray-900 border border-gray-800 hover:border-orange-500 w-8 h-8 flex items-center justify-center rounded-full transition duration-200"
          title="Go Back"
        >
          ✕
        </button>
        
        {/* Profile Header & Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            {user.image ? (
              <img
                className="h-24 w-24 rounded-full border-4 border-orange-500 object-cover shadow-lg"
                src={user.image}
                alt={user.name}
              />
            ) : (
              <div className="h-24 w-24 rounded-full border-4 border-orange-500 bg-orange-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 border-2 border-[#0f172a] rounded-full"></span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">{user.name}</h1>
          <p className="text-gray-400 text-sm">DriveFleet Member</p>
        </div>

        <hr className="border-gray-800 mb-6" />

        {/* User Information Display */}
        <div className="space-y-4">
          <div className="bg-[#1e293b] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Full Name</span>
            <span className="text-base text-gray-200 font-medium">{user.name}</span>
          </div>

          <div className="bg-[#1e293b] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Email Address</span>
            <span className="text-base text-gray-200 font-medium">{user.email}</span>
          </div>
        </div>

        {/* Edit Profile Trigger Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-orange-600/20"
        >
          Edit Profile
        </button>

      </div>

      {/* Edit Profile Modal PopUp */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <h2 className="text-xl font-bold text-orange-500 mb-4">Update Profile</h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-[#1e293b] text-white border border-gray-700 focus:border-orange-500 focus:outline-none px-4 py-2.5 rounded-xl transition"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-[#1e293b] text-white border border-gray-700 focus:border-orange-500 focus:outline-none px-4 py-2.5 rounded-xl transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white font-medium py-2 px-4 rounded-xl transition"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
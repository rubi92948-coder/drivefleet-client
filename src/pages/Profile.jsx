import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/me`, {
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `${BASE_URL}/api/user/update`,
        { name: newName, email: newEmail },
        { withCredentials: true }
      );

      const updatedUser = {
        ...user,
        name: newName,
        email: newEmail,
      };

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
        <p className="text-orange-500 text-xl font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4 relative">

      <div className="bg-[#0f172a] p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800 relative">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 bg-gray-900 border border-gray-800 hover:border-orange-500 w-8 h-8 flex items-center justify-center rounded-full"
        >
          ✕
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            {user.image ? (
              <img
                className="h-24 w-24 rounded-full border-4 border-orange-500 object-cover"
                src={user.image}
                alt={user.name}
              />
            ) : (
              <div className="h-24 w-24 rounded-full border-4 border-orange-500 bg-orange-600 flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400 text-sm">DriveFleet Member</p>
        </div>

        <div className="space-y-4">
          <div className="bg-[#1e293b] p-4 rounded-xl">
            <span className="text-orange-500 text-xs">Full Name</span>
            <p>{user.name}</p>
          </div>

          <div className="bg-[#1e293b] p-4 rounded-xl">
            <span className="text-orange-500 text-xs">Email</span>
            <p>{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-6 bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-semibold"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-full max-w-sm border border-gray-800">

            <h2 className="text-xl font-bold text-orange-500 mb-4">
              Update Profile
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">

              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-[#1e293b] p-2 rounded-xl border border-gray-700"
                placeholder="Name"
              />

              <input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-[#1e293b] p-2 rounded-xl border border-gray-700"
                placeholder="Email"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-800 py-2 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-600 py-2 rounded-xl"
                >
                  {loading ? "Updating..." : "Save"}
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
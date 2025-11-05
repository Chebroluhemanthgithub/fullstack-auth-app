import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth"))?.user;
  const [users, setUsers] = useState([
    { id: 1, name: "Michael Holz", date: "04/10/2013", role: "Admin", status: "Active", img: "https://i.pravatar.cc/50?img=1" },
    { id: 2, name: "Paula Wilson", date: "05/08/2014", role: "Publisher", status: "Active", img: "https://i.pravatar.cc/50?img=2" },
    { id: 3, name: "Antonio Moreno", date: "11/05/2015", role: "Publisher", status: "Suspended", img: "https://i.pravatar.cc/50?img=3" },
    { id: 4, name: "Mary Saveley", date: "06/09/2016", role: "Reviewer", status: "Active", img: "https://i.pravatar.cc/50?img=4" },
    { id: 5, name: "Martin Sommer", date: "12/08/2017", role: "Moderator", status: "Inactive", img: "https://i.pravatar.cc/50?img=5" },
  ]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // 🧹 Local Delete Function
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center bg-white shadow-md rounded-xl p-5 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, <span className="text-blue-600">{user.name}</span> 🎉
        </h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
          Logout
        </button>
      </div>

      {/* Table */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Date Created</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3 flex items-center gap-3">
                    <img src={u.img} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-medium text-gray-800">{u.name}</span>
                  </td>
                  <td className="p-3">{u.date}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full font-semibold ${
                        u.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : u.status === "Suspended"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          u.status === "Active"
                            ? "bg-green-600"
                            : u.status === "Suspended"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-center flex gap-4 justify-center">
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      <FaUserEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDelete(u.id)}
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-8 text-gray-400 text-sm">
         {new Date().getFullYear()} Dashboard | Built by{" "}
        <span className="font-semibold text-blue-600">Hemanth Chebrolu</span>
      </footer>
    </div>
  );
};

export default Dashboard;

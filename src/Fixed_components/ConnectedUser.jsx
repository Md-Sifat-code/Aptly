import React from "react";
import { FiUser } from "react-icons/fi";

const ConnectedUser = () => {
  // Dummy user data
  const users = [
    { id: 1, name: "John Doe", status: "Online" },
    { id: 2, name: "Jane Smith", status: "Offline" },
    { id: 3, name: "Michael Brown", status: "Online" },
  ];

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Connected Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <FiUser className="text-xl text-gray-600" />
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <span
                className={`text-sm ${
                  user.status === "Online" ? "text-green-500" : "text-gray-400"
                }`}
              >
                {user.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUser;

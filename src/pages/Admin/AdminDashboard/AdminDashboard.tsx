import { useEffect, useState } from "react";
import "./AdminDashborad.scss";

interface User {
  id: number;
  username: string;
  password: string;
  role: number;
  tasks: null;
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5174/api/user");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
    console.log("Data fetched", users);
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard__container">
        <h1>Admin Dashboard</h1>

        <table className="admin-dashboard__table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  {
                    // Role if 1 is admin, 0 is user
                    user.role === 1 ? "Admin" : "User"
                  }
                </td>
                <td>
                  <button className="admin-dashboard__button">Edit</button>
                  <button className="admin-dashboard__button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminDashboard;

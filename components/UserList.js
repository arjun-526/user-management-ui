import { React, useState, useEffect } from "react";
import User from "./User";

const UserList = ({user}) => {
  const USER_API_BASE_URL = "http://localhost:8082/api/v1/users";

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(USER_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]); 

  return (
    <div className="container mx-auto my-8">
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide px-6 py-3">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide px-6 py-3">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide px-6 py-3">
                EmailId
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wide px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {users?.map((user) => (
                <User user={user} key={user.id} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserList;

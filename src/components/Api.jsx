import React, { useEffect, useState } from "react";

const Api = () => {
  const [item, setItem] = useState([]);
  const [user, setUser] = useState({ name: "", job: "", email: "" });

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((data) => setItem(data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    // Find the highest ID in the existing list and add 1 for uniqueness
    const newId = item.length > 0 ? Math.max(...item.map((i) => i.id)) + 1 : 1;

    setItem((prevItems) => [
      ...prevItems,
      { id: newId, email: user.email, first_name: data.name, last_name: data.job },
    ]);

    setUser({ name: "", job: "", email: "" });
  };

  return (
    <>
      <div className="p-14 flex flex-col justify-center items-center">
        <table className="w-96 table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">Id</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">First Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {item.map((data) => (
              <tr key={data.id}>
                <td className="px-4 py-2 border border-gray-300">{data.id}</td>
                <td className="px-4 py-2 border border-gray-300">{data.email}</td>
                <td className="px-4 py-2 border border-gray-300">{data.first_name}</td>
                <td className="px-4 py-2 border border-gray-300">{data.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Create User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border p-2 rounded w-64"
          />
          <input
            type="text"
            placeholder="Job"
            value={user.job}
            onChange={(e) => setUser({ ...user, job: e.target.value })}
            className="border p-2 rounded w-64"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border p-2 rounded w-64"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Api;

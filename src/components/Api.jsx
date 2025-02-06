import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const Api = () => {
  const [item, setItem] = useState([]);
  const [user, setUser] = useState({ name: "", job: "", email: "" });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((data) => setItem(data.data));
  }, []);

  const handleSubmit = async (e) => {
    Swal.fire({
      title: "Done!",
      text: "New user has been created!",
      icon: "success"
    });
    e.preventDefault();

    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    const newId = item.length > 0 ? Math.max(...item.map((i) => i.id)) + 1 : 1;

    setItem((prevItems) => [
      ...prevItems,
      { id: newId, email: user.email, first_name: data.name, last_name: data.job },
    ]);

    setUser({ name: "", job: "", email: "" });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });

        setItem((prevItems) => prevItems.filter((user) => user.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };


  const handleUpdate = async (e) => {
    Swal.fire({
      icon: "success",
      title: "User has been updated Successfully!",
      showConfirmButton: false,
      timer: 1500
    });
    e.preventDefault();

    await fetch(`https://reqres.in/api/users/${editUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editUser.first_name,
        job: editUser.last_name,
      }),
    });

    setItem((prevItems) =>
      prevItems.map((user) =>
        user.id === editUser.id
          ? {
              ...user,
              first_name: editUser.first_name,
              last_name: editUser.last_name,
              email: editUser.email,
            }
          : user
      )
    );

    setEditUser(null);
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
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {item.map((data) => (
              <tr key={data.id}>
                <td className="px-4 py-2 border border-gray-300">{data.id}</td>
                <td className="px-4 py-2 border border-gray-300">{data.email}</td>
                <td className="px-4 py-2 border border-gray-300">{data.first_name}</td>
                <td className="px-4 py-2 border border-gray-300">{data.last_name}</td>
                <td className="px-4 py-2 border border-gray-300 flex gap-2">
                  <button
                    onClick={() => setEditUser(data)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
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
            placeholder="First Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border p-2 rounded w-64"
          />
          <input
            type="text"
            placeholder="Last Name"
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

      {editUser && (
        <div className="p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={editUser.first_name}
              onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
              className="border p-2 rounded w-64"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editUser.last_name}
              onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
              className="border p-2 rounded w-64"
            />
            <input
              type="email"
              placeholder="Email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              className="border p-2 rounded w-64"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="bg-gray-500 text-white p-2 rounded mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Api;